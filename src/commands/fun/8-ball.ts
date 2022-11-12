import { stripIndents } from "common-tags";
import answers from "../../Structures/JSONs/funCommands/8-ball.json" assert {type:"json"};
import type { SlashCommand } from "src/structures/@types/index.js";
import { ChatInputCommandInteraction, RESTJSONErrorCodes, SlashCommandBuilder } from "discord.js";


export const slashy: SlashCommand["slashy"] = new SlashCommandBuilder()
  .setName("8-balls")
  .setDescription("ask a question , Lilly will answer you.")
  .addStringOption((option) =>
    option.setName("question").setDescription("question to ask.").setRequired(true)
  )

export const run: SlashCommand["run"] = async (interaction: ChatInputCommandInteraction<"cached">): Promise<void> => {
  const question = interaction.options.getString("question");
  return void interaction.reply(stripIndents`
			_${question}_
			🎱 ${answers[Math.floor(Math.random() * answers.length)]} 🎱
		`).catch(error => {
      if (error.code === RESTJSONErrorCodes.InvalidFormBodyOrContentType) {
          interaction.reply("i cant answer that..")
      }
  });
}
