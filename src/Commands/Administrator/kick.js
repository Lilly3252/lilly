const { SlashCommandBuilder } = require('@discordjs/builders'),
  { MessageEmbed } = require("discord.js"),
  Guild = require("../../Database/models/Guild");
  const { Permissions } = require("discord.js");
const SYSTEM = require("./../../Structures/messageSystem.json");
  module.exports = {
    data : new SlashCommandBuilder()
            .setName('kick')
            .setDescription('kick a member.')
            .addStringOption(option => option.setName('member').setDescription('member to ban'))
            .addMentionableOption(option => option.setName('mentionable').setDescription('Mention someone'))
    ,
  async run(interaction, b) {
    if (!interaction.member.permissions.has(Permissions.FLAGS.KICK_MEMBERS)) {
      return interaction.reply(
        SYSTEM.ERROR.PERMISSIONS.MEMBER_PERM["KICK_MEMBERS"]
      );
    }
    if(!interaction.guild.me.permission.has(Permissions.FLAGS.KICK_MEMBERS)){
      return interaction.reply(SYSTEM.ERROR.PERMISSIONS.BOT_PERM["KICK_MEMBERS"])
    }
    const c = await Guild.findOne({ guildID: interaction.guild.id }); // find the guild
    let d = a.mentions.members.first() || a.guild.members.cache.get(b[0]); // mentioning member or id
    if (!d) return interaction.reply("Please mention a member to be kick!"); // if no member found
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
      ].join("\n"))
      .setFooter(`Date: ${a.createdAt.toLocaleString()}`);

    if (u) {
      a.guild.members.fetch(u.id)
        const member = a.guild.members.resolve(u);
        if (member) {
          member
            .kick()
              .catch((a) => console.log(a));
              interaction.reply(`**${u.tag}** has been successfully kicked`)
        }
    } else { 
      d
        .send(`Hello, you have been kicked from ${a.guild.name} for: ${e}.\n `) // sending a DM message to the MEMBER is found... NOT BOT... -_- 
        .then(() => d.kick()) // member.kick
        .catch((a) => console.log(a)),
        interaction.reply(`**${d.user.tag}** has been kicked`); // message sending if successfully kick
      const g = c.logchannelID; // finding the channel ID through db
      g && null !== g && a.client.channels.cache.get(g).send({ embeds: [f] }); // send it to the channel if id found
    }
  }
};
