const Event = require("../../Structures/Event"),
  { Message, MessageEmbed } = require("discord.js"),
  diff = require("diff"),
  { Util } = require("discord.js"),
  Guild = require("../../Database/models/Guild");
module.exports = class extends Event {
  async run(message, b) {
    if (null === message.author || null === b.author) return;
    if (null === message || null === b) return;
    if (null === message.content || null === b.content) return;
    if (message.content.includes("https:")) return;
    if (!message.guild || !b.guild || message.author.bot || b.author.bot)
      return;
    const c = await Guild.findOne({ guildID: message.guild.id });
    if (false === c.messageUpdateMode) return;
    const d = new EmbedBuilder()
      .setAuthor({name:
        `${b.author.tag} (${b.author.id})`,
        iconURL: b.author.displayAvatarURL()}
      )
      .addField("\u276F Channel", [b.channel].join("\n"));
    let e = "";
    if (
      /```(.*?)```/s.test(message.content) &&
      /```(.*?)```/s.test(b.content)
    ) {
      const c = /```(?:(\S+)\n)?\s*([^]+?)\s*```/.exec(message.content);
      if (!c || !c[2]) return;
      const f = /```(?:(\S+)\n)?\s*([^]+?)\s*```/.exec(message.content);
      if (!f || !f[2]) return;
      if (c[2] === f[2]) return;
      const g = diff.diffLines(c[2], f[2], { newlineIsToken: true });
      for (const a of g) {
        if ("\n" === a.value) continue;
        const b = a.added ? "+ " : a.removed ? "- " : "";
        e += `${b}${a.value.replace(/\n/g, "")}\n`;
      }
      d.addField(
        "\u276F Modified Message",
        [`${"```diff\n"}${e.substring(0, 1e3)}${"\n```"}`].join("\n")
      );
    } else {
      const c = diff.diffWords(
        Util.escapeMarkdown(message.content),
        Util.escapeMarkdown(b.content)
      );
      for (const a of c) {
        const b = a.added ? "**" : a.removed ? "~~" : "";
        e += `${b}${a.value}${b}`;
      }
      d.addField(
        "\u276F Modified Message",
        [`${e.substring(0, 1020)}` || "\u200B"].join("\n")
      );
    }
    d.addField("Link!!", `[Click here to see the message](${b.url})`, true)
      .setTimestamp(message.editedAt || message.editedAt || new Date())
      .setFooter({text:"Edited"});
    const f = c.logchannelID;
    message.client.channels.cache.get(f).send({ embeds: [d] });
  }
};
