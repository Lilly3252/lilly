const { SlashCommandBuilder } = require("@discordjs/builders");
const Guild = require("../../Database/models/Guild");
const { Permissions } = require("discord.js");
const SYSTEM = require("./../../Structures/messageSystem.json");
const Embed = require("./../../Structures/messageEmbeds");
module.exports = {
  data: new SlashCommandBuilder()
    .setName("timeout")
    .setDescription("timeout a member.")
    .addUserOption((option) =>
      option.setName("target").setDescription("Select a user").setRequired(true)
    )
    .addStringOption((option) =>
      option.setName("time").setDescription("time for timeout")
        .addChoices([["5min", "300000"],["10min", "600000"],["15min", "900000"],
          ["30min", "1800000"],["45min", "2700000"],["1d", "86400000"],["2d", "172800000"],
          ["3d", "259200000"],["4d", "345600000"],["5d", "432000000"],["6d", "518400000"],
          ["1week", "604800000"],["2weeks", "1209600000"],["28days", "2419200000"]]).setRequired(true))
        .setRequired(true)
    .addStringOption((option) =>
      option
        .setName("reason")
        .setDescription("reason to timeout")
        .setRequired(true)
    ),

  async run(interaction) {
    if (
      !interaction.member.permissions.has(Permissions.FLAGS.MODERATE_MEMBERS)
    ) {
      return interaction.reply({
        content: SYSTEM.ERROR.PERMISSIONS.MEMBER_PERM["MODERATE_MEMBERS"],
        ephemeral: true,
      });
    }
    if (
      !interaction.guild.me.permissions.has(Permissions.FLAGS.MODERATE_MEMBERS)
    ) {
      return interaction.reply({
        content: SYSTEM.ERROR.PERMISSIONS.BOT_PERM["MODERATE_MEMBERS"],
        ephemeral: true,
      });
    }
    const member = interaction.options.getMember("target");
    const time = interaction.options.getString("time");
    const reason = interaction.options.getString("reason");
    const guild = await Guild.findOne({ guildID: interaction.guild.id });
    if (!member.moderatable || !member.manageable) {
      await interaction.reply({
        content: SYSTEM.ERROR.ADMIN.MODERATION_DENIED,
        ephemeral: true,
      });
    }
    member
      .timeout(+time, reason)
      .then(() => {
        member
          .send(
            `Hello, you have been timeout in ${interaction.guild.name} for: ${reason}`
          )
          .catch((err) => console.log(err)),
          interaction.reply({
            content: `${member.user.username} was successfully timeout.`,
            ephemeral: true,
          });
      })
      .catch((err) => console.log(err));

    const i = guild.logchannelID;
    i &&
      null !== i &&
      interaction.client.channels.cache
        .get(i)
        .send({ embeds: [Embed.MuteEmbed(interaction, member, reason, time)] })
        .catch((err) => console.log(err));
  },
};
