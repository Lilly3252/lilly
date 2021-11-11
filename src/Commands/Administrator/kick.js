const { SlashCommandBuilder } = require("@discordjs/builders"),
  { MessageEmbed } = require("discord.js"),
  Guild = require("../../Database/models/Guild");
const { Permissions } = require("discord.js");
const SYSTEM = require("./../../Structures/messageSystem.json");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("kick")
    .setDescription("kick a member.")
    .addUserOption((option) => option.setName("target").setDescription("Select a user").setRequired(true))
    .addStringOption((option) => option.setName("reason").setDescription("reason to kick").setRequired(true)),

    //! needs to be verified /
  async run(interaction) {
    if (!interaction.member.permissions.has(Permissions.FLAGS.KICK_MEMBERS)) {
      return interaction.reply(SYSTEM.ERROR.PERMISSIONS.MEMBER_PERM["KICK_MEMBERS"]);
    }
    if (!interaction.guild.me.permissions.has(Permissions.FLAGS.KICK_MEMBERS)) {
      return interaction.reply(SYSTEM.ERROR.PERMISSIONS.BOT_PERM["KICK_MEMBERS"]);
    }
    const c = await Guild.findOne({ guildID: interaction.guild.id }); // find the guild
    let member = interaction.options.getMember("target"); // get the target in interaction

    let e = interaction.options.getString("reason"); // reason

    let f = new MessageEmbed()
      .setTitle("Sayonara!")
      .setColor("ORANGE")
      .addField("Moderation", [`**❯ Action:** Kick`, `**❯ Member:** ${member.user.username}`, `**❯ Moderator:** ${a.author.tag} `, `**❯ Reason:** ${e}`].join("\n"))
      .setFooter(`Date: ${interaction.createdAt.toLocaleString()}`);

    member
      .send(`Hello, you have been kicked from ${interaction.guild.name} for: ${e}.\n `) // sending a DM message to the MEMBER is found... NOT BOT... -_-
      .then(() => member.kick()) // member.kick
      .catch((a) => console.log(a)),
      interaction.reply(`**${member.user.tag}** has been kicked`); // message sending if successfully kick
    const g = c.logchannelID; // finding the channel ID through db
    g && null !== g && interaction.client.channels.cache.get(g).send({ embeds: [f] }); // send it to the channel if id found
  }
};
