const { SlashCommandBuilder } = require("@discordjs/builders");
const Guild = require("../../Database/models/Guild");
const { PermissionsBitField } = require("discord.js");
const SYSTEM = require("./../../Structures/messageSystem.json");
const Embed = require("./../../Structures/messageEmbeds");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("kick")
    .setDescription("kick a member.")
    .addUserOption((option) =>
      option.setName("target").setDescription("Select a user").setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName("reason")
        .setDescription("reason to kick")
        .setRequired(true)
    ),
  async run(interaction) {
    if (!interaction.member.permissions.has(PermissionsBitField.Flags.KickMembers)) {
      return interaction.reply({
        content: SYSTEM.ERROR.PERMISSIONS.MEMBER_PERM["KICK_MEMBERS"],
        ephemeral: true,
      });
    }
    if (!interaction.guild.me.permissions.has(PermissionsBitField.Flags.KickMembers)) {
      return interaction.reply({
        content: SYSTEM.ERROR.PERMISSIONS.BOT_PERM["KICK_MEMBERS"],
        ephemeral: true,
      });
    }
    const c = await Guild.findOne({ guildID: interaction.guild.id });
    const member = interaction.options.getMember("target");
    const reason = interaction.options.getString("reason");
    if (!member.moderatable || !member.manageable) {
      await interaction.reply({
        content: SYSTEM.ERROR.ADMIN.MODERATION_DENIED,
        ephemeral: true,
      });
    }
    member
      .send(
        `Hello, you have been kicked from ${interaction.guild.name} for: ${reason}.\n `
      )
      .then(() => member.kick())
      .catch((a) => console.log(a)),
      interaction.reply({
        content: `**${member.user.tag}** has been kicked`,
        ephemeral: true,
      });
    const g = c.logchannelID; // finding the channel ID through db
    g &&
      null !== g &&
      interaction.client.channels.cache
        .get(g)
        .send({ embeds: [Embed.AdminEmbed(interaction, member, reason)] });
  },
};
