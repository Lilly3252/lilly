import { SlashCommandBuilder } from "@discordjs/builders";
import type { ChatInputCommandInteraction } from "discord.js";
import type { SlashCommand } from "src/structures/index.js";
import compliments from "../../Structures/JSONs/compliment.json" assert {type: "json"};


export const slashy: SlashCommand["slashy"] = new SlashCommandBuilder()
  .setName("compliment")
  .setDescription("compliment someone.")
  .addUserOption((option) => option
    .setName("target")
    .setDescription("Select a user")
    .setRequired(true))


export const run: SlashCommand["run"] = async (interaction: ChatInputCommandInteraction<"cached">): Promise<void> => {
  const member = interaction.options.getMember("target");
  if (member) {
    return void interaction.reply(`${compliments[Math.floor(Math.random() * compliments.length)]}`);
  }
}
