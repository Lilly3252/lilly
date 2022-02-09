const { SlashCommandBuilder } = require("@discordjs/builders");
const Embed = require("./../../Structures/messageEmbeds")
const filterLevels = {
  DISABLED: "Off",
  MEMBERS_WITHOUT_ROLES: "No Role",
  ALL_MEMBERS: "Everyone",
}
const verificationLevels = {
  NONE: "None",
  LOW: "Low",
  MEDIUM: "Medium",
  HIGH: "(\u256F\xB0\u25A1\xB0\uFF09\u256F\uFE35 \u253B\u2501\u253B",
  VERY_HIGH:
    "\u253B\u2501\u253B \uFF90\u30FD(\u0CA0\u76CA\u0CA0)\u30CE\u5F61\u253B\u2501\u253B",
};

module.exports = {
  data: new SlashCommandBuilder()
    .setName("serverinfo")
    .setDescription("Information of the server."),
  async run(interaction) {
    const owner = await interaction.guild.fetchOwner();
    const b = interaction.guild.roles.cache.sort((c, a) => a.position - c.position).map((a) => a.toString());
    const member = interaction.guild.members.cache
    const d = interaction.guild.channels.cache
    const e = interaction.guild.emojis.cache

    interaction.reply({ embeds: [Embed.ServerInfoEmbed(interaction, owner, member, b, d, e, filterLevels, verificationLevels)] });
  },
};
