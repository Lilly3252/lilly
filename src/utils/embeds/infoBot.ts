import ms from "ms";
import os from "os";
const b = os.cpus()[0];
import { truncateEmbed } from "@yuudachi/framework";
import { ArgsParam, InteractionParam } from "@yuudachi/framework/types";
import { APIEmbed, APIEmbedField, ClientApplication, TimestampStyles, time } from "discord.js";
import * as Package from "../../../package.json" assert { type: "json" };
import i18next from "i18next";
import { formatBytes } from "#utils/index.js";
import { InfoCommand } from "#slashyInformations/index.js";

export function botInfo(application: ClientApplication, interaction: InteractionParam, args: ArgsParam<typeof InfoCommand>, locale: string) {
	const info: APIEmbedField = {
		name: "Information",
		value: i18next.t("info.bot.info", {
			owner: `${application.owner} (${application.owner?.id})`,
			servers: interaction.client.guilds.cache.size.toLocaleString(),
			users: interaction.client.guilds.cache.reduce((c, a) => c + a.memberCount, 0).toLocaleString(),
			channels: interaction.client.channels.cache.size.toLocaleString(),
			create_date: time(interaction.client.user.createdAt, TimestampStyles.RelativeTime),
			node: process.version,
			ts: `v${Package.default.dependencies["typescript"].replace("^", "")}`,
			djs: `v${Package.default.dependencies["discord.js"].replace("^", "")}`,
			lng: locale
		}),
		inline: true
	};
	const embed: APIEmbed = {
		author: {
			name: `Bot Information`
		},
		thumbnail: { url: application.guild.iconURL() },
		fields: [info],
		footer: {
			text: `Flags : ${application.flags?.toArray().map((key) =>
				`${key}`
					.replace(/([a-z])([A-Z])/g, "$1 $2")
					.replace("Limited", "")
					.replace("Gateway", "")
			)}`
		}
	};
	if (args.bot.verbose) {
		const system: APIEmbedField = {
			name: "System",
			value: i18next.t("info.bot.system", {
				platform: process.platform,
				uptime: ms(1e3 * process.uptime(), { long: true }),
				cores: os.cpus().length,
				model: b.model.replace("(R) Core(TM)", ""),
				speed: b.speed,
				total_memory: formatBytes(process.memoryUsage().heapTotal),
				used_memory: formatBytes(process.memoryUsage().heapUsed),
				lng: locale
			}),
			inline: true
		};

		const code: APIEmbedField = {
			name: "Code",
			value: `[Click here](https://github.com/Lilly3252/lilly)`
		};
		embed.fields = [info, system, code];
	}

	return truncateEmbed(embed);
}
