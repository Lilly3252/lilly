const { MessageEmbed } = require("discord.js"),
  Command = require("../../Structures/Command");
module.exports = class extends Command {
  constructor(...a) {
    super(...a, {
      aliases: ["RoleInfo"],
      description: "Displays the information of a specific role.",
      category: `⁉️Informations`,
      usage: "[command] + RoleID / Role Mention",
    });
  }
  async run(a, b) {
    const c = a.mentions.roles.first() || a.guild.roles.cache.get(b[0]),
      d = new MessageEmbed()
        .setTimestamp()
        .setColor(c.color)
        .setThumbnail(a.guild.iconURL({ dynamic: !0 }))
        .setDescription(`**Role information**`)
        .addField("Role", [
          `**❯ Name:** ${c.name}`,
          `**❯ Role ID:** ${c.id}`,
          `**❯ Color:** ${c.color}`,
          `**❯ Hoisted:** ${c.hoist}`,
          `**❯ Mentionable:** ${c.mentionable}`,
        ]);
    a.channel.send(d);
  }
};
