const Command = require("../../Structures/Command"),
  { MessageEmbed } = require("discord.js"),
  Guild = require("../../Database/models/Guild");
module.exports = class extends Command {
  constructor(...a) {
    super(...a, {
      description: "Ban a member.",
      category: "\uD83D\uDD14Administrator",
      usage: `<member> [reason]`,
      userPerms: ["ADMINISTRATOR"],
      botPerms: ["ADMINISTRATOR"],
      options: [
          {
            type: "USER",
            name: 'member',
            description: 'member to ban.',
            required: true
          }
        ]
    });
  }
  async run(a, b) {
    const c = await Guild.findOne({ guildID: a.guild.id }),
      d = a.mentions.members.first() || a.guild.members.cache.get(b[0]);
    if (!d) return interaction.reply("Please mention a user to be banned!");
    let e;
    (e = b.slice(1).join(" ")), e || (e = "No reason given");
    let f = new MessageEmbed()
      .setTitle("Ban Hammer Used!")
      .setColor("RED")
      .addField("Moderation", [
        `**❯ Action:** Ban`,
        `**❯ Member:** ${d.user.username}`,
        `**❯ Moderator:** ${a.author.tag} `,
        `**❯ Reason:** ${e}`,
      ].join("\n"))
      .setFooter(`Date: ${a.createdAt.toLocaleString()}`);
    Buser.send(`Hello, you have been banned from ${a.guild.name} for: ${e}`)
      .then(() => a.guild.ban(d))
      .catch((a) => console.log(a)),
      interaction.reply(`**${d.user.tag}** has been banned`);
    const g = c.logchannelID;
    g && null !== g && a.client.channels.cache.get(g).send(f);
  }
};
