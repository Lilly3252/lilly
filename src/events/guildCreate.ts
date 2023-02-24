import type { event } from '../structures/types/index.js';
import type { Guild } from 'discord.js';
import settingSchema from './../database/guildSettings.js';
export const name: event['name'] = 'guildCreate';
export const once: event['once'] = false;

export const run: event['run'] = async (guild: Guild): Promise<any> => {
	await settingSchema
		.create({
			guildID: guild.id,
			name: guild.name,
			logChannelID: null,
			welcomeChannelID: null,
			antiRaidMode: false,
			messageDeleteMode: false,
			messageBulkDeleteMode: false,
			messageUpdateMode: false,
		})
		.then((guild) => guild.save);
        console.log(`i joined ${guild.name}`);
};
