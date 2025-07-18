import type { PingCommand } from "#slashyInformations/index.js";
import { RawArgsParam, RawCommandParam } from "#utils/types/functiontypes.js";
import { Command } from "@yuudachi/framework";
import type { Runtime } from "@yuudachi/framework/types";
import { MessageFlags } from "discord.js";
import i18next from "i18next";



export default class extends Command<typeof PingCommand, Runtime.Raw> {
  public override async chatInput(interaction:RawCommandParam, args: RawArgsParam<typeof PingCommand>): Promise<void> {

    const msg = await interaction.reply({
      content: "Pinging...",
      withResponse: true,
      ephemeral: args.hide ?? MessageFlags.Ephemeral,
    });

    const choices = [
      i18next.t("command.utility.ping.responses.nah", { lng: interaction.locale }),
      i18next.t("command.utility.ping.responses.okay", { lng: interaction.locale }),
      i18next.t("command.utility.ping.responses.alive", { lng: interaction.locale }),
    ];

    const response = choices[Math.floor(Math.random() * choices.length)];
    const latency = msg.createdTimestamp - interaction.client.ws.ping;

    await interaction.editReply({
      content: i18next.t("command.utility.ping.success", {
        response,
        bot_latency: latency,
        API_latency: Math.round(interaction.client.ws.ping),
        lng: interaction.locale,
      }),
    });
  }
}
