import settingSchema from '#database/guildSettings.js';
import * as embed from '#embeds/index.js';
import type { event } from '#type/index.js';
import { AuditLogEvent, BaseChannel, ClientUser, EmbedBuilder, type Guild, GuildAuditLogsEntry, Integration, Invite, Role, User } from 'discord.js';

export const name: event['name'] = 'guildAuditLogEntryCreate';
export const once: event['once'] = false;

export const run: event['run'] = async (auditLogEntry: GuildAuditLogsEntry, guild: Guild): Promise<any> => {
	const settings = await settingSchema.findOne({ guildID: guild.members.guild.id });
	const moderatorChannel = settings?.logChannelID;
	const actionExecuted = AuditLogEvent[auditLogEntry.action]; // String output Name of enum instead of number
	const getAuditLog = await guild.fetchAuditLogs();
	const fetchedAuditLog = getAuditLog?.entries.first();

	console.log(fetchedAuditLog);
	if (!settings) {
		return;
	}
	if (actionExecuted.startsWith('Message')) {
		const messageTarget = fetchedAuditLog?.target as ClientUser | User;
		if (!messageTarget) {
			return;
		}
		const messageEmbed = new EmbedBuilder()
			.setAuthor({ name: `${auditLogEntry.executor} (${auditLogEntry.executorId})` })
			.setTitle(actionExecuted)
			.addFields({ name: 'Action done:', value: `${auditLogEntry.actionType} on ${messageTarget.username}` });

		if (!moderatorChannel) {
			return;
		}
		const logChannel = guild.channels.cache.get(moderatorChannel);
		if (logChannel?.isTextBased()) {
			logChannel.send('Message Log entry!');
		}
	}

	if (actionExecuted.startsWith('Member')) {
		const memberTarget = fetchedAuditLog?.target as User;
		const memberEmbed = new EmbedBuilder()
			.setAuthor({ name: `${auditLogEntry.executor} (${auditLogEntry.executorId})` })
			.setTitle(actionExecuted)
			.addFields({ name: 'Action done:', value: `${auditLogEntry.actionType} on ${memberTarget.username}` });
		if (!moderatorChannel) {
			return;
		}
		const logChannel = guild.channels.cache.get(moderatorChannel);
		if (logChannel?.isTextBased()) {
			logChannel.send('Member Log entry!');
		}
	}
	if (actionExecuted.startsWith('Channel')) {
		const channelTarget = fetchedAuditLog?.target as BaseChannel;
		const channelEmbed = new EmbedBuilder()
			.setAuthor({ name: `${auditLogEntry.executor} (${auditLogEntry.executorId})` })
			.setTitle(actionExecuted)
			.addFields({ name: 'Action done:', value: `${auditLogEntry.actionType} on ${channelTarget.id}` });
		if (!moderatorChannel) {
			return;
		}
		const logChannel = guild.channels.cache.get(moderatorChannel);
		if (logChannel?.isTextBased()) {
			logChannel.send('Channel Log entry!');
		}
	}
	if (actionExecuted.startsWith('Guild')) {
		const guildTarget = fetchedAuditLog?.target as Guild;
		const guildEmbed = new EmbedBuilder()
			.setAuthor({ name: `${auditLogEntry.executor} (${auditLogEntry.executorId})` })
			.setTitle(actionExecuted)
			.addFields({ name: 'Action done:', value: `${auditLogEntry.actionType} on ${guildTarget.name}` });
		if (!moderatorChannel) {
			return;
		}
		const logChannel = guild.channels.cache.get(moderatorChannel);
		if (logChannel?.isTextBased()) {
			logChannel.send('Guild Log entry!');
		}
	}
	if (actionExecuted.startsWith('Integration')) {
		const integrationTarget = fetchedAuditLog?.target as Integration;
		const integrationEmbed = new EmbedBuilder()
			.setAuthor({ name: `${auditLogEntry.executor} (${auditLogEntry.executorId})` })
			.setTitle(actionExecuted)
			.addFields({ name: 'Action done:', value: `${auditLogEntry.actionType} on ${integrationTarget.id}` });
		if (!moderatorChannel) {
			return;
		}
		const logChannel = guild.channels.cache.get(moderatorChannel);
		if (logChannel?.isTextBased()) {
			logChannel.send('Integration Log entry!');
		}
	} // *completed (AutoModeration)
	if (actionExecuted.startsWith('AutoModeration')) {
		if (!moderatorChannel) {
			return;
		}
		const logChannel = guild.channels.cache.get(moderatorChannel);
		if (logChannel?.isTextBased()) {
			logChannel.send({ embeds: [embed.autoModerationEmbed(auditLogEntry, fetchedAuditLog, actionExecuted, guild)] });
		}
	}

	if (actionExecuted.startsWith('Role')) {
		const roleTarget = fetchedAuditLog?.target as Role;
		const auditLogEntryChangesKeyName = auditLogEntry.changes[0]?.key;
		const auditLogEntryNewChanges = auditLogEntry.changes[0]?.new;
		const roleEmbed = new EmbedBuilder()
			.setAuthor({ name: `${auditLogEntry.executor} (${auditLogEntry.executorId})` })
			.setTitle(actionExecuted)
			.addFields({ name: 'Action done:', value: `${auditLogEntry.actionType} on ${roleTarget.id}` });
		if (!moderatorChannel) {
			return;
		}
		const logChannel = guild.channels.cache.get(moderatorChannel);
		if (logChannel?.isTextBased()) {
			logChannel.send('Role Log entry!');
		}
	}
	if (actionExecuted.startsWith('Invite')) {
		const inviteTarget = fetchedAuditLog?.target as Invite;
		const auditLogEntryChangesKeyName = auditLogEntry.changes[0]?.key;
		const auditLogEntryNewChanges = auditLogEntry.changes[0]?.new;
		const inviteEmbed = new EmbedBuilder()
			.setAuthor({ name: `${auditLogEntry.executor} (${auditLogEntry.executorId})` })
			.setTitle(actionExecuted)
			.addFields({ name: 'Action done:', value: `${auditLogEntry.actionType} on ${inviteTarget.code}` });
		if (!moderatorChannel) {
			return;
		}
		const logChannel = guild.channels.cache.get(moderatorChannel);
		if (logChannel?.isTextBased()) {
			logChannel.send('Invite Log entry!');
		}
	}
};
