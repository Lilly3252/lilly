import type { event } from '#type/index.js';
import { Message } from 'discord.js';

export const name: event['name'] = 'messageUpdate';
export const once: event['once'] = false;

export const run: event['run'] = async (oldMessage: Message<true>, newMessage: Message<true>): Promise<any> => {
	/*const settings = await settingSchema.findOne({ guildID: oldMessage.guild.id });
	if (!settings?.messageUpdateMode || !newMessage || !oldMessage || oldMessage.content.includes('https:')) {
		return;
	}
	if (!oldMessage.guild || !newMessage.guild || oldMessage.author.bot || newMessage.author.bot) {
		return;
	}

	const moderatorChannel = settings.logChannelID;
	if (!moderatorChannel) return;

	const logChannel = newMessage.client.channels.cache.get(moderatorChannel);
	if (!logChannel) {
		return;
	}
	if (logChannel.isTextBased()) {
		logChannel.send({ embeds: [messageUpdateEmbed(oldMessage, newMessage)] });
	}*/
};
