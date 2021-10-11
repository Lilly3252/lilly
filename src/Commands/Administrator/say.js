const { SlashCommandBuilder } = require('@discordjs/builders');
const { Permissions } = require("discord.js");
const SYSTEM = require("./../../Structures/messageSystem.json");
module.exports = {
  data : new SlashCommandBuilder()
          .setName('say')
          .setDescription('say something.')
          .addStringOption(option => option.setName('message').setDescription('message to say'))
          
  ,
  async run(interaction, b) {
    if (!interaction.member.permissions.has(Permissions.FLAGS.MANAGE_MESSAGES)) {
      return interaction.reply(
        SYSTEM.ERROR.PERMISSIONS.MEMBER_PERM["MANAGE_MESSAGES"]
      );
    }
    if(!interaction.guild.me.permission.has(Permissions.FLAGS.MANAGE_MESSAGES)){
      return interaction.reply(SYSTEM.ERROR.PERMISSIONS.BOT_PERM["MANAGE_MESSAGES"])
    }
    let c,
      d = a.mentions.channels.first();
    a.delete(),
      d
        ? ((c = b.slice(1).join(" ")), d.send(c))
        : ((c = b.join(" ")), interaction.reply(c));
  }
};
