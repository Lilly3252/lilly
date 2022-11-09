import { SlashCommandBuilder } from "@discordjs/builders";
import type { ChatInputCommandInteraction } from "discord.js";
import type { SlashCommand } from "src/structures/@types/index.js";
import roasts from "../../Structures/JSONs/funCommands/roast.json" assert {type:"json"} ;

export const slashy: SlashCommand["slashy"] = new SlashCommandBuilder()
  .setName("roast").setDescription("roast someone.")
  .addUserOption((option) => option.setName("target").setDescription("Select a user").setRequired(true)
  )

export const run: SlashCommand["run"] = async (interaction: ChatInputCommandInteraction<"cached">): Promise<void> => {
  const member = interaction.options.getMember("target");
  if (member) {
    return void interaction.reply(`${member.user.username}, ${roasts[Math.floor(Math.random() * roasts.length)]}`);
  }
}
