const Event = require("../../Structures/Event.js"),
  { MessageEmbed } = require("discord.js"),
  moment = require("moment"),
  Guild = require("../../Database/models/Guild");
module.exports = class extends Event {
  constructor(...a) {
    super(...a, { once: false });
  }
  async run(a) {
    if (!a.guild) return;
    const b = await Guild.findOne({ guildID: a.guild.id }),
      c = new MessageEmbed()
        .setColor("RANDOM")
        .setAuthor({name:`${a.user.tag} (${a.id})`,iconURL: a.user.displayAvatarURL()})
        .setFooter({text:"User left"})
        .setTimestamp(new Date()),
      d = a.guild.channels.cache.get(b.welcomechannelID);
    d && d.send({embeds : [c]});
  }
};
