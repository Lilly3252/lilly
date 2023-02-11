import type { event } from '../structures/@types/index.js';
import type { GuildTextBasedChannel, Message, Snowflake } from 'discord.js';
import type { Collection } from 'discord.js';
import Guild from './../database/guildSettings.js';
import { messageDeleteBulkEmbed } from '../structures/messageEmbeds.js';
export const name: event['name'] = 'messageDeleteBulk';
export const once: event['once'] = false;

export const run: event['run'] = async (messages: Collection<Snowflake, Message<true>> , channel:GuildTextBasedChannel): Promise<any> => {
	const settings = await Guild.findOne({guildID: messages.first()?.guild?.id});
//console.log(channel)
	if (!settings?.messageBulkDeleteMode || !messages.first()?.author ) {
		return;
	}
	const length = [...messages.values()].length;

	const deletedMessageChannel = channel;

	const moderatorChannel = settings.logChannelID;

	if (!moderatorChannel) return;
	const logChannel = messages.first()?.client.channels.cache.get(moderatorChannel);
	if (!logChannel) {
		return;
	}
	if (logChannel.isTextBased()) {
		logChannel.send({ embeds: [messageDeleteBulkEmbed(messages, deletedMessageChannel, length)] });
	}
};
