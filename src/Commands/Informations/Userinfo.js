const Command = require("../../Structures/Command"),
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
    VERIFIED_DEVELOPER: "Verified Bot Developer",
  };
module.exports = class extends Command {
  constructor(...a) {
    super(...a, {
      
      description:
        "Displays information about a provided user or the message author.",
      category: "\u2049\uFE0FInformations",
      usage: "[user]",
      options: [
          {
            type: "USER",
            name: "user",
            description: "Displays information about a provided user or the message author.",
            required: true
          }
        ]
    });
  }
  async run(interaction, b) {
    const c =
        a.mentions.members.last() || a.guild.members.cache.get(b) || a.member,
      d = c.roles.cache
        .sort((c, a) => a.position - c.position)
        .map((a) => a.toString())
        .slice(0, -1),
      e = c.user.flags.toArray(),
      embed = new MessageEmbed()
        .setThumbnail(c.user.displayAvatarURL({ dynamic: !0, size: 512 }))
        .setColor(c.displayHexColor || "BLUE")
        .addField("User", [
          `**❯ Username:** ${c.user.username}`,
          `**❯ Discriminator:** ${c.user.discriminator}`,
          `**❯ ID:** ${c.id}`,
          `**❯ Flags:** ${
            e.length ? e.map((a) => flags[a]).join(", ") : "None"
          }`,
          `**❯ Avatar:** [Link to avatar](${c.user.displayAvatarURL({
            dynamic: !0,
          })})`,
          `**❯ Time Created:** ${moment(c.user.createdTimestamp).format(
            "LT"
          )} ${moment(c.user.createdTimestamp).format("LL")} ${moment(
            c.user.createdTimestamp
          ).fromNow()}`,
          `**❯ Status:** ${c.user.presence.status}`,
          `**❯ Game:** ${c.user.presence.activities || "Not playing a game."}`,
          `\u200b`,
        ].join("\n"))
        .addField("Member", [
          `**❯ Highest Role:** ${
            c.roles.highest.id === a.guild.id ? "None" : c.roles.highest.name
          }`,
          `**❯ Server Join Date:** ${moment(c.joinedAt).format("LL LTS")}`,
          `**❯ Hoist Role:** ${c.roles.hoist ? c.roles.hoist.name : "None"}`,
          `**❯ Roles [${d.length}]:** ${
            10 > d.length
              ? d.join(", ")
              : 10 < d.length
              ? this.client.utils.trimArray(d)
              : "None"
          }`,
          `\u200b`,
        ].join("\n"));
    return await interaction.reply({embeds: [embed]});
  }
};
