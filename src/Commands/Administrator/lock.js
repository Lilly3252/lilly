const { SlashCommandBuilder } = require('@discordjs/builders');
const { Permissions } = require("discord.js");
const SYSTEM = require("./../../Structures/messageSystem.json");

module.exports = {
  data : new SlashCommandBuilder()
          .setName('lock')
          .setDescription('Lock a channel')
          .addMentionableOption(option => option.setName('channel').setDescription('Mention a channel'))
          .addStringOption(option => option.setName('true').setDescription('true'))
          .addStringOption(option => option.setName('false').setDescription('false'))
          ,
  async run(message, args) {
    if (!interaction.member.permissions.has(Permissions.FLAGS.MANAGE_CHANNELS)) {
      return interaction.reply(
        SYSTEM.ERROR.PERMISSIONS.MEMBER_PERM["MANAGE_CHANNELS"]
      );
    }
    if(!interaction.guild.me.permission.has(Permissions.FLAGS.MANAGE_CHANNELS)){
      return interaction.reply(SYSTEM.ERROR.PERMISSIONS.BOT_PERM["MANAGE_CHANNELS"])
    }
    const unlocked_locked = args[0];
    if ("true" === unlocked_locked) {
      let role = message.channel.guild.roles.cache.get(message.guild.id);
      console.log(role);
      message.channel.guild.channels.cache.forEach(async (text_channel) => {
        await text_channel.updateOverwrite(role, {
          SEND_MESSAGES: false,
        });
      });
      console.log("successfully locked the channels")
      return interaction.reply("locked");
      
    }
      if ("false" === unlocked_locked) {
        let role = message.channel.guild.roles.cache.get(message.guild.id)
        message.channel.guild.channels.cache.forEach(async (text_channel) => {
          await text_channel.updateOverwrite(role, {
            SEND_MESSAGES: true,
          });
          console.log("successfully unlocked the channels")
      }) ; return interaction.reply("unlocked");
    }
  }
  }
;
