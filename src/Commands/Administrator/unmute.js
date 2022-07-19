const { SlashCommandBuilder } = require("@discordjs/builders")
const Guild = require("../../Database/models/Guild")
const { PermissionsBitField } = require("discord.js");
const SYSTEM = require("./../../Structures/messageSystem.json");
const AdminEmbed = require("./../../Structures/messageEmbeds")
//! needs to be checked//
module.exports = {
  data: new SlashCommandBuilder()
    .setName("unmute")
    .setDescription("unmute a member.")
    .addMentionableOption((option) =>
      option.setName("member").setDescription("Mention someone")
        .setRequired(true))
        .setDefaultMemberPermissions(PermissionsBitField.Flags.MuteMembers),
  async run(interaction) {
    await interaction.reply({ content: "This command is not finished yet.", ephemeral: true })
    /*if (!interaction.member.permissions.has(PermissionsBitField.Flags.MuteMembers)) {
      return interaction.reply(
        SYSTEM.ERROR.PERMISSIONS.MEMBER_PERM["MUTE_MEMBERS"]
      );
    }
    if (!interaction.guild.members.me.permissions.has(PermissionsBitField.Flags.MuteMembers)) {
      return interaction.reply(
        SYSTEM.ERROR.PERMISSIONS.BOT_PERM["MUTE_MEMBERS"]
      );
    }
    
    let member = a.mentions.members.first() || a.guild.members.cache.get(b[0]);
    if (!member)
      return interaction.reply("Please mention a user to be unmuted!");
    let e =

      h = a.guild.roles.cache.find((a) => "Muted" === a.name);
    if (!h)
      try {
        (h = await a.guild.roles.create({
          data: { name: "Muted", color: "#514f48", permissions: [] },
        })),
          a.guild.channels.forEach(async (a) => {
            await a.permissionOverwrites.edit(h, {
              SEND_MESSAGES: false,
              ADD_REACTIONS: false,
              SEND_TTS_MESSAGES: false,
              ATTACH_FILES: false,
              SPEAK: false,
            });
          });
      } catch (a) {
        console.log(a.stack);
      }
    if (!member.roles.cache.has(h.id))
      return interaction.reply({ content: "This member has no mute role.", ephemeral: true });
    member.roles.remove(h.id).then(() => {
      member
        .send(
          `Hello, you have been unmuted in ${a.guild.name}. Congratulation!`
        )
        .catch((a) => console.log(a)),
        interaction.reply({
          content:
            `${member.user.username} was successfully unmuted.`, ephemeral: true
        }
        );
    });
  */
  }

}

