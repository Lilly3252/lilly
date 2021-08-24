const Command = require("../../Structures/Command"),
  Guild = require("../../Database/models/Guild"),
  { MessageEmbed } = require("discord.js");
module.exports = class extends Command {
  constructor(...a) {
    super(...a, {
      aliases: ["restrict"],
      category: "\uD83D\uDD14Administrator",
      description: "Adds a restrict role to a Guild Member",
      usage: "<restriction> + <GuildMember> + [reason]",
      userPerms: ["ADMINISTRATOR"],
      botPerm: ["ADMINISTRATOR"],
    });
  }
  async run(a, b) {
    const c = await Guild.findOne({ guildID: a.guild.id }),
      d = b[0],
      e = a.mentions.members.first() || a.guild.members.cache.get(b[1]),
      f = b.slice(2).join(" ") || "No reason given.";
    let g = new MessageEmbed()
      .setAuthor(
        `${a.author.tag} (${a.author.id})`,
        a.author.displayAvatarURL()
      )
      .setTitle("Restricted!")
      .setColor("DARK_ORANGE")
      .addField("Moderation", [
        `**❯ Action:** ${d} restriction`,
        `**❯ Member:** ${e.user.username}`,
        `**❯ Moderator:** ${a.author.tag} `,
        `**❯ Reason:** ${f}`,
      ])
      .setTimestamp(new Date())
      .setFooter(`${d} restricted`);
    switch (d) {
      case "embed":
        let b = a.guild.roles.cache.find((a) => "Embed Restriction" === a.name);
        if (!b)
          try {
            (b = await a.guild.roles.create({
              data: { name: "Embed Restriction", color: "#514f48" },
            })),
              a.guild.channels.cache.forEach(async (a) => {
                await a.updateOverwrite(b, {
                  EMBED_LINKS: !1,
                  ATTACH_FILES: !1,
                });
              });
          } catch (a) {
            console.log(a.stack);
          }
        e.roles.add(b).then(() => {
          e
            .send(
              `Hello, you have been restricted in ${a.guild.name} for: ${f}`
            )
            .catch((a) => console.log(a)),
            a.channel.send(`${e.user.username} was successfully restricted.`);
        });
        break;
      case "reaction":
        let c = a.guild.roles.cache.find(
          (a) => "Reaction Restriction" === a.name
        );
        if (!c)
          try {
            (c = await a.guild.roles.create({
              data: { name: "Reaction Restriction", color: "#514f48" },
            })),
              a.guild.channels.cache.forEach(async (a) => {
                await a.updateOverwrite(c, { ADD_REACTIONS: !1 });
              });
          } catch (a) {
            console.log(a.stack);
          }
        e.roles.add(c).then(() => {
          e
            .send(
              `Hello, you have been restricted in ${a.guild.name} for: ${f}`
            )
            .catch((a) => console.log(a)),
            a.channel.send(`${e.user.username} was successfully restricted.`);
        });
        break;
      case "voice":
        let g = a.guild.roles.cache.find((a) => "Voice Restriction" === a.name);
        if (!g)
          try {
            (g = await a.guild.roles.create({
              data: { name: "Voice Restriction", color: "#514f48" },
            })),
              a.guild.channels.cache.forEach(async (a) => {
                await a.updateOverwrite(g, {
                  STREAM: !1,
                  CONNECT: !1,
                  SPEAK: !1,
                  USE_VAD: !1,
                });
              });
          } catch (a) {
            console.log(a.stack);
          }
        e.roles.add(g).then(() => {
          e
            .send(
              `Hello, you have been restricted in ${a.guild.name} for: ${f}`
            )
            .catch((a) => console.log(a)),
            a.channel.send(`${e.user.username} was successfully restricted.`);
        });
        const { channel: h } = a.member.voice;
        if (!e) return a.reply("Well ... Okay? but who??");
        if (!h) return a.reply("That user/bot isn't in a voice channel.");
        e.voice.setChannel(null);
    }
    const h = c.logchannelID;
    h && null !== h && a.client.channels.cache.get(h).send(g);
  }
};
