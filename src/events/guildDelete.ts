import settingSchema from '#database/guildSettings.js';
import type { event } from '#type/index.js';
import type { Guild } from 'discord.js';

export const name: event['name'] = 'guildDelete';
export const once: event['once'] = false;

export const run: event['run'] = async (guild: Guild): Promise<any> => {
	if (!guild.available) {
		return;
	} else {
		await settingSchema.deleteOne({ guildID: guild.id });
		console.log(`i have leave ${guild.name}`);
	}
};
