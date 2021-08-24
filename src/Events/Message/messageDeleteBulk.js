const Event = require("../../Structures/Event");
const { MessageEmbed } = require("discord.js");
const moment = require("moment");
const Guild = require("../../Database/models/Guild");
const { collection } = require("../../Database/models/Guild");

module.exports = class extends Event {
  async run(messages = new collection(message)) {
    const settings = await Guild.findOne({
      guildID: messages.first().guild.id,
    });

    if (settings.messageBulkDeleteMode === !1) {
      return;
    }

    const length = messages.array().length;
    const channel = messages.first().channel.name;

    const embed = new MessageEmbed()
      .setAuthor(
        `${messages.first().author.tag} (${messages.first().author.id})`,
        messages.first().author.displayAvatarURL()
      )
      .setTitle(`${length} Messages purged in #${channel}`)
      .setDescription(
        messages.map(
          (message) => `**❯** [${message.author.tag}]: ${message.content}`
        )
      )
      .setFooter(`${length} latest shown`)
      .setColor("#dd5f53")
      .setTimestamp();

    const ModeratorChannel = settings.logchannelID;
    if (!ModeratorChannel || ModeratorChannel === null) return;
    (await messages.first().client.channels.fetch(ModeratorChannel)).send(
      embed
    );
    //messages.client.channels.cache.get(ModeratorChannel).send(embed);
  }
};
