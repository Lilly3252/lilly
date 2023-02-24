import type { Message } from 'discord.js';
import type { event } from '#structures/types/index.js';
import settingSchema from '#database/guildSettings.js';
import url from '#json/url.json' assert { type: 'json' };


export const name: event['name'] = 'messageCreate';
export const once: event['once'] = false;

//eslint-disable-next-line @typescript-eslint/no-unused-vars
export const run: event['run'] = async (message: Message<true>): Promise<any> => {
	const guild_db = await settingSchema.findOne({ guildID: message.guild.id });
	if (guild_db?.urlLinkDetection === true) {
		if (message.author.bot) {
			return;
		}
		const array1 = url.domains;
		const iterator = array1.values();
		for (const value of iterator) {
			if (message.content.includes(value)) {
				message.channel.send('Scam link!');
			}
			if (!value) {
				const links = guild_db.urlLinks.find((value) => message.content === value.domains);
				if (links) {
					message.channel.send('URL in DB found.');
				} else {
					return message.channel.send('url not found in db');
				}
			}
		}
	}
};
