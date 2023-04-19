import type { event } from '#type/index.js';
import type { Collection, GuildTextBasedChannel, Message, Snowflake } from 'discord.js';

export const name: event['name'] = 'messageDeleteBulk';
export const once: event['once'] = false;

export const run: event['run'] = async (messages: Collection<Snowflake, Message<true>>, channel: GuildTextBasedChannel): Promise<any> => {
	/*const settings = await Guild.findOne({ guildID: messages.first()?.guild?.id });
	//console.log(channel)
	if (!settings?.messageBulkDeleteMode || !messages.first()?.author) {
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
	}*/
};
