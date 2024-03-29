import { addFields, truncateEmbed } from "@yuudachi/framework";
import { APIEmbed, GuildMember, User } from "discord.js";
import i18next from "i18next";
/*
export function logEmbeds({ name: string, value: string }, locale: string): APIEmbed {
	let embed = addFields(
		{
			author: {
				name: `${target.user.tag} (${target.user.id})`,
				icon_url: target.user.displayAvatarURL()
			},
			color: Color.DiscordEmbedBackground
		},
		{
			name: i18next.t("log.history.common.user_details.title", { lng: locale }),
			value: i18next.t("log.history.common.user_details.description", {
				user_mention: target.user.toString(),
				user_tag: target.user.tag,
				user_id: target.user.id,
				created_at: creationFormatted,
				created_at_since: sinceCreationFormatted,
				created_at_timestamp: target.user.createdTimestamp,
				lng: locale
			})
		}
	);
	return truncateEmbed(embed);
}
logEmbeds({});
*/
