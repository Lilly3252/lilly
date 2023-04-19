import type { event } from '#type/index.js';
import type { Message } from 'discord.js';

export const name: event['name'] = 'messageDelete';
export const once: event['once'] = false;

export const run: event['run'] = async (message: Message<true>): Promise<any> => {
	/*if (message.partial) {
		return;
	} else {
		const database = await Guild.findOne({ guildID: message.guild.id });
		if (!database?.messageDeleteMode) {
			return;
		}
		if (message.guild && message.author !== null) {
			const moderatorChannel = database.logChannelID;
			if (!moderatorChannel) return;
			const logChannel = message?.client.channels.cache.get(moderatorChannel);
			if (!logChannel) {
				return;
			}
			if (logChannel.isTextBased()) {
				logChannel.send({ embeds: [messageDeleteEmbed(message)] });
			}
		}
	}*/
};
