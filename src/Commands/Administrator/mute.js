const { SlashCommandBuilder } = require("@discordjs/builders");
const guild = require("../../Database/models/Guild");
const { Permissions } = require("discord.js");
const SYSTEM = require("./../../Structures/messageSystem.json");
const Embed = require("./../../Structures/messageEmbeds");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("mute")
    .setDescription("mute a member.")
    .addUserOption((option) =>
      option.setName("target").setDescription("Select a user").setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName("reason")
        .setDescription("reason to mute")
        .setRequired(true)
    ),

  async run(interaction) {
    if (!interaction.member.permissions.has(Permissions.FLAGS.MUTE_MEMBERS)) {
      return interaction.reply({
        content: SYSTEM.ERROR.PERMISSIONS.MEMBER_PERM["MUTE_MEMBERS"],
        ephemeral: true,
      });
    }
    if (!interaction.guild.me.permissions.has(Permissions.FLAGS.MUTE_MEMBERS)) {
      return interaction.reply({
        content: SYSTEM.ERROR.PERMISSIONS.BOT_PERM["MUTE_MEMBERS"],
        ephemeral: true,
      });
    }

    const member = interaction.options.getMember("target");
    const reason = interaction.options.getString("reason");
    const guild_log = await guild.findOne({ guildID: interaction.guild.id });
    if (!member.moderatable || !member.manageable) {
      await interaction.reply({
        content: SYSTEM.ERROR.ADMIN.MODERATION_DENIED,
        ephemeral: true,
      });
    }
    let role = interaction.guild.roles.cache.find(
      (role) => "Muted" === role.name
    );
    if (!role)
      try {
        (role = await interaction.guild.roles.create({
          name: "Muted",
          color: "#514f48",
          permissions: [],
        })),
          interaction.guild.channels.cache.forEach(async (text_channel) => {
            await text_channel.permissionOverwrites.edit(role, {
              SEND_MESSAGES: false,
              ADD_REACTIONS: false,
              SEND_TTS_MESSAGES: false,
              ATTACH_FILES: false,
              SPEAK: false,
            });
          });
      } catch (err) {
        console.log(err.stack);
      }
    member.roles.add(role.id).then(() => {
      member
        .send(
          `Hello, you have been muted in ${interaction.guild.name} for: ${reason}`
        )
        .catch((err) => console.log(err)),
        interaction.reply({
          content: `${member.user.username} was successfully muted.`,
          ephemeral: true,
        });
    });

    const i = guild_log.logchannelID;
    i &&
      null !== i &&
      interaction.client.channels.cache
        .get(i)
        .send({ embeds: [Embed.AdminEmbed(interaction, member, reason)] });
  },
};
