const { SlashCommandBuilder } = require('@discordjs/builders'),
  { MessageEmbed } = require("discord.js"),
  moment = require("moment"),
  filterLevels = {
    DISABLED: "Off",
    MEMBERS_WITHOUT_ROLES: "No Role",
    ALL_MEMBERS: "Everyone",
  },
  verificationLevels = {
    NONE: "None",
    LOW: "Low",
    MEDIUM: "Medium",
    HIGH: "(\u256F\xB0\u25A1\xB0\uFF09\u256F\uFE35 \u253B\u2501\u253B",
    VERY_HIGH:
      "\u253B\u2501\u253B \uFF90\u30FD(\u0CA0\u76CA\u0CA0)\u30CE\u5F61\u253B\u2501\u253B",
  },
  regions = {
    brazil: "Brazil",
    europe: "Europe",
    hongkong: "Hong Kong",
    india: "India",
    japan: "Japan",
    russia: "Russia",
    singapore: "Singapore",
    southafrica: "South Africa",
    sydney: "Sydney",
    "us-central": "US Central",
    "us-east": "US East",
    "us-west": "US West",
    "us-south": "US South",
  };
module.exports = {
data : new SlashCommandBuilder()
        .setName('serverinfo')
        .setDescription('Ban a member.')
 ,
  async run(interaction) {
    const b = a.guild.roles.cache
        .sort((c, a) => a.position - c.position)
        .map((a) => a.toString()),
      c = a.guild.members.cache,
      d = a.guild.channels.cache,
      e = a.guild.emojis.cache,
      f = new MessageEmbed()
        .setDescription(`**Guild information for __${a.guild.name}__**`)
        .setColor("BLUE")
        .setThumbnail(a.guild.iconURL({ dynamic: !0 }))
        .addField("General", [
          `**❯ Name:** ${a.guild.name}`,
          `**❯ ID:** ${interaction.guild.id}`,
          `**❯ Owner:** ${a.guild.owner.user.tag} (${a.guild.ownerID})`,
          `**❯ Region:** ${regions[a.guild.region]}`,
          `**❯ Boost Tier:** ${
            a.guild.premiumTier ? `Tier ${a.guild.premiumTier}` : "None"
          }`,
          `**❯ Explicit Filter:** ${
            filterLevels[a.guild.explicitContentFilter]
          }`,
          `**❯ Verification Level:** ${
            verificationLevels[a.guild.verificationLevel]
          }`,
          `**❯ Time Created:** ${moment(a.guild.createdTimestamp).format(
            "LT"
          )} ${moment(a.guild.createdTimestamp).format("LL")} ${moment(
            a.guild.createdTimestamp
          ).fromNow()}`,
          "\u200B",
        ].join("\n"))
        .addField("Statistics", [
          `**❯ Role Count:** ${b.length}`,
          `**❯ Emoji Count:** ${e.size}`,
          `**❯ Regular Emoji Count:** ${e.filter((a) => !a.animated).size}`,
          `**❯ Animated Emoji Count:** ${e.filter((a) => a.animated).size}`,
          `**❯ Member Count:** ${a.guild.memberCount}`,
          `**❯ Humans:** ${c.filter((a) => !a.user.bot).size}`,
          `**❯ Bots:** ${c.filter((a) => a.user.bot).size}`,
          `**❯ Text Channels:** ${d.filter((a) => "text" === a.type).size}`,
          `**❯ Voice Channels:** ${d.filter((a) => "voice" === a.type).size}`,
          `**❯ Boost Count:** ${a.guild.premiumSubscriptionCount || "0"}`,
          "\u200B",
        ])
        .addField("Presence", [
          `**❯ Online:** ${
            c.filter((a) => "online" === a.presence.status).size
          }`,
          `**❯ Idle:** ${c.filter((a) => "idle" === a.presence.status).size}`,
          `**❯ Do Not Disturb:** ${
            c.filter((a) => "dnd" === a.presence.status).size
          }`,
          `**❯ Offline:** ${
            c.filter((a) => "offline" === a.presence.status).size
          }`,
          "\u200B",
        ].join("\n"))
        .addField(
          `Roles [${b.length - 1}]`,
          10 > b.length
            ? b.join(", ")
            : 10 < b.length
            ? interaction.client.utils.trimArray(b)
            : "None"
        ).join("\n")
        .setTimestamp();
    interaction.reply({ embeds: [f] });
  }
};
