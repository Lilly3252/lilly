const { SlashCommandBuilder } = require("@discordjs/builders");
const { Permissions } = require("discord.js");
const SYSTEM = require("./../../Structures/messageSystem.json");

//**WORKS */
module.exports = {
  data: new SlashCommandBuilder()
    .setName("purge")
    .setDescription("purge messages in a channel")
    .addStringOption((option) => option.setName("number").setDescription("number of messages from 1-99").setRequired(true)),

  async run(interaction, b) {
    if (!interaction.member.permissions.has(Permissions.FLAGS.MANAGE_MESSAGES)) {
      return interaction.reply(SYSTEM.ERROR.PERMISSIONS.MEMBER_PERM["MANAGE_MESSAGES"]);
    }
    if (!interaction.guild.me.permissions.has(Permissions.FLAGS.MANAGE_MESSAGES)) {
      return interaction.reply(SYSTEM.ERROR.PERMISSIONS.BOT_PERM["MANAGE_MESSAGES"]);
    }
    const c = interaction.options.getString("number");
    if (!c) return interaction.reply("Please provide a number");
    if (isNaN(c) || 100 < c) return interaction.reply("amount must be a valid number and below 100");
    try {
      await interaction.channel.bulkDelete(+c).then(() => {
        interaction.reply(`Deleted ${c} messages.`);
      });
    } catch {
      return interaction.reply("An error occurred when deleting the messages, make sure they are not older than 14days");
    }
  }
};
