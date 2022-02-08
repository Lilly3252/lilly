const { SlashCommandBuilder } = require("@discordjs/builders");
const compliments = require("../../Structures/JSONs/compliment.json");
module.exports = {
  data: new SlashCommandBuilder()
    .setName("compliment").setDescription("compliment someone.")
    .addUserOption((option) => option.setName("target").setDescription("Select a user").setRequired(true)),
  async run(interaction) {
    const member = interaction.options.getMember("target");
    if (member) {
      return interaction.reply(compliments[Math.floor(Math.random() * compliments.length)]);
    }
  },
};
