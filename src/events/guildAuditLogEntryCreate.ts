import settingSchema from '#database/guildSettings.js';
import * as embed from '#embeds/index.js';
import type { event } from '#type/index.js';
import { AuditLogEvent, type Guild, GuildAuditLogsEntry, type GuildAuditLogsTargetType } from 'discord.js';

export const name: event['name'] = 'guildAuditLogEntryCreate';
export const once: event['once'] = false;

export const run: event['run'] = async (auditLogEntry: GuildAuditLogsEntry, guild: Guild): Promise<any> => {
	const settings = await settingSchema.findOne({ guildID: guild.members.guild.id });
	const moderatorChannel = settings?.logChannelID;
	if (!moderatorChannel) {
		return;
	}
	const logChannel = guild.channels.cache.get(moderatorChannel);
	const actionExecuted = AuditLogEvent[auditLogEntry.action]; // String output Name of enum instead of number
	const getAuditLog = await guild.fetchAuditLogs();
	const fetchedAuditLog = getAuditLog?.entries.first();
console.log(fetchedAuditLog)
	function checkTargetTypeAndSendEmbed(_type: GuildAuditLogsTargetType): void {
		if (logChannel?.isTextBased()) {
			logChannel.send({ embeds: [embed.auditLogEmbed(auditLogEntry, fetchedAuditLog, actionExecuted, guild)] });
		}
	}
	if (!settings) {
		return;
	}
	checkTargetTypeAndSendEmbed('All');
};
