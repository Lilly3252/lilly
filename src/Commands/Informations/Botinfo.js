const { SlashCommandBuilder } = require("@discordjs/builders")
const Embed = require("./../../Structures/messageEmbeds")
  const os = require("os")
//**DONE  */
module.exports = {
  data: new SlashCommandBuilder()
    .setName("botinfo")
    .setDescription("information of the bot."),
  async run(interaction) {
    const b = os.cpus()[0]; 
    await interaction.reply({ embeds: [Embed.BotInfoEmbed(interaction , b)] });
  },
};
