const Command = require("../../Structures/Command"),
  { MessageEmbed } = require("discord.js"),
  Guild = require("../../Database/models/Guild");
module.exports = class extends Command {
  constructor(...a) {
    super(...a, {
      aliases: ["kick"],
      description: "kick a member.",
      category: "\uD83D\uDD14Administrator",
      usage: `<member> [reason]`,
      userPerms: ["ADMINISTRATOR"],
      botPerms: ["ADMINISTRATOR"],
    });
  }
  async run(a, b) {
    const c = await Guild.findOne({ guildID: a.guild.id }); // find the guild
    let d = a.mentions.members.first() || a.guild.members.cache.get(b[0]); // mentioning member or id
    if (!d) return a.channel.send("Please mention a member to be kick!"); // if no member found
    let u = a.mentions.users.first() || a.guild.users.cache.get(b[0]); // mentioning user or id
    let e = b.slice(1).join(" "); // reason
    e || (e = "No reason given");

    let f = new MessageEmbed()
      .setTitle("Sayonara!")
      .setColor("ORANGE")
      .addField("Moderation", [
        `**❯ Action:** Kick`,
        `**❯ Member:** ${d.user.username}`,
        `**❯ Moderator:** ${a.author.tag} `,
        `**❯ Reason:** ${e}`,
      ])
      .setFooter(`Date: ${a.createdAt.toLocaleString()}`);

    if (u) {
      a.guild.members.fetch(u.id)
        const member = a.guild.members.resolve(u);
        if (member) {
          member
            .kick()
              .catch((a) => console.log(a));
              a.channel.send(`**${u.tag}** has been successfully kicked`)
        }
    } else { 
      d
        .send(`Hello, you have been kicked from ${a.guild.name} for: ${e}.\n `) // sending a DM message to the MEMBER is found... NOT BOT... -_- 
        .then(() => d.kick()) // member.kick
        .catch((a) => console.log(a)),
        a.channel.send(`**${d.user.tag}** has been kicked`); // message sending if successfully kick
      const g = c.logchannelID; // finding the channel ID through db
      g && null !== g && a.client.channels.cache.get(g).send(f); // send it to the channel if id found
    }
  }
};
