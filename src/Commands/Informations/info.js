const { SlashCommandBuilder, time } = require("@discordjs/builders");
const Embed = require("../../Structures/messageEmbeds");
const os = require("os");
const {UserFlagsBitField} = require("discord.js")


module.exports = {
  data: new SlashCommandBuilder()
    .setName("info")
    .setDescription("Informations.")
    .addSubcommand((subcommand) =>
      subcommand
        .setName("channel")
        .setDescription("Select a channel.")
        .addChannelOption((option) =>
          option
            .setName("channel")
            .setDescription("Select a channel.")
            .setRequired(true)
        )
    )
    .addSubcommand((subcommand) =>
      subcommand
        .setName("role")
        .setDescription("Select a role.")
        .addRoleOption((option) =>
          option
            .setName("role")
            .setDescription("Select a role.")
            .setRequired(true)
        )
    )
    .addSubcommand((subcommand) =>
      subcommand.setName("bot").setDescription("Get information of the bot.")
    )
    .addSubcommand((subcommand) =>
      subcommand
        .setName("user")
        .setDescription("Get information of a user.")
        .addUserOption((option) =>
          option
            .setName("target")
            .setDescription("Select a user")
            .setRequired(true)
        )
    )
    .addSubcommand((subcommand) =>
      subcommand
        .setName("server")
        .setDescription("Get information of the server.")
    ),
  async run(interaction) {
    if (interaction.options.getSubcommand() === "channel") {
      const channel = interaction.options.getChannel("channel");
      
      const chanCreateTime = time(channel.createdAt, "R");

      await interaction.reply({
        embeds: [
          Embed.ChannelEmbed(
            interaction,
            chanCreateTime,
            channel,
            
            
          ),
        ],
      });
    }
    if (interaction.options.getSubcommand() === "role") {
      const c = interaction.options.getRole("role");

      interaction.reply({ embeds: [Embed.RoleEmbed(interaction, c)] });
    }
    if (interaction.options.getSubcommand() === "server") {
      const server_create = time(interaction.guild.createdAt, "R");
      const owner = await interaction.guild.fetchOwner();
      const b = interaction.guild.roles.cache
        .sort((c, a) => a.position - c.position)
        .map((a) => a.toString());
      const member = interaction.guild.members.cache;
      const d = interaction.guild.channels.cache;
      const e = interaction.guild.emojis.cache;

      interaction.reply({
        embeds: [
          Embed.ServerInfoEmbed(
            interaction,
            owner,
            member,
            b,
            d,
            e,
            server_create
          ),
        ],
      });
    }
    if (interaction.options.getSubcommand() === "bot") {
      const b = os.cpus()[0];
      const bot_create = time(interaction.client.user.createdAt, "R");
      await interaction.reply({
        embeds: [Embed.BotInfoEmbed(interaction, b, bot_create)],
      });
    }
    if (interaction.options.getSubcommand() === "user") {
      const member = interaction.options.getMember("target");
      const flags = {
        BotHTTPInteractions : "HTTP Interaction Only",
        Staff: "Discord Employee",
        Partner: "Discord Partner",
        BugHunterLevel1: "Bug Hunter (Level 1)",
        BugHunterLevel2: "Bug Hunter (Level 2)",
        HypeSquadOnlineHouse1: "House of Bravery",
        HypeSquadOnlineHouse2: "House of Brilliance",
        HypeSquadOnlineHouse3: "House of Balance",
        Hypesquad: "Hypesquad",
        Quarantined : "Quarantined Account",
        Spammer: "Spammer User" , 
        PremiumEarlySupporter: "Early Nitro Supporter",
        TeamPseudoUser: "Team User",
        VerifiedBot: "Verified Bot",
        VerifiedDeveloper: "Early Verified Bot Developer",
        CertifiedModerator: "Discord Certified Moderator",
      };
      const created = time(member.user.createdAt, "R");
      const flag = member.user.flags.toArray()
      console.log(flag)
      const role = member.roles.cache.sort((c, a) => a.position - c.position).map((a) => a.toString()).slice(0, -1);
      return interaction.reply({
        embeds: [
          Embed.UserInfoEmbed(interaction, member, role, flag, flags, created),
        ],
      });
    }
  },
};
