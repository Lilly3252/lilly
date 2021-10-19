const { SlashCommandBuilder } = require("@discordjs/builders");
const Guild = require("../../Database/models/Guild");
const { Permissions } = require("discord.js");
const SYSTEM = require("./../../Structures/messageSystem.json");
module.exports = {
  data: new SlashCommandBuilder().setName("seewelcome").setDescription("See your welcome message from the Database."),

  // eslint-disable-next-line no-unused-vars
  async run(interaction, args) {
    if (!interaction.member.permissions.has(Permissions.FLAGS.ADMINISTRATOR)) {
      return interaction.reply(SYSTEM.ERROR.PERMISSIONS.MEMBER_PERM["ADMINISTRATOR"]);
    }
    if (!interaction.guild.me.permissions.has(Permissions.FLAGS.ADMINISTRATOR)) {
      return interaction.reply(SYSTEM.ERROR.PERMISSIONS.BOT_PERM["ADMINISTRATOR"]);
    }
    const settings = await Guild.findOne({
      guildID: interaction.guild.id
    });
    interaction.reply(`this is your welcome message ${settings.PersonalizedWelcomeMessage}`);
  }
};
