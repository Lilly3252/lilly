const { SlashCommandBuilder } = require("@discordjs/builders"),
  { MessageEmbed } = require("discord.js"),
  moment = require("moment"),
  flags = {
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
  };
module.exports = {
  data: new SlashCommandBuilder()
    .setName("userinfo")
    .setDescription("Info of a user.")
    .addUserOption((option) => option.setName("target").setDescription("Select a user").setRequired(true)),
  async run(interaction) {
    
    const c = interaction.options.getMember("target");
    
    const d = c.roles.cache
        .sort((c, a) => a.position - c.position)
        .map((a) => a.toString())
        .slice(0, -1),
      e = c.user.flags.toArray(),
      embed = new MessageEmbed()
        .setThumbnail(c.user.displayAvatarURL({ dynamic: !0, size: 512 }))
        .setColor(c.displayHexColor || "BLUE")
        .addField(
          "User",
          [
            `**❯ Username:** ${c.user.username}`,
            `**❯ Discriminator:** ${c.user.discriminator}`,
            `**❯ ID:** ${c.id}`,
            `**❯ Flags:** ${e.length ? e.map((a) => flags[a]).join(", ") : "None"}`,
            `**❯ Avatar:** [Link to avatar](${c.user.displayAvatarURL({
              dynamic: !0
            })})`,
            `**❯ Time Created:** ${moment(c.user.createdTimestamp).format("LT")} ${moment(c.user.createdTimestamp).format("LL")} ${moment(c.user.createdTimestamp).fromNow()}`,
            `**❯ Status:** ${c.presence.status}`,
            `**❯ Game / Custom status:** ${c.presence.activities[0].state || "Not playing a game."}`,
            `\u200b`
          ].join("\n")
        )
        .addField(
          "Member",
          [
            `**❯ Highest Role:** ${c.roles.highest.id === interaction.guild.id ? "None" : c.roles.highest.name}`,
            `**❯ Server Join Date:** ${moment(c.joinedAt).format("LL LTS")}`,
            `**❯ Hoist Role:** ${c.roles.hoist ? c.roles.hoist.name : "None"}`,
            `**❯ Roles [${d.length}]:** ${10 > d.length ? d.join(", ") : 10 < d.length ? interaction.client.utils.trimArray(d) : "None"}`,
            `\u200b`
          ].join("\n")
        );
    return await interaction.reply({ embeds: [embed] });
  }
};
