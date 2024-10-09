import type { PingCommand } from "#slashyInformations/index.js";
import i18next from "i18next";

import { Command } from "@yuudachi/framework";
import type { ArgsParam, InteractionParam, LocaleParam } from "@yuudachi/framework/types";

export default class extends Command<typeof PingCommand> {
	public override async chatInput(interaction: InteractionParam, args: ArgsParam<typeof PingCommand>, locale: LocaleParam): Promise<void> {
		const msg = await interaction.reply({
			content: "Pinging...",
			fetchReply: true,
			ephemeral: args.hide ?? true
		});

		const choices = [
			i18next.t("command.utility.ping.responses.nah", { lng: locale }),
			i18next.t("command.utility.ping.responses.okay", { lng: locale }),
			i18next.t("command.utility.ping.responses.alive", { lng: locale })
		];
		const response = choices[Math.floor(Math.random() * choices.length)];
		const latency = msg.createdTimestamp - interaction.createdTimestamp;

		await interaction.editReply({
			content: i18next.t("command.utility.ping.success", {
				response,
				bot_latency: latency,
				API_latency: Math.round(interaction.client.ws.ping),
				lng: locale
			})
		});
	}
}
