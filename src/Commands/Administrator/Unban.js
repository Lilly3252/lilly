const { SlashCommandBuilder } = require("@discordjs/builders");
const { Permissions } = require("discord.js");
const SYSTEM = require("./../../Structures/messageSystem.json");
//! needs to be checked//
module.exports = {
  data: new SlashCommandBuilder()
    .setName("unban")
    .setDescription("unban a member.")
    .addStringOption((option) => option.setName("id").setDescription("put a id").setRequired(true)),
  async run(interaction, b) {
    if (!interaction.member.permissions.has(Permissions.FLAGS.BAN_MEMBERS)) {
      return interaction.reply(SYSTEM.ERROR.PERMISSIONS.MEMBER_PERM["BAN_MEMBERS"]);
    }
    if (!interaction.guild.me.permissions.has(Permissions.FLAGS.BAN_MEMBERS)) {
      return interaction.reply(SYSTEM.ERROR.PERMISSIONS.BOT_PERM["BAN_MEMBERS"]);
    }
    let c = b[0];
    if (!b[0]) return interaction.reply("Please give me a userID!");
    if (isNaN(b[0])) return interaction.reply("That ID is not a number !");
    let d = b.slice(1).join(" ");
    d || (d = "No reason given"),
      a.guild.fetchBans().then(async (b) => {
        if (0 == b.size) return interaction.reply("No one can be unban because there is no user ban in this guild!");
        let e = b.find((a) => a.user.id == c);
        return e ? void (await a.guild.members.unban(e.user, d).catch((a) => console.log(a)), interaction.reply(`**${e.user}** has been unban`)) : interaction.reply("this user is not banned");
      });
  }
};
