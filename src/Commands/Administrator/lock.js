const { SlashCommandBuilder } = require("@discordjs/builders");
const { Permissions } = require("discord.js");
const SYSTEM = require("./../../Structures/messageSystem.json");
//**WORKS */
module.exports = {
  data: new SlashCommandBuilder()
    .setName("lock")
    .setDescription("Lock a channel")
    .addBooleanOption((option) =>
      option
        .setName("choice")
        .setDescription("Select a boolean")
        .setRequired(true)
    ),
  async run(interaction) {
    if (!interaction.member.permissions.has(Permissions.FLAGS.MANAGE_CHANNELS)) {
      return interaction.reply({content:SYSTEM.ERROR.PERMISSIONS.MEMBER_PERM["MANAGE_CHANNELS"],ephemeral:true});
    }
    if (!interaction.guild.me.permissions.has(Permissions.FLAGS.MANAGE_CHANNELS)) {
      return interaction.reply({content:SYSTEM.ERROR.PERMISSIONS.BOT_PERM["MANAGE_CHANNELS"],ephemeral:true});
    }
    const unlocked_locked = interaction.options.getBoolean("choice");
    if (true === unlocked_locked) {
      let role = interaction.channel.guild.roles.cache.get(interaction.guild.id);

      interaction.channel.guild.channels.cache.forEach(async (text_channel) => {
        await text_channel.permissionOverwrites.edit(role, {
          SEND_MESSAGES: false,
        });
      });

      return interaction.reply("This channel has been successfully locked for moderation purposes");
    }
    if (false === unlocked_locked) {
      let role = interaction.channel.guild.roles.cache.get(interaction.guild.id);
      interaction.channel.guild.channels.cache.forEach(async (text_channel) => {
        await text_channel.permissionOverwrites.edit(role, {
          SEND_MESSAGES: true,
        });
      });
      return interaction.reply("This channel has been unlocked!");
    }
  },
};
