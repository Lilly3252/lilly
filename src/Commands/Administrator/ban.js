const { SlashCommandBuilder } = require("@discordjs/builders");
const { Permissions } = require("discord.js");
const SYSTEM = require("./../../Structures/messageSystem.json");
const Guild = require("../../Database/models/Guild");
const Embed = require("./../../Structures/messageEmbeds")

module.exports = {
  data: new SlashCommandBuilder()
    .setName("ban").setDescription("Ban a member.")
    .addUserOption((option) => option.setName("target").setDescription("Select a user").setRequired(true))
    .addStringOption((option) => option.setName("reason").setDescription("reason to ban").setRequired(true)),
  async run(interaction) {
    if (!interaction.member.permissions.has(Permissions.FLAGS.BAN_MEMBERS)) {
      return interaction.reply(SYSTEM.ERROR.PERMISSIONS.MEMBER_PERM["BAN_MEMBERS"]);
    } if (!interaction.guild.me.permissions.has(Permissions.FLAGS.BAN_MEMBERS)) {
      return interaction.reply(SYSTEM.ERROR.PERMISSIONS.BOT_PERM["BAN_MEMBERS"]);
    }
    const c = await Guild.findOne({ guildID: interaction.guild.id })
    const member = interaction.options.getMember("target");
    const reason = interaction.options.getString("reason");

    member.send(`Hello, you have been banned from ${interaction.guild.name} for: ${reason}`)
      .then(() => interaction.guild.members.ban(member))
      .catch((a) => console.log(a)),
      interaction.reply({ content: `**${member.user.tag}** has been banned`, ephemeral: true });
    const g = c.logchannelID;
    g && null !== g && interaction.client.channels.cache.get(g).send({ embeds: [Embed.AdminEmbed(interaction, member, reason)] });
  },
};
