const { SlashCommandBuilder } = require("@discordjs/builders");
const bunny = require("../../Structures/JSONs/bunny-fact.json");
module.exports = {
  data: new SlashCommandBuilder()
    .setName("bunny")
    .setDescription("tells you a bunny fact."),
  async run(interaction) {
    return interaction.reply(bunny[Math.floor(Math.random() * bunny.length)]);
  },
};
