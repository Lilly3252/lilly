import * as diff from 'diff';
import {
	AuditLogEvent, AutoModerationRule, BaseChannel, Collection, EmbedBuilder, escapeMarkdown, Guild, type GuildAuditLogsActionType, GuildAuditLogsEntry, type GuildAuditLogsTargetType, type GuildTextBasedChannel, Integration, Invite, Message, Role,
	type Snowflake, User,
} from 'discord.js';

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
export function auditLogEmbed(auditLogEntry: GuildAuditLogsEntry, fetchedAuditLog: GuildAuditLogsEntry<null, GuildAuditLogsActionType, GuildAuditLogsTargetType, AuditLogEvent> | undefined, actionExecuted: string, guild: Guild) {
	const autoModerationEmbed = new EmbedBuilder().setTitle(actionExecuted).setAuthor({ name: `${auditLogEntry.executor?.tag!} (${auditLogEntry.executorId})` });
	const target = fetchedAuditLog?.target;
	const auditLogEntryChangesKeyName = auditLogEntry.changes[0]?.key;
	const auditLogEntryNewChanges = auditLogEntry.changes[0]?.new;
	const auditLogTargetType = fetchedAuditLog?.targetType;
	const auditLogActionType = fetchedAuditLog?.actionType;
	//**changes done */
	if (target instanceof AutoModerationRule) {
		const customMessage = target.actions.map((action) => action.metadata.customMessage);
		const durationSeconds = target.actions.map((action) => action.metadata.durationSeconds);
		const exemptChannel = target.exemptChannels.map((channels) => `**${guild.client.utils.toTitleCase(channels.name)}** (${channels.id})`).join('\n');
		const exemptRole = target.exemptRoles.map((role) => `**${guild.client.utils.toTitleCase(role.name)}** (${role.id})`);

		autoModerationEmbed.addFields({ name: 'Action done:', value: `${auditLogEntry.actionType} on ${target.name}` });

		switch (auditLogEntryChangesKeyName) {
			case 'enabled':
				{
					if (auditLogEntryNewChanges === true) {
						autoModerationEmbed.addFields(
							{ name: 'Changes done:', value: '**❯Enabling the rule**' },
							{
								name: 'Rules:',
								value: [`**❯** mentionTotalLimit: ${target.triggerMetadata.mentionTotalLimit}`, `**❯** customMessage: ${customMessage.toString().replaceAll(',', '')}`, `**❯** durationSeconds: ${durationSeconds.toString().replaceAll(',', '')}`].join(
									'\n',
								),
							},
							{ name: 'Channel exempted from that rule:', value: `\u000A ${exemptChannel}` },
							{ name: 'Roles exempted from that rule:', value: `\u000A ${exemptRole}` },
						);
					}
					if (auditLogEntryNewChanges === false) {
						autoModerationEmbed.addFields({ name: 'Changes done:', value: '**❯** Disabling the rule' });
					}
				}
				return autoModerationEmbed;
			case 'trigger_metadata':
				{
					autoModerationEmbed.addFields(
						{
							name: 'Changes done:',
							value: [`**❯** mentionTotalLimit: ${target.triggerMetadata.mentionTotalLimit}`, `**❯** customMessage: ${customMessage.toString().replaceAll(',', '')}`, `**❯** durationSeconds: ${durationSeconds.toString().replaceAll(',', '')}`].join(
								'\n',
							),
						},
						{ name: 'Channel exempted from that rule:', value: `\u000A ${exemptChannel}` },
						{ name: 'Roles exempted from that rule:', value: `\u000A ${exemptRole}` },
					);
				}
				return autoModerationEmbed;
			case 'actions':
				{
					autoModerationEmbed.addFields(
						{
							name: 'Changes done:',
							value: [`**❯** mentionTotalLimit: ${target.triggerMetadata.mentionTotalLimit}`, `**❯** customMessage: ${customMessage.toString().replaceAll(',', '')}`, `**❯** durationSeconds: ${durationSeconds.toString().replaceAll(',', '')}`].join(
								'\n',
							),
						},
						{ name: 'Channel exempted from that rule:', value: `\u000A ${exemptChannel}` },
						{ name: 'Roles exempted from that rule:', value: `\u000A ${exemptRole}` },
					);
				}
				return autoModerationEmbed;
			case 'exempt_channels':
				{
					autoModerationEmbed.addFields(
						{
							name: 'Changes done:',
							value: [`**❯** mentionTotalLimit: ${target.triggerMetadata.mentionTotalLimit}`, `**❯** customMessage: ${customMessage.toString().replaceAll(',', '')}`, `**❯** durationSeconds: ${durationSeconds.toString().replaceAll(',', '')}`].join(
								'\n',
							),
						},
						{ name: 'Channel exempted from that rule:', value: `\u000A ${exemptChannel}` },
						{ name: 'Roles exempted from that rule:', value: `\u000A ${exemptRole}` },
					);
				}
				return autoModerationEmbed;
		}
		return autoModerationEmbed;
	}
	//**changes done */
	if (target instanceof User) {
		if (!target) {
			return autoModerationEmbed;
		}
		autoModerationEmbed.addFields({ name: 'Action done:', value: `${auditLogEntry.actionType} on ${auditLogEntry.executor?.username}` });
		switch (auditLogEntryChangesKeyName) {
			case 'avatar_hash': {
				return autoModerationEmbed;
			}
			case 'communication_disabled_until': {
				return autoModerationEmbed;
			}
			case 'deaf': {
				return autoModerationEmbed;
			}
			case 'mute': {
				return autoModerationEmbed;
			}
			case 'nick': {
				return autoModerationEmbed;
			}
			case 'rate_limit_per_user': {
				return autoModerationEmbed;
			}
			case 'user_limit': {
				return autoModerationEmbed;
			}
		}

		return autoModerationEmbed;
	}
	//! auditlogentrychangeskeyname need to be found ..
	if (target instanceof BaseChannel) {
		autoModerationEmbed.addFields({ name: 'Action done:', value: `${auditLogEntry.actionType} on ${target.id}` });
		return autoModerationEmbed;
	}
	//**changes done */
	if (target instanceof Guild) {
		autoModerationEmbed.addFields({ name: 'Action done:', value: `${auditLogEntry.actionType} on ${target.name}` });
		switch (auditLogEntryChangesKeyName) {
			case 'afk_channel_id': {
				return autoModerationEmbed;
			}
			case 'afk_timeout': {
				return autoModerationEmbed;
			}
			case 'banner_hash': {
				return autoModerationEmbed;
			}
			case 'channel_id': {
				return autoModerationEmbed;
			}
			case 'default_message_notifications': {
				return autoModerationEmbed;
			}
			case 'description': {
				return autoModerationEmbed;
			}
			case 'discovery_splash_hash': {
				return autoModerationEmbed;
			}
			case 'entity_type': {
				return autoModerationEmbed;
			}
			case 'explicit_content_filter': {
				return autoModerationEmbed;
			}
			case 'guild_id': {
				return autoModerationEmbed;
			}
			case 'image_hash': {
				return autoModerationEmbed;
			}
			case 'mfa_level': {
				return autoModerationEmbed;
			}
			case 'location': {
				return autoModerationEmbed;
			}
			case 'owner_id': {
				return autoModerationEmbed;
			}
			case 'preferred_locale': {
				return autoModerationEmbed;
			}
			case 'privacy_level': {
				return autoModerationEmbed;
			}
			case 'public_updates_channel_id': {
				return autoModerationEmbed;
			}
			case 'region': {
				return autoModerationEmbed;
			}
			case 'splash_hash': {
				return autoModerationEmbed;
			}
			case 'status': {
				return autoModerationEmbed;
			}
			case 'system_channel_id': {
				return autoModerationEmbed;
			}
			case 'vanity_url_code': {
				return autoModerationEmbed;
			}
			case 'verification_level': {
				return autoModerationEmbed;
			}
			case 'widget_channel_id': {
				return autoModerationEmbed;
			}
			case 'widget_enabled': {
				return autoModerationEmbed;
			}
		}

		return autoModerationEmbed;
	} //**changes done */
	if (target instanceof Integration) {
		autoModerationEmbed.addFields({ name: 'Action done:', value: `${auditLogEntry.actionType} on ${target.id}` });
		switch (auditLogEntryChangesKeyName) {
			case 'expire_behavior':
				{
				}
				return autoModerationEmbed;
			case 'expire_grace_period':
				{
				}
				return autoModerationEmbed;
			case 'enable_emoticons':
				{
				}
				return autoModerationEmbed;
		}

		return autoModerationEmbed;
	} //**changes done */
	if (target instanceof Role) {
		autoModerationEmbed.addFields({ name: 'Action done:', value: `${auditLogEntry.actionType} on ${target.name} (${target.id})` });
		switch (auditLogEntryChangesKeyName) {
			case '$add': {
				return autoModerationEmbed;
			}

			case '$remove': {
				return autoModerationEmbed;
			}

			case 'color': {
				return autoModerationEmbed;
			}

			case 'hoist': {
				return autoModerationEmbed;
			}

			case 'mentionable': {
				return autoModerationEmbed;
			}
		}

		return autoModerationEmbed;
	}
	//**changes done */
	if (target instanceof Invite) {
		autoModerationEmbed.addFields({ name: 'Action done:', value: `${auditLogEntry.actionType} on ${target.code}` });
		switch (auditLogEntryChangesKeyName) {
			case 'channel_id': {
				return autoModerationEmbed;
			}
			case 'code': {
				return autoModerationEmbed;
			}
			case 'inviter_id': {
				return autoModerationEmbed;
			}
			case 'max_age': {
				return autoModerationEmbed;
			}
			case 'max_uses': {
				return autoModerationEmbed;
			}
			case 'temporary': {
				return autoModerationEmbed;
			}
			case 'uses': {
				return autoModerationEmbed;
			}
		}
		return autoModerationEmbed;
	}
	return autoModerationEmbed;
}
