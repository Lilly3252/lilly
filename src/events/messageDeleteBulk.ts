import type { event } from '../structures/@types/index.js';
import type { Message, Snowflake } from 'discord.js';
import type { Collection } from 'discord.js';
import Guild from './../database/guildSettings.js';
import { messageDeleteBulkEmbed } from '../structures/messageEmbeds.js';
export const name: event['name'] = 'messageDeleteBulk';
export const once: event['once'] = false;

export const run: event['run'] = async (messages: Collection<Snowflake, Message<true>>): Promise<any> => {
	const messageCollection = messages.first();
	const settings = await Guild.findOne({
		guildID: messageCollection?.guild?.id,
	});

	if (settings?.messageBulkDeleteMode === false) {
		return;
	}
	if (!messageCollection?.author) {
		return;
	}
	const length = [...messages.values()].length;

	const deletedMessageChannel = messageCollection?.channel.name;

	const moderatorChannel = settings?.logChannelID;

	if (!moderatorChannel || moderatorChannel === null) return;
	const logChannel = messageCollection?.client.channels.cache.get(moderatorChannel);
	if (!logChannel || logChannel === null) {
		return;
	}
	if (logChannel?.isTextBased()) {
		logChannel.send({ embeds: [messageDeleteBulkEmbed(messages, deletedMessageChannel, length)] });
	}
};
