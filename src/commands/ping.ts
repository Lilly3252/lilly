import type { CommandInteraction } from "discord.js";
import { Command } from "@sapphire/framework";
import type { Message } from "discord.js";

export class PingCommand extends Command {
  public constructor(context: Command.Context) {
    super(context, {
      description: "Pong!!!",
      chatInputCommand: {
        register: true,
      },
    });
  }

  public async chatInputRun(interaction: CommandInteraction<"cached">) {
    const msg = (await interaction.reply({
      content: "Pinging...",
      fetchReply: true,
    })) as Message;

    const latency = msg.createdTimestamp - interaction.createdTimestamp;
    const choices = [
      "Is this really my ping?",
      "Is this okay? I can't look!",
      "I hope it isn't bad!",
    ];
    const response = choices[Math.floor(Math.random() * choices.length)];

    interaction.editReply({
      content: `${response} - Bot Latency: \`${latency}ms\` , API Latency: \`${Math.round(
        interaction.client.ws.ping
      )}ms\``
    })
  }
}
