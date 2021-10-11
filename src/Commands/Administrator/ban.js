const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed } = require("discord.js");
const { Permissions } = require("discord.js");
const SYSTEM = require("./../../Structures/messageSystem.json");
const Guild = require("../../Database/models/Guild");


module.exports = {
  data: new SlashCommandBuilder()
    .setName("ban")
    .setDescription("Ban a member.")
    .addStringOption((option) =>
      option.setName("member").setDescription("member to ban")
    )
    .addMentionableOption((option) =>
      option.setName("mentionable").setDescription("Mention someone")
    ),

  async run(interaction, b) {
    if (!interaction.member.permission.has(Permissions.FLAGS.BAN_MEMBERS)) {
      return interaction.reply(SYSTEM.ERROR.PERMISSIONS.MEMBER_PERM["BAN_MEMBERS"]);
    }
    if(!interaction.guild.me.permission.has(Permissions.FLAGS.BAN_MEMBERS)){
      return interaction.reply(SYSTEM.ERROR.PERMISSIONS.BOT_PERM["BAN_MEMBERS"])
    }
    const c = await Guild.findOne({ guildID: interaction.guild.id }),
      d = a.mentions.members.first() || a.guild.members.cache.get(b[0]);
    if (!d) return interaction.reply("Please mention a user to be banned!");
    let e;
    (e = b.slice(1).join(" ")), e || (e = "No reason given");
    let f = new MessageEmbed()
      .setTitle("Ban Hammer Used!")
      .setColor("RED")
      .addField(
        "Moderation",
        [
          `**❯ Action:** Ban`,
          `**❯ Member:** ${d.user.username}`,
          `**❯ Moderator:** ${a.author.tag} `,
          `**❯ Reason:** ${e}`,
        ].join("\n")
      )
      .setFooter(`Date: ${a.createdAt.toLocaleString()}`);
    Buser.send(`Hello, you have been banned from ${a.guild.name} for: ${e}`)
      .then(() => a.guild.ban(d))
      .catch((a) => console.log(a)),
      interaction.reply(`**${d.user.tag}** has been banned`);
    const g = c.logchannelID;
    g && null !== g && a.client.channels.cache.get(g).send({ embeds: [f] });
  },
};
