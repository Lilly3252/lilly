const Event = require("../../Structures/Event"),
  { MessageEmbed } = require("discord.js"),
  Guild = require("../../Database/models/Guild");

module.exports = class extends Event {
  async run(message) {
    if (message.partial) {
      return;
    } else {
      const database = await Guild.findOne({ guildID: message.guild.id });
      if (database.messageDeleteMode === false) {
        return;
      }
      if (
        database.messageDeleteMode === true &&
        message.guild &&
        null !== message.author
      ) {
        const deleteEmbed = new EmbedBuilder()
          .setAuthor({
            name:
              `${message.author.tag} (${message.author.id})`, iconURL:
              message.author.displayAvatarURL()
          }
          )
          .addField("\u276F Channel", [message.channel].join("\n"))
          .setTimestamp(new Date())
          .setFooter({ text: `Deleted by: ${message.author.tag}` });

        message.content &&
          deleteEmbed.addField(
            "\u276F Content",
            [`${message.content.substring(0, 1020)}`].join("\n")
          ),
          message.attachments.size &&
          deleteEmbed.addField(
            "\u276F Attachment(s)",
            [
              `• ${message.attachments
                .map((a) => a.proxyURL)
                .join("\n\u2022 ")}`,
            ].join("\n")
          ),
          !message.content &&
          message.embeds.length &&
          deleteEmbed.addField(
            "\u276F Embeds",
            [`${message.embeds.length}`].join("\n")
          );
        if (message.embeds.length) {
          deleteEmbed.addField(
            "\u276F Embed Description",
            [`${message.embeds[0].description}`].join("\n")
          );
        }
        const d = database.logchannelID;
        d &&
          null !== d &&
          message.client.channels.cache.get(d).send({ embeds: [deleteEmbed] });
      }
    }
  }
};
