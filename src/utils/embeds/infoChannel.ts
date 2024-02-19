import { truncateEmbed } from "@yuudachi/framework";
import { APIEmbed, APIEmbedField, BaseGuildTextChannel, ChannelType, PermissionsBitField } from "discord.js";
import i18next from "i18next";

export function channelInfo(channel: BaseGuildTextChannel, locale: string) {
	const info: APIEmbedField = {
		name: `Channel`,
		value: i18next.t("info.channel.value", {
			id: channel.id,
			name: channel.name,
			nsfw: channel.nsfw,
			slowmode: channel.rateLimitPerUser ? channel.rateLimitPerUser + " Seconds" : "None",
			private: channel.permissionsFor(channel.guild.id)?.has(PermissionsBitField.Flags.ViewChannel) ? "False" : "True",
			topic: channel.topic ? channel.topic : "no topic",

			lng: locale
		})
	};

	const embed: APIEmbed = {
		author: {
			name: "Channel Information"
		},
		thumbnail: { url: channel.guild.iconURL() },
		fields: [info],
		footer: {
			text: `Type: ${
				ChannelType ? ChannelType[channel.type].replace(/([a-z])([A-Z])/g, "$1 $2") : "Cannot provide this information."
			}`
		}
	};

	return truncateEmbed(embed);
}
