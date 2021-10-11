const Event = require("../../Structures/Event.js"),
  { MessageEmbed } = require("discord.js"),
  moment = require("moment"),
  Guild = require("../../Database/models/Guild.js");
module.exports = class extends Event {
  constructor(...a) {
    super(...a, { once: !1 });
  }
  async run(interaction) {
    if (!a.guild) return;
    const b = `${moment(a.user.createdTimestamp).format("LL")} (${moment(
        a.user.createdTimestamp
      ).fromNow()})`,
      c = await Guild.findOne({ guildID: a.guild.id });
    if (!1 === c.antiRaidMode) {
      const d = new MessageEmbed()
          .setColor("GREEN")
          .setAuthor(`${a.user.tag} (${a.id})`, a.user.displayAvatarURL())
          .addField("Information", [
            `**❯ Username:** ${a.user}`,
            `**❯ Created at:** ${b}`,
          ])
          .setFooter("User joined")
          .setTimestamp(new Date()),
        e = c.welcomechannelID;
      if (!e || null === e) return;
      a.client.channels.cache.get(e).send(d);
    } else {
      const d = new MessageEmbed()
          .setColor("RANDOM")
          .setAuthor(`${a.user.tag} (${a.id})`, a.user.displayAvatarURL())
          .addField("Information", [
            `**❯ Username:** ${a.user}`,
            `**❯ Created at:** ${b}`,
          ])
          .setFooter("User joined")
          .setTimestamp(new Date()),
        e = c.welcomechannelID;
      if (!e || null === e) return;
      a.client.channels.cache.get(e).send(d);
    }
  }
};
