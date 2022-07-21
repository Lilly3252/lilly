const { SlashCommandBuilder } = require("@discordjs/builders");
const { PermissionsBitField } = require("discord.js");
const SYSTEM = require("./../../Structures/messageSystem.json");


module.exports = {
  data: new SlashCommandBuilder()
    .setName("unban").setDescription("unban a member.")
    .addStringOption((option) => option.setName("id").setDescription("put a id").setRequired(true))
    .addStringOption((option) => option.setName("reason").setDescription("reason to unban").setRequired(true))
    .setDefaultMemberPermissions(PermissionsBitField.Flags.BanMembers),
  async run(interaction) {
    /*if (!interaction.member.permissions.has(PermissionsBitField.Flags.BanMembers)) {
      return interaction.reply({content:SYSTEM.ERROR.PERMISSIONS.MEMBER_PERM["BAN_MEMBERS"],ephemeral:true});
    }
    if (!interaction.guild.members.me.permissions.has(PermissionsBitField.Flags.BanMembers)) {
      return interaction.reply({content:SYSTEM.ERROR.PERMISSIONS.BOT_PERM["BAN_MEMBERS"],ephemeral:true});
    }*/
    let banned_person = interaction.options.getString("id");
    if (isNaN(banned_person))
      return interaction.reply({ content: SYSTEM.ERROR.ADMIN.NO_USER_ID, ephemeral: true });
    let d = interaction.options.getString("reason");
    interaction.guild.bans.fetch().then(async (b) => {
      if (b.size == 0)
        return interaction.reply({ content: SYSTEM.ERROR.ADMIN.NO_USER_BANNED, ephemeral: true });

      let e = b.find((a) => a.user.id == banned_person);
      return e
        ? void (await interaction.guild.members.unban(e.user, d)
          .catch((a) => console.log(a)),
          interaction.reply({ content: `**${e.user}** has been unban`, ephemeral: true }))
        : interaction.reply({ content: "this user is not banned", ephemeral: true });
    });
  },
};
