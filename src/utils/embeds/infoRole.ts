import { InfoCommand } from "#slashyInformations/index.js";
import { truncateEmbed } from "@yuudachi/framework";
import { ArgsParam } from "@yuudachi/framework/types";
import { APIEmbed, APIEmbedField, Role } from "discord.js";
import i18next from "i18next";

export function roleInfo(args: ArgsParam<typeof InfoCommand>["role"], role: Role, locale: string): APIEmbed {
	const info: APIEmbedField = {
		name: "Role",
		value: i18next.t("info.role.value", {
			name: `${role}`,
			role_id: role.id,
			color: role.hexColor,
			hoisted: role.hoist,
			mentionable: role.mentionable,
			lng: locale
		})
	};

	const embed: APIEmbed = {
		author: { name: "Role Information" },
		thumbnail: { url: role.guild.iconURL() },
		color: role.color,
		fields: [info]
	};

	if (args.verbose) {
		const otherInfo: APIEmbedField = {
			name: "Other Information",
			value: i18next.t("info.role.other", {
				position: role.position,
				permissions: role.permissions
					.toArray()
					.slice(0, 20)
					.map((key) => `\n\u3000 ${key}`.replace(/([a-z])([A-Z])/g, "$1 $2")),
				lng: locale
			}),
			inline: true
		};

		const otherInfo2: APIEmbedField = {
			name: `\u200b`,
			value: i18next.t("info.role.other2", {
				permissions: role.permissions
					.toArray()
					.slice(20)
					.map((key) => `\n\u3000 ${key}`.replace(/([a-z])([A-Z])/g, "$1 $2")),
				lng: locale
			}),
			inline: true
		};

		embed.fields.push(otherInfo, otherInfo2);
	}

	return truncateEmbed(embed);
}
