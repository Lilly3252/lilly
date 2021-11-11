const Event = require("../../Structures/Event"),
  { MessageEmbed } = require("discord.js"),
  Guild = require("../../Database/models/Guild");

module.exports = class extends Event {
  async run(message) {
    if (message.partial) {
      return;
    } else {
      const b = await Guild.findOne({ guildID: message.guild.id });
      if (b.messageDeleteMode === !1) {
        return;
      }
      if (!(b.messageDeleteMode === !1) && message.guild && null !== message.author) {
        const deleteEmbed = new MessageEmbed().setAuthor(`${message.author.tag} (${message.author.id})`, message.author.displayAvatarURL()).addField("\u276F Channel", [message.channel].join("\n")).setTimestamp(new Date()).setFooter(`Deleted by: ${message.interaction.user.username}`);

        message.content && deleteEmbed.addField("\u276F Content", [`${message.content.substring(0, 1020)}`].join("\n")),
          message.attachments.size && deleteEmbed.addField("\u276F Attachment(s)", [`• ${message.attachments.map((a) => a.proxyURL).join("\n\u2022 ")}`].join("\n")),
          !message.content && message.embeds.length && deleteEmbed.addField("\u276F Embeds", [`${message.embeds.length}`].join("\n"));
        if (message.embeds.length) {
          deleteEmbed.addField("\u276F Embed Description", [`${message.embeds[0].description}`].join("\n"));
        }
        const d = b.logchannelID;
        d && null !== d && message.client.channels.cache.get(d).send({ embeds: [deleteEmbed] });
      }
    }
  }
};
