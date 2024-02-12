import { getFlags, getRoles } from "#utils/functions.js";
import { truncateEmbed } from "@yuudachi/framework";
import { APIEmbed, APIEmbedField, Colors, GuildMember, TimestampStyles, User, time } from "discord.js";
import i18next from "i18next";

export function userInfo(target: User | GuildMember, locale: string) {
	const targetParam = target instanceof GuildMember;
	const embed: APIEmbed = {
		title: targetParam ? "Member information" : "User information",
		author: {
			name: targetParam ? `${target.displayName} (${target.id})` : `${target.globalName} (${target.id}) `,
			icon_url: targetParam ? target.displayAvatarURL() : target.displayAvatarURL()
		},
		color: targetParam ? target.displayColor : Colors.DarkButNotBlack,
		thumbnail: {
			url: targetParam ? target.displayAvatarURL({ size: 512 }) : target.displayAvatarURL({ size: 512 })
		},
		footer: {
			text: getFlags(target)
		}
	};
	if (targetParam) {
		const guildMemberInformation: APIEmbedField = {
			name: i18next.t("info.member.name", { lng: locale }),
			value: i18next.t("info.member.value", {
				nickname: target.nickname,
				id: target.id,
				flags: getFlags(target),
				roles: getRoles(target),
				avatar: `[Link to avatar](${target.displayAvatarURL()})`,
				time_create: time(target.user.createdAt, TimestampStyles.RelativeTime),
				status: target.presence?.status ?? "No information",
				lng: locale
			})
		};
		embed.fields = [guildMemberInformation];
	} else {
		const userInformation: APIEmbedField = {
			name: i18next.t("info.user.name", { lng: locale }),
			value: i18next.t("info.user.value", {
				id: target.id,
				flags: getFlags(target),
				avatar: `[Link to avatar](${target.displayAvatarURL()})`,
				time_create: time(target.createdAt, TimestampStyles.RelativeTime),
				lng: locale
			})
		};
		embed.fields = [userInformation];
	}

	return truncateEmbed(embed);
}
