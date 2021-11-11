const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed } = require("discord.js");
const { Permissions } = require("discord.js");
const SYSTEM = require("./../../Structures/messageSystem.json");
const Guild = require("../../Database/models/Guild");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("ban")
    .setDescription("Ban a member.")
    .addUserOption((option) => option.setName("target").setDescription("Select a user").setRequired(true))
    .addStringOption((option) => option.setName("reason").setDescription("reason to kick").setRequired(true)),
  //! needs to be verified /
  async run(interaction) {
    if (!interaction.member.permissions.has(Permissions.FLAGS.BAN_MEMBERS)) {
      return interaction.reply(SYSTEM.ERROR.PERMISSIONS.MEMBER_PERM["BAN_MEMBERS"]);
    }
    if (!interaction.guild.me.permissions.has(Permissions.FLAGS.BAN_MEMBERS)) {
      return interaction.reply(SYSTEM.ERROR.PERMISSIONS.BOT_PERM["BAN_MEMBERS"]);
    }
    const c = await Guild.findOne({ guildID: interaction.guild.id }),
      member = interaction.options.getMember("target");

    const e = interaction.options.getString("reason");
    let f = new MessageEmbed()
      .setTitle("Ban Hammer Used!")
      .setColor("RED")
      .addField("Moderation", [`**❯ Action:** Ban`, `**❯ Member:** ${member.user.username}`, `**❯ Moderator:** ${a.author.tag} `, `**❯ Reason:** ${e}`].join("\n"))
      .setFooter(`Date: ${interaction.createdAt.toLocaleString()}`);
    member
      .send(`Hello, you have been banned from ${interaction.guild.name} for: ${e}`)
      .then(() => interaction.guild.ban(member))
      .catch((a) => console.log(a)),
      interaction.reply(`**${member.user.tag}** has been banned`);
    const g = c.logchannelID;
    g && null !== g && interaction.client.channels.cache.get(g).send({ embeds: [f] });
  }
};
