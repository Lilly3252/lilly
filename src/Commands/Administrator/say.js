const { SlashCommandBuilder } = require("@discordjs/builders");
const { PermissionsBitField } = require("discord.js");
const SYSTEM = require("./../../Structures/messageSystem.json");
module.exports = {
  data: new SlashCommandBuilder()
    .setName("say")
    .setDescription("say something.")
    .addStringOption((option) =>
      option.setName("message").setDescription("message to say")
    ),

  async run(interaction, b) {
    if (
      !interaction.member.permissions.has(PermissionsBitField.Flags.ManageMessages)
    ) {
      return interaction.reply(
        {content:SYSTEM.ERROR.PERMISSIONS.MEMBER_PERM["MANAGE_MESSAGES"],ephemeral:true}
      );
    }
    if (
      !interaction.guild.members.me.permissions.has(PermissionsBitField.Flags.ManageMessages)
    ) {
      return interaction.reply(
        {content:SYSTEM.ERROR.PERMISSIONS.BOT_PERM["MANAGE_MESSAGES"],ephemeral:true}
      );
    }
    let c,
      d = a.mentions.channels.first();
    a.delete(),
      d
        ? ((c = b.slice(1).join(" ")), d.send(c))
        : ((c = b.join(" ")), interaction.reply(c));
  },
};
