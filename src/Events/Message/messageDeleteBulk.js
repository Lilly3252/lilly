const Event = require("../../Structures/Event");
const { MessageEmbed } = require("discord.js");
const moment = require("moment");
const Guild = require("../../Database/models/Guild");
const { collection } = require("../../Database/models/Guild");
//**WORKS */
module.exports = class extends Event {
  async run(messages = new collection(message)) {
    const settings = await Guild.findOne({
      guildID: messages.first().guild.id,
    });

    if (settings.messageBulkDeleteMode === false) {
      return;
    }
    if (!messages.first().author) { return }
    const length = [...messages.values()].length;
    const channel = messages.first().channel.name;

    const embed = new MessageEmbed()
      .setAuthor({
        name:
          `${messages.first().author.tag} (${messages.first().author.id})`, iconURL:
          messages.first().author.displayAvatarURL()
      }
      )
      .setTitle(`${length} Messages purged in #${channel}`)
      .setDescription(
        messages
          .map((message) => `**❯** [${message.author.tag}]: ${message.content}`)
          .join("\n")
      )
      .setFooter({ text: `${length} latest shown` })
      .setColor("#dd5f53")
      .setTimestamp();

    const ModeratorChannel = settings.logchannelID;
    if (!ModeratorChannel || ModeratorChannel === null) return;
    (await messages.first().client.channels.fetch(ModeratorChannel)).send({
      embeds: [embed],
    });
  }
};
