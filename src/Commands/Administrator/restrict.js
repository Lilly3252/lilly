const { SlashCommandBuilder } = require("@discordjs/builders");
const Guild = require("../../Database/models/Guild");
const { Permissions, MessageEmbed, PermissionsBitField } = require("discord.js");
const SYSTEM = require("./../../Structures/messageSystem.json");
const Embed = require("./../../Structures/messageEmbeds");
module.exports = {
  data: new SlashCommandBuilder()
    .setName("restrict")
    .setDescription("restrict a member.")
    .addMentionableOption((option) =>
      option
        .setName("member")
        .setDescription("Mention someone to restrict")
        .setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName("restrictions")
        .setDescription("Choose a restriction")
        .setRequired(true)
        .addChoices({name:"Embed", value:"embed"},{name:"Reaction", value:"reaction"},{name:"Voice", value:"voice"},{name:"Slash", value:"slash"})
        .setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName("reasons")
        .setDescription("Specify a reason")
        .setRequired(true)
    )
    .setDefaultMemberPermissions(PermissionsBitField.Flags.ManageRoles),
  async run(interaction) {
   /* if (!interaction.member.permissions.has(PermissionsBitField.Flags.ManageRoles)) {
      return interaction.reply({
        content: SYSTEM.ERROR.PERMISSIONS.MEMBER_PERM["MANAGE_ROLES"],
        ephemeral: true,
      });
    }
    if (!interaction.member.permissions.has(PermissionsBitField.Flags.ManageRoles)) {
      return interaction.reply({
        content: SYSTEM.ERROR.PERMISSIONS.BOT_PERM["MANAGE_ROLES"],
        ephemeral: true,
      });
    }*/
    const c = await Guild.findOne({ guildID: interaction.guild.id });
    const e = interaction.options.getMentionable("member");
    const reason = interaction.options.getString("reasons");
    const restriction_name = interaction.options.getString("restrictions");
    if (!e.moderatable || !e.manageable) {
      await interaction.reply({
        content: SYSTEM.ERROR.ADMIN.MODERATION_DENIED,
        ephemeral: true,
      });
    }
    switch (restriction_name) {
      case "embed":
        let b = interaction.guild.roles.cache.find(
          (a) => "Embed Restriction" === a.name
        );
        if (!b)
          try {
            (b = await interaction.guild.roles.create({
              name: "Embed Restriction",
              color: "#514f48",
            })),
              interaction.guild.channels.cache.forEach(async (text_channel) => {
                await text_channel.permissionOverwrites.edit(b, {
                  EMBED_LINKS: false,
                  ATTACH_FILES: false,
                });
              });
          } catch (a) {
            console.log(a.stack);
          }
        e.roles.add(b).then(() => {
          e
            .send(
              `Hello, you have been restricted in ${interaction.guild.name} for: ${reason}`
            )
            .catch((a) => console.log(a)),
            interaction.reply({
              content: `${e.user.username} was successfully restricted.`,
              ephemeral: true,
            });
        });
        break;
      case "reaction":
        let c = interaction.guild.roles.cache.find(
          (a) => "Reaction Restriction" === a.name
        );
        if (!c)
          try {
            (c = await interaction.guild.roles.create({
              name: "Reaction Restriction",
              color: "#514f48",
            })),
              interaction.guild.channels.cache.forEach(async (text_channel) => {
                await text_channel.permissionOverwrites.edit(c, {
                  ADD_REACTIONS: false,
                });
              });
          } catch (a) {
            console.log(a.stack);
          }
        e.roles.add(c).then(() => {
          e
            .send(
              `Hello, you have been restricted in ${interaction.guild.name} for: ${reason}`
            )
            .catch((a) => console.log(a)),
            interaction.reply({
              content: `${e.user.username} was successfully restricted.`,
              ephemeral: true,
            });
        });
        break;
      case "slash":
        let SlashRole = interaction.guild.roles.cache.find(
          (a) => "Slash Restriction" === a.name
        );
        if (!SlashRole)
          try {
            (SlashRole = await interaction.guild.roles.create({
              name: "Slash Restriction",
              color: "#514f48",
            })),
              interaction.guild.channels.cache.forEach(async (text_channel) => {
                await text_channel.permissionOverwrites.edit(SlashRole, {
                  USE_APPLICATION_COMMANDS: false,
                });
              });
          } catch (a) {
            console.log(a.stack);
          }
        e.roles.add(SlashRole).then(() => {
          e
            .send(
              `Hello, you have been restricted in ${interaction.guild.name} for: ${reason}`
            )
            .catch((a) => console.log(a)),
            interaction.reply({
              content: `${e.user.username} was successfully restricted.`,
              ephemeral: true,
            });
        });
        break;
      case "voice":
        let g = interaction.guild.roles.cache.find(
          (a) => "Voice Restriction" === a.name
        );
        if (!g)
          try {
            (g = await interaction.guild.roles.create({
              name: "Voice Restriction",
              color: "#514f48",
            })),
              interaction.guild.channels.cache.forEach(async (text_channel) => {
                await text_channel.permissionOverwrites.edit(g, {
                  STREAM: false,
                  CONNECT: false,
                  SPEAK: false,
                  USE_VAD: false,
                });
              });
          } catch (a) {
            console.log(a.stack);
          }
        e.roles.add(g).then(() => {
          e
            .send(
              `Hello, you have been restricted in ${interaction.guild.name} for: ${reason}`
            )
            .catch((a) => console.log(a)),
            interaction.reply({
              content: `${e.user.username} was successfully restricted.`,
              ephemeral: true,
            });
        });
        e.voice.setChannel(null);
    }
    const h = c.logchannelID;
    h &&
      null !== h &&
      interaction.client.channels.cache
        .get(h)
        .send({
          embeds: [
            Embed.RestrictEmbed(interaction, reason, restriction_name, e),
          ],
        });
  },
};
