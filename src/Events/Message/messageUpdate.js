const Event = require("../../Structures/Event"),
  { Message, MessageEmbed } = require("discord.js"),
  diff = require("diff"),
  { Util } = require("discord.js"),
  Guild = require("../../Database/models/Guild");
module.exports = class extends Event {
  async run(a, b) {
    if (null === a.author || null === b.author) return;
    if (null === a || null === b) return;
    if (null === a.content || null === b.content) return;
    if (a.content.includes("https:")) return;
    if (!a.guild || !b.guild || a.author.bot || b.author.bot) return;
    const c = await Guild.findOne({ guildID: a.guild.id });
    if (!1 === c.messageUpdateMode) return;
    const d = new MessageEmbed()
      .setAuthor(
        `${b.author.tag} (${b.author.id})`,
        b.author.displayAvatarURL()
      )
      .addField("\u276F Channel", b.channel);
    let e = "";
    if (/```(.*?)```/s.test(a.content) && /```(.*?)```/s.test(b.content)) {
      const c = /```(?:(\S+)\n)?\s*([^]+?)\s*```/.exec(a.content);
      if (!c || !c[2]) return;
      const f = /```(?:(\S+)\n)?\s*([^]+?)\s*```/.exec(b.content);
      if (!f || !f[2]) return;
      if (c[2] === f[2]) return;
      const g = diff.diffLines(c[2], f[2], { newlineIsToken: !0 });
      for (const a of g) {
        if ("\n" === a.value) continue;
        const b = a.added ? "+ " : a.removed ? "- " : "";
        e += `${b}${a.value.replace(/\n/g, "")}\n`;
      }
      d.addField(
        "\u276F Modified Message",
        `${"```diff\n"}${e.substring(0, 1e3)}${"\n```"}`
      );
    } else {
      const c = diff.diffWords(
        Util.escapeMarkdown(a.content),
        Util.escapeMarkdown(b.content)
      );
      for (const a of c) {
        const b = a.added ? "**" : a.removed ? "~~" : "";
        e += `${b}${a.value}${b}`;
      }
      d.addField(
        "\u276F Modified Message",
        `${e.substring(0, 1020)}` || "\u200B"
      );
    }
    d.addField("Link!!", `[Click here to see the message](${b.url})`, !0)
      .setTimestamp(a.editedAt || b.editedAt || new Date())
      .setFooter("Edited");
    const f = c.logchannelID;
    a.client.channels.cache.get(f).send(d);
  }
};
