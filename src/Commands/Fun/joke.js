const { SlashCommandBuilder } = require("@discordjs/builders");
const jokes = require("../../Structures/JSONs/joke.json");
module.exports = {
  data: new SlashCommandBuilder()
    .setName("joke").setDescription("tells a joke."),
  async run(interaction) {
    return interaction.reply(jokes[Math.floor(Math.random() * jokes.length)]);
  },
};
