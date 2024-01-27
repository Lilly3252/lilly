import { addFields, truncateEmbed } from "@yuudachi/framework";
import { APIEmbed, APIEmbedField, APIEmbedThumbnail, Colors, GuildMember, User } from "discord.js";
import i18next from "i18next";

export function userInfo(target: User | GuildMember, locale: string) {
	const targetParam = target instanceof User;

	const userDescription: APIEmbedField = {
		name: targetParam ? "user" : "member",
		value: targetParam ? "user value" : "member value"
	};

	const embed: APIEmbed = {
		title: "User Information",
		author: {
			name: `${target.displayName} (${target.id})`,
			icon_url: target.displayAvatarURL()
		},
		color: /* target.member.displayColor ??*/ Colors.DarkButNotBlack,
		thumbnail: {
			url:
				target.displayAvatarURL({ forceStatic: true, size: 512 }) ??
				target.displayAvatarURL({ forceStatic: true, size: 512 })
		},
		fields: [userDescription]
	};

	return truncateEmbed(embed);
}
