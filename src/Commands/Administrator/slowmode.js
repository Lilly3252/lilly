const { SlashCommandBuilder } = require("@discordjs/builders"),
  { MessageEmbed } = require("discord.js");
const { Permissions } = require("discord.js");
const SYSTEM = require("./../../Structures/messageSystem.json");

//! needs to be checked//
module.exports = {
  data: new SlashCommandBuilder()
    .setName("slowmode")
    .setDescription("slowmode a channel.")
    .addMentionableOption((option) =>
      option.setName("channel").setDescription("channel name")
    .setRequired(true))
    .addNumberOption((option) =>
      option.setName("number").setDescription("Enter a number").setRequired(true)
    ),
  async run(interaction, b) {
    if (!interaction.member.permissions.has(Permissions.FLAGS.MANAGE_CHANNELS)) {
      return interaction.reply({content:SYSTEM.ERROR.PERMISSIONS.MEMBER_PERM["MANAGE_CHANNELS"],ephemeral:true});
    }
    if (!interaction.guild.me.permissions.has(Permissions.FLAGS.MANAGE_CHANNELS)) {
      return interaction.reply({content:SYSTEM.ERROR.PERMISSIONS.BOT_PERM["MANAGE_CHANNELS"],ephemeral:true});
    }
    return isNaN(b[0])
      ? interaction.reply("That is not a number!")
      : void (await a.channel.setRateLimitPerUser(b[0]).then(() => {
        interaction.reply(new MessageEmbed({ title: `Set the slow mode to ${b[0]} seconds` }), { ephemeral: true });
      })
        .catch((a) => console.log(a)));
  },
};
