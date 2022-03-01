const Event = require("../../Structures/Event");
const Guild = require("../../Database/models/Guild");
const { MessageEmbed } = require("discord.js");


module.exports = class extends Event {
  async run(message) {

    if (!message.guild || message.author.bot) return;
    //await message.fetch(); console.log(message)
    const b = await Guild.findOne({ guildID: message.guild.id });
    const d = b.moderatorRoleID;
    const e = b.logchannelID;
    // * mentions(ping) & moderator role
    const c = { ignoreEveryone: true };

    //const mRegex = /<@!?(\d+?)>/g;
    //const m = message.content.match(mRegex);

    //if (!m?.length) { return }
    //if (m?.length > 8) {
    //message.channel.send("ok shut the fuck up...");
    //}

    const modMentionEmbed = new MessageEmbed()
      .setTitle("Moderator Mentioned")
      .setThumbnail(message.guild.iconURL({ dynamic: true }))
      .setDescription([
        `**Person who mentioned**: ${message.member}`,
        `**Channel**: ${message.channel}`,
        `**Content**: ${message.content}`,
      ].join("\n"))
      .addField("\u200B", `[Click here to see the message](${message.url})`)

    if (
      message.mentions.has(d, c) &&
      (message.client.channels.cache.get(e).send({ embeds: [modMentionEmbed] }),
        !e && !d)
    )
      return;


  }
};
