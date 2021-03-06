const { SlashCommandBuilder } = require("@discordjs/builders");
const { PermissionsBitField } = require("discord.js");
const SYSTEM = require("./../../Structures/messageSystem.json");

//**WORKS */
module.exports = {
  data: new SlashCommandBuilder()
    .setName("purge").setDescription("purge messages in a channel")
    .addStringOption((option) => option.setName("number").setDescription("number of messages from 1-99").setRequired(true))
    .setDefaultMemberPermissions(PermissionsBitField.Flags.ManageMessages),
  async run(interaction) {
    /*if (!interaction.member.permissions.has(PermissionsBitField.Flags.ManageMessages)) {
      return interaction.reply({content:SYSTEM.ERROR.PERMISSIONS.MEMBER_PERM["MANAGE_MESSAGES"],ephemeral:true});
    } if (!interaction.guild.members.me.permissions.has(PermissionsBitField.Flags.ManageMessages)) {
      return interaction.reply({content:SYSTEM.ERROR.PERMISSIONS.BOT_PERM["MANAGE_MESSAGES"],ephemeral:true});
    }*/
    const count = interaction.options.getString("number");
    if (isNaN(count) || 100 < count)
      return interaction.reply({ content: SYSTEM.ERROR.ADMIN.VALID_AMOUNT, ephemeral: true });
    try {
      await interaction.channel.bulkDelete(+count).then(() => {
        interaction.reply(`Deleted ${count} messages.`);
      });
    } catch {
      return interaction.reply({ content: SYSTEM.ERROR.ADMIN.MESSAGE_DELETED, ephemeral: true }
      );
    }
  },
};
