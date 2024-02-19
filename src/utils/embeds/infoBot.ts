import ms from "ms";
import os from "os";
const b = os.cpus()[0];
import { truncateEmbed } from "@yuudachi/framework";
import { InteractionParam } from "@yuudachi/framework/types";
import { APIEmbed, APIEmbedField, ClientApplication, GuildMember, TimestampStyles, time } from "discord.js";
import * as Package from "../../../package.json";
import i18next from "i18next";
import { formatBytes } from "#utils/index.js";
export function botInfo(application: ClientApplication, interaction: InteractionParam, locale: string) {
	const info: APIEmbedField = {
		name: "Information",
		value: [
			`**❯ Owner:** ${application.owner} (${application.owner?.id})`,
			`**❯ Commands:** ${application.commands.cache.size}`,
			`**❯ Servers:** ${interaction.client.guilds.cache.size.toLocaleString()} `,
			`**❯ Users:** ${interaction.client.guilds.cache.reduce((c, a) => c + a.memberCount, 0).toLocaleString()}`,
			`**❯ Channels:** ${interaction.client.channels.cache.size.toLocaleString()}`,
			`**❯ Creation Date:** ${time(interaction.client.user.createdAt, TimestampStyles.RelativeTime)}`,
			`**❯ Node.js:** ${process.version}`,
			`**❯ TypeScript Version:** v${Package.default.dependencies["typescript"]}`,
			`**❯ Discord.js:** v${Package.default.dependencies["discord.js"]}`,
			"\u200B"
		].join("\n")
	};
	const system: APIEmbedField = {
		name: "System",
		value: [
			`**❯ Platform:** ${process.platform}`,
			`**❯ Uptime:** ${ms(1e3 * process.uptime(), { long: true })}`,
			`**❯ CPU:**`,
			`\u3000 Cores: ${os.cpus().length}`,
			`\u3000 Model: ${b.model}`,
			`\u3000 Speed: ${b.speed}MHz`,
			`**❯ Memory:**`,
			`\u3000 Total: ${formatBytes(process.memoryUsage().heapTotal)}`,
			`\u3000 Used: ${formatBytes(process.memoryUsage().heapUsed)}`
		].join("\n")
	};
	const code: APIEmbedField = {
		name: "Code",
		value: `[Click here](https://github.com/Lilly3252/LillyBot)`
	};
	const flags: APIEmbedField = {
		name: "Flags",
		value: `${application.flags?.toArray().map((key) => `\n\u3000 ${key}`.replace(/([a-z])([A-Z])/g, "$1 $2"))}`
	};

	const embed: APIEmbed = {
		title: "Bot information",
		author: {
			name: `${application.name} (${application.id})`
		},
		fields: [info, system, code, flags]
	};
	return truncateEmbed(embed);
}
