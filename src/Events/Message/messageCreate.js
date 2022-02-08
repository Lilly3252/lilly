const Event = require("../../Structures/Event");
const Guild = require("../../Database/models/Guild");
const { MessageEmbed } = require("discord.js");


module.exports = class extends Event {
  async run(message) {
    if (!message.guild || message.author.bot) return;
    const b = await Guild.findOne({ guildID: message.guild.id });
    const d = b.moderatorRoleID;
    const e = b.logchannelID;
    // * mentions(ping) & moderator role
    const c = { ignoreEveryone: true };
    const mRegex = /<@!?(\d+?)>/g;
    const m = message.content.match(mRegex);

   /* const bannedEmbed = new MessageEmbed()
      .setTitle("Auto-mod spam-ping detection")
      .setColor('DARK_RED')
      .addField(
        "Moderation",
        [
          `**❯ Action:** Ban`,
          `**❯ Member:** ${member.user.username}`,
          `**❯ Moderator:** ${interaction.user.tag} `,
          `**❯ Reason:** Spam Detection`,
        ].join("\n")
      )
      .setFooter({ text: `Date: ${interaction.createdAt.toLocaleString()}` });

    if (!m?.length) { return }
    if (m?.length > 8) {
      message.member.ban({ days: 1, reason: "Spam Detection" }).then(() => message.client.channels.cache.get(e).send({ embeds: [bannedEmbed] }));
    }
*/
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
