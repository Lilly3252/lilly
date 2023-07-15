import * as diff from 'diff';
import {
	ApplicationCommand, type AuditLogChange, AuditLogEvent, AutoModerationRule, BaseChannel, Collection, EmbedBuilder, escapeMarkdown, Guild, type GuildAuditLogsActionType, GuildAuditLogsEntry, type GuildAuditLogsTargetType, type GuildTextBasedChannel,
	Integration, Invite, Message, Role, type Snowflake, TextChannel, User,
} from 'discord.js';

export function messageDeleteEmbed(message: Message) {
	const deleteEmbed = new EmbedBuilder()
		.setAuthor({
			name: `${message.author.username} (${message.author.id})`,
			iconURL: message.author.displayAvatarURL(),
		})
		.addFields({ name: '\u276F Channel', value: [message.channel].join('\n') })
		.setTimestamp(new Date())
		.setFooter({ text: `Deleted by: ${message.author.username}` });

	message.content &&
		deleteEmbed.addFields({
			name: '\u276F Content',
			value: `${message.content.substring(0, 1020)}`,
		});
	if (message.attachments.size) {
		deleteEmbed.addFields([
			{
				name: '\u276F Attachment(s)',
				value: `• ${message.attachments.map((a) => a.proxyURL).join('\n\u2022 ')}`,
			},
		]);
	}
	if (!message.content && message.embeds.length) {
		deleteEmbed.addFields({
			name: '\u276F Embeds',
			value: `${message.embeds.length}`,
		});
	}
	if (message.embeds.length) {
		deleteEmbed.addFields({
			name: '\u276F Embed Description',
			value: `${message.embeds[0]?.description}`,
		});
	}
	return deleteEmbed;
}
export function messageDeleteBulkEmbed(messages: Collection<Snowflake, Message<true>>, deletedMessageChannel: GuildTextBasedChannel, length: number) {
	const messageDeleteBulkEmbed = new EmbedBuilder()
		.setAuthor({
			name: `${messages.first()?.author.tag} (${messages.first()?.author.id})`,
			iconURL: messages.first()?.author.displayAvatarURL(),
		})
		.addFields({ name: '\u276F Channel', value: [deletedMessageChannel.name].join('\n') });
	if (messages.first()!.content.length > 1024) {
		messageDeleteBulkEmbed.addFields({
			name: '\u276F Messages',
			value: messages
				.map((message) => `**❯** [${message.author.tag}]: ${message.content.substring(0, 200)}`)
				.join('\n')
				.substring(0, 1024),
		});
	} else {
		messageDeleteBulkEmbed.addFields({
			name: '\u276F Messages',
			value: messages.map((message) => `**❯** [${message.author.tag}]: ${message.content}`).join('\n'),
		});
	}

	messageDeleteBulkEmbed
		.setFooter({ text: `${length} latest shown` })
		.setColor('#dd5f53')
		.setTimestamp();
	return messageDeleteBulkEmbed;
}
export function messageUpdateEmbed(oldMessage: Message<true>, newMessage: Message<true>) {
	const messageUpEmbed = new EmbedBuilder().setAuthor({ name: `${newMessage.author.tag} (${newMessage.author.id})` }).addFields({ name: '\u276F Channel', value: [oldMessage.channel].join('\n') });

	let e = '';
	if (/```(.*?)```/s.test(oldMessage.content) && /```(.*?)```/s.test(newMessage.content)) {
		const oldContent = /```(?:(\S+)\n)?\s*([^]+?)\s*```/.exec(oldMessage.content);
		if (!oldContent || !oldContent[2]) {
			return messageUpEmbed;
		}

		const newContent = /```(?:(\S+)\n)?\s*([^]+?)\s*```/.exec(newMessage.content);
		if (!newContent || !newContent[2]) {
			return messageUpEmbed;
		}
		if (oldContent[2] === newContent[2]) {
			return messageUpEmbed;
		}

		const comparison = diff.diffLines(oldContent[2], newContent[2], { newlineIsToken: true });
		for (const changes of comparison) {
			if (changes.value === '\n') continue;
			const b = changes.added ? '+ ' : changes.removed ? '- ' : '';
			e += `${b}${changes.value.replace(/\n/g, '')}\n`;
		}

		messageUpEmbed.addFields({ name: '\u276F Modified Message', value: [`${'```diff\n'}${e.substring(0, 1e3)}${'\n```'}`].join('\n') });
	} else {
		const comparison = diff.diffWords(escapeMarkdown(oldMessage.content), escapeMarkdown(newMessage.content));
		for (const changes of comparison) {
			const b = changes.added ? '**' : changes.removed ? '~~' : '';
			e += `${b}${changes.value}${b}`;
		}
		messageUpEmbed.addFields({ name: '\u276F Modified Message', value: `${e.substring(0, 1020)}` || '\u200B' });
	}
	messageUpEmbed
		.addFields({ name: 'link!', value: `[Click here to see the message!](${oldMessage.url})` })
		.setTimestamp(oldMessage.editedAt || newMessage.editedAt || new Date())
		.setFooter({ text: 'Edited!' });
	return messageUpEmbed;
}
export function auditLogEmbed(auditLogEntry: GuildAuditLogsEntry, fetchedAuditLog: GuildAuditLogsEntry<null, GuildAuditLogsActionType, GuildAuditLogsTargetType, AuditLogEvent> | undefined, actionExecuted: string, guild: Guild) {
	function isUndefined(value: any) {
		if (value === undefined) {
			return true;
		} else {
			return false;
		}
	}

	const autoModerationEmbed = new EmbedBuilder().setTitle(actionExecuted).setAuthor({ name: `${auditLogEntry.executor?.username} (${auditLogEntry.executorId})` });

	const target = fetchedAuditLog?.target;
	const auditLogtargetType = fetchedAuditLog?.targetType;
	const change = fetchedAuditLog?.changes[0];
	const extra = auditLogEntry.extra!;
	const auditLogEntryChangesKeyName = auditLogEntry.changes[0]?.key.replaceAll('_', ' ');
	const auditLogActionType = fetchedAuditLog?.actionType;
	let x = '';
	switch (auditLogtargetType) {
		case 'Channel':
			x = '#';
			break;
		case 'Role':
			x = '&';
			break;
		case 'User':
			x = '@';
	}
	const changesDone = auditLogEntry.changes
		.map((changes: AuditLogChange) => {
			return `**❯** ${guild.client.utils.toTitleCase(changes.key.replaceAll('_', ' '))}   \n\u3000 New: ${
				Array.isArray(changes.new)
					? changes.new.map((element) =>
							Object.entries(element)
								.map(([key, value]) => `\n\u3000 ${key}: ${value}`)
								.join(' '),
					  )
					: changes.new
			} \n\u3000 Old:${
				Array.isArray(changes.old)
					? changes.old.map((element) =>
							Object.entries(element)
								.map(([key, value]) => `\n\u3000 ${key}: ${value}`)
								.join(' '),
					  )
					: changes.old
			}`;
		})
		.join('\n');

	const changesDoneNew = auditLogEntry.changes
		.map((changes: AuditLogChange) => {
			return `**❯** ${guild.client.utils.toTitleCase(changes.key.replaceAll('_', ' '))}   \n\u3000 New: ${
				Array.isArray(changes.new)
					? changes.new.map((element) =>
							Object.entries(element)
								.map(([key, value]) => `\n\u3000 ${key}: ${value}`)
								.join(' '),
					  )
					: changes.new
			}`;
		})
		.join('\n');
	const changesDoneOld = auditLogEntry.changes
		.map((changes: AuditLogChange) => {
			return `**❯** ${guild.client.utils.toTitleCase(changes.key.replaceAll('_', ' '))} \n\u3000 Old:${
				Array.isArray(changes.old)
					? changes.old.map((element) =>
							Object.entries(element)
								.map(([key, value]) => `\n\u3000 ${key}: ${value}`)
								.join(' '),
					  )
					: changes.old
			}`;
		})
		.join('\n');
		function changes(_target:GuildAuditLogsTargetType):void{
			if (change) {
				autoModerationEmbed.addFields({ name: 'Changes:', value: `${isUndefined(change?.new) ? changesDoneOld : isUndefined(change.old) ? changesDoneNew : changesDone}` });
			}
		}

	if (target instanceof AutoModerationRule) {
		autoModerationEmbed.addFields({ name: 'Action done:', value: `${auditLogActionType} on ${target.name}` });
		changes("AutoModerationRule")
		return autoModerationEmbed;
	}

	if (target instanceof ApplicationCommand) {
		autoModerationEmbed.addFields({ name: 'Action done:', value: `${auditLogActionType} on ${target.name}` });
		changes("ApplicationCommand")
		return autoModerationEmbed;
	}

	if (target instanceof User) {
		if (!target) {
			return autoModerationEmbed;
		}
		autoModerationEmbed.addFields({ name: 'Action done:', value: `${auditLogActionType} ${auditLogtargetType?.replaceAll('_', ' ')} on ${target.username} (${target.id})` });
		if (extra) {
			const extraobject = Object.entries(Object.entries(extra)[0]!);
			const Extra = extraobject[1]?.[1];
			//const ExtraMapped = Object.entries(Extra);

			//console.log(Array.isArray(ExtraMapped)? ExtraMapped.map(([key, value]) => ` \u3000 \u3000 ${key}: ${value}`) : "Not a array dumbass")
			if (Extra instanceof TextChannel) {
				console.log(Array.isArray(Extra.messages) ? Extra.messages.cache.map((key, value) => ` \u3000 \u3000 ${key}: ${value}`) : `nope`);
				if (Extra.isTextBased()) {
					autoModerationEmbed.addFields({
						name: 'Extras:',
						value: [
							`
					**❯**Channel Name : ${Extra}
					**❯**Last Message ID : ${Extra.lastMessageId}
					**❯**Content: // 
					`,
						].join(''),
					});
				}
			}
			//TODO : Extra.messages doesnt show content , need fix.
		}
		changes("User")
		return autoModerationEmbed;
	}
	if (auditLogtargetType === 'Channel' && auditLogActionType === 'Delete') {
		autoModerationEmbed.addFields({ name: 'Action done:', value: `${auditLogEntry.actionType} channel: <${x}${auditLogEntry.targetId}>` });
		if (change) {
			autoModerationEmbed.addFields({ name: 'Changes:', value: `${isUndefined(change?.new) ? changesDoneOld : isUndefined(change.old) ? changesDoneNew : changesDone}` });
		}
	}
	if (target instanceof BaseChannel) {
		if (target.isTextBased()) {
			autoModerationEmbed.addFields({ name: 'Action done:', value: `${auditLogEntry.actionType} channel: <${x}${target.id}> (${target.id})` });
			changes("Channel")
			return autoModerationEmbed;
		}
		return autoModerationEmbed;
	}
	if (target instanceof Guild) {
		autoModerationEmbed.addFields({ name: 'Action done:', value: `${auditLogEntry.actionType} ${auditLogEntryChangesKeyName?.replaceAll('_', ' ')} on ${target.name} (${target.id})` });
		changes("Guild")
		return autoModerationEmbed;
	}
	if (target instanceof Integration) {
		autoModerationEmbed.addFields({ name: 'Action done:', value: `${auditLogEntry.actionType} on ${target.name} (${target.id})` });
		changes("Integration")
		return autoModerationEmbed;
	}
	if (target instanceof Role) {
		autoModerationEmbed.addFields({ name: 'Action done:', value: `${auditLogEntry.actionType} on ${target.name} (${target.id})` });
		changes("Role")
		return autoModerationEmbed;
	}
	if (target instanceof Invite) {
		autoModerationEmbed.addFields({ name: 'Action done:', value: `${auditLogEntry.actionType} on ${target.code}` });
		changes("Invite")
		return autoModerationEmbed;
	}
	return autoModerationEmbed;
}
