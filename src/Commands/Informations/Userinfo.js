const { SlashCommandBuilder } = require("@discordjs/builders");
const Embed = require("./../../Structures/messageEmbeds")
module.exports = {
  data: new SlashCommandBuilder()
    .setName("userinfo").setDescription("Info of a user.").addUserOption((option) => option.setName("target").setDescription("Select a user").setRequired(true)),
  async run(interaction) {
    const member = interaction.options.getMember("target");
    const flags = {
      DISCORD_EMPLOYEE: "Discord Employee",
      DISCORD_PARTNER: "Discord Partner",
      BUGHUNTER_LEVEL_1: "Bug Hunter (Level 1)",
      BUGHUNTER_LEVEL_2: "Bug Hunter (Level 2)",
      HYPESQUAD_EVENTS: "HypeSquad Events",
      HOUSE_BRAVERY: "House of Bravery",
      HOUSE_BRILLIANCE: "House of Brilliance",
      HOUSE_BALANCE: "House of Balance",
      EARLY_SUPPORTER: "Early Supporter",
      TEAM_USER: "Team User",
      SYSTEM: "System",
      VERIFIED_BOT: "Verified Bot",
      VERIFIED_DEVELOPER: "Verified Bot Developer"
    }
    const flag = member.user.flags.toArray()
    const role = member.roles.cache
      .sort((c, a) => a.position - c.position)
      .map((a) => a.toString())
      .slice(0, -1)
    return interaction.reply({ embeds: [Embed.UserInfoEmbed(interaction, member, role, flag, flags)] });
  }
};
