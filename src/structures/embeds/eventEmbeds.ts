import * as diff from 'diff';
import { AuditLogEvent, AutoModerationRule, Collection, EmbedBuilder, escapeMarkdown, Guild, type GuildAuditLogsActionType, GuildAuditLogsEntry, type GuildAuditLogsTargetType, type GuildTextBasedChannel, Message, type Snowflake } from 'discord.js';

export function messageDeleteEmbed(message: Message) {
	const deleteEmbed = new EmbedBuilder()
		.setAuthor({
			name: `${message.author.tag} (${message.author.id})`,
			iconURL: message.author.displayAvatarURL(),
		})
		.addFields({ name: '\u276F Channel', value: [message.channel].join('\n') })
		.setTimestamp(new Date())
		.setFooter({ text: `Deleted by: ${message.author.tag}` });

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
export function autoModerationEmbed(
	auditLogEntry: GuildAuditLogsEntry, 
	fetchedAuditLog: GuildAuditLogsEntry<null, GuildAuditLogsActionType, GuildAuditLogsTargetType, AuditLogEvent>, 
	actionExecuted: string, 
	guild: Guild) {
		const target = fetchedAuditLog?.target
	if (target instanceof AutoModerationRule) {
		const auditLogEntryChangesKeyName = auditLogEntry.changes[0]?.key;
		const auditLogEntryNewChanges = auditLogEntry.changes[0]?.new;
		const customMessage = target.actions.map((action) => action.metadata.customMessage);
		const durationSeconds = target.actions.map((action) => action.metadata.durationSeconds);
		const exemptChannel = target.exemptChannels.map((channels) => `**${guild.client.utils.toTitleCase(channels.name)}** (${channels.id})`).join('\n');
		const exemptRole = target.exemptRoles.map((role) => `**${guild.client.utils.toTitleCase(role.name)}** (${role.id})`);
		const AutomoderationEmbed = new EmbedBuilder()
			.setTitle(actionExecuted)
			.setAuthor({ name: `${auditLogEntry.executor?.tag!} (${auditLogEntry.executorId})` })
			.addFields({ name: 'Action done:', value: `${auditLogEntry.actionType} on ${target.name}` });

		switch (auditLogEntryChangesKeyName) {
			case 'enabled':
				{
					if (auditLogEntryNewChanges === true) {
						AutomoderationEmbed.addFields(
							{ name: 'Changes done:', value: '**❯Enabling the rule**' },
							{
								name: 'Rules:',
								value: [
									`**❯** mentionTotalLimit: ${fetchedAuditLog?.target.triggerMetadata.mentionTotalLimit}`,
									`**❯** customMessage: ${customMessage.toString().replaceAll(',', '')}`,
									`**❯** durationSeconds: ${durationSeconds.toString().replaceAll(',', '')}`,
								].join('\n'),
							},
							{ name: 'Channel exempted from that rule:', value: `\u000A ${exemptChannel}` },
							{ name: 'Roles exempted from that rule:', value: `\u000A ${exemptRole}` },
						);
					}
					if (auditLogEntryNewChanges === false) {
						AutomoderationEmbed.addFields({ name: 'Changes done:', value: '**❯** Disabling the rule' });
					}
				}
				return AutomoderationEmbed;
			case 'trigger_metadata':
				{
					AutomoderationEmbed.addFields(
						{
							name: 'Changes done:',
							value: [
								`**❯** mentionTotalLimit: ${target.triggerMetadata.mentionTotalLimit}`,
								`**❯** customMessage: ${customMessage.toString().replaceAll(',', '')}`,
								`**❯** durationSeconds: ${durationSeconds.toString().replaceAll(',', '')}`,
							].join('\n'),
						},
						{ name: 'Channel exempted from that rule:', value: `\u000A ${exemptChannel}` },
						{ name: 'Roles exempted from that rule:', value: `\u000A ${exemptRole}` },
					);
				}
				return AutomoderationEmbed;
			case 'actions':
				{
					AutomoderationEmbed.addFields(
						{
							name: 'Changes done:',
							value: [
								`**❯** mentionTotalLimit: ${target.triggerMetadata.mentionTotalLimit}`,
								`**❯** customMessage: ${customMessage.toString().replaceAll(',', '')}`,
								`**❯** durationSeconds: ${durationSeconds.toString().replaceAll(',', '')}`,
							].join('\n'),
						},
						{ name: 'Channel exempted from that rule:', value: `\u000A ${exemptChannel}` },
						{ name: 'Roles exempted from that rule:', value: `\u000A ${exemptRole}` },
					);
				}
				return AutomoderationEmbed;
			case 'exempt_channels':
				{
					AutomoderationEmbed.addFields(
						{
							name: 'Changes done:',
							value: [
								`**❯** mentionTotalLimit: ${target.triggerMetadata.mentionTotalLimit}`,
								`**❯** customMessage: ${customMessage.toString().replaceAll(',', '')}`,
								`**❯** durationSeconds: ${durationSeconds.toString().replaceAll(',', '')}`,
							].join('\n'),
						},
						{ name: 'Channel exempted from that rule:', value: `\u000A ${exemptChannel}` },
						{ name: 'Roles exempted from that rule:', value: `\u000A ${exemptRole}` },
					);
				}
				return AutomoderationEmbed;
		}
		return AutomoderationEmbed;
	}
}
