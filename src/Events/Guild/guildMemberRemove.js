const Event = require("../../Structures/Event.js"),
  { MessageEmbed } = require("discord.js"),
  moment = require("moment"),
  Guild = require("../../Database/models/Guild");
module.exports = class extends Event {
  constructor(...a) {
    super(...a, { once: !1 });
  }
  async run(interaction) {
    if (!a.guild) return;
    const b = await Guild.findOne({ guildID: a.guild.id }),
      c = new MessageEmbed()
        .setColor("RANDOM")
        .setAuthor(`${a.user.tag} (${a.id})`, a.user.displayAvatarURL())
        .setFooter("User left")
        .setTimestamp(new Date()),
      d = a.guild.channels.cache.get(b.welcomechannelID);
    d && d.send(c);
  }
};
