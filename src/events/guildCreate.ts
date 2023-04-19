import settingSchema from '#database/guildSettings.js';
import type { event } from '#type/index.js';
import type { Guild } from 'discord.js';

export const name: event['name'] = 'guildCreate';
export const once: event['once'] = false;

export const run: event['run'] = async (guild: Guild): Promise<any> => {
	await settingSchema
		.create({
			name: guild.name,
			guildID: guild.id,
			antiRaid: false,
			botUpdate: false,
			roleUpdate: false,
			logChannelID: null,
			guildUpdate: false,
			emojiUpdate: false,
			inviteUpdate: false,
			threadUpdate: false,
			memberUpdate: false,
			auditLogEvent: false,
			messageUpdate: false,
			channelUpdate: false,
			stickerUpdate: false,
			webhookUpdate: false,
			autoModeration: false,
			welcomeChannelID: null,
			urlLinkDetection: false,
			integrationUpdate: false,
			commandPermission: false,
			stageInstanceUpdate: false,
			guildScheduledUpdate: false,
		})
		.then((guild) => guild.save);
	console.log(`i joined ${guild.name}`);
};
