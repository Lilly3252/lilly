const { SlashCommandBuilder } = require("@discordjs/builders");
const Guild = require("../../Database/models/Guild");
const { PermissionsBitField } = require("discord.js");
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
        .addChoices({name:"5min",value: "300000"},{name:"10min",value: "600000"},{name:"15min",value: "900000"},
          {name:"30min",value: "1800000"},{name:"45min", value:"2700000"},{name:"1d", value:"86400000"},{name:"2d", value:"172800000"},
          {name:"3d", value:"259200000"},{name:"4d", value:"345600000"},{name:"5d", value:"432000000"},{name:"6d",value: "518400000"},
          {name:"1week", value:"604800000"},{name:"2weeks", value:"1209600000"},{name:"28days",value: "2419200000"}).setRequired(true))
        
    .addStringOption((option) =>
      option
        .setName("reason")
        .setDescription("reason to timeout")
        .setRequired(true)
    ),

  async run(interaction) {
    if (
      !interaction.member.permissions.has(PermissionsBitField.Flags.ModerateMembers)
    ) {
      return interaction.reply({
        content: SYSTEM.ERROR.PERMISSIONS.MEMBER_PERM["MODERATE_MEMBERS"],
        ephemeral: true,
      });
    }
    if (
      !interaction.guild.me.permissions.has(PermissionsBitField.Flags.ModerateMembers)
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
