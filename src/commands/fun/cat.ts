
import { ChatInputCommandInteraction, SlashCommandBuilder } from "discord.js";
import type { SlashCommand } from "src/structures/index.js";
import cat from "../../Structures/JSONs/cat-fact.json" assert {type:"json"} ;

export const slashy: SlashCommand["slashy"] = new SlashCommandBuilder()
  .setName("cat")
  .setDescription("tells you a cat fact.")

export const run: SlashCommand["run"] = async (interaction: ChatInputCommandInteraction<"cached">): Promise<void> => {
  return void interaction.reply(`${cat[Math.floor(Math.random() * cat.length)]}`);
}
