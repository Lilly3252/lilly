import type { event } from '../structures/@types/index.js';
import type { Guild } from 'discord.js';
import settingSchema from './../database/guildSettings.js';
export const name: event['name'] = 'guildDelete';
export const once: event['once'] = false;

export const run: event['run'] = async (guild: Guild): Promise<any> => {
	await settingSchema.deleteOne({ guildID: guild.id });
	console.log(`i have leave ${guild.name}`);
};
