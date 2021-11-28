const { SlashCommandBuilder } = require("@discordjs/builders");
const { Permissions } = require("discord.js");
const SYSTEM = require("./../../Structures/messageSystem.json");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("unban")
    .setDescription("unban a member.")
    .addStringOption((option) => option.setName("id").setDescription("put a id").setRequired(true))
    .addStringOption((option) => option.setName("reason").setDescription("reason to unban").setRequired(true)),
  async run(interaction) {
    if (!interaction.member.permissions.has(Permissions.FLAGS.BAN_MEMBERS)) {
      return interaction.reply(SYSTEM.ERROR.PERMISSIONS.MEMBER_PERM["BAN_MEMBERS"]);
    }
    if (!interaction.guild.me.permissions.has(Permissions.FLAGS.BAN_MEMBERS)) {
      return interaction.reply(SYSTEM.ERROR.PERMISSIONS.BOT_PERM["BAN_MEMBERS"]);
    }
    let banned_person = interaction.options.getString("id");
    if (isNaN(banned_person)) return interaction.reply("That ID is not a number !");
    let d = interaction.options.getString("reason");
      interaction.guild.bans.fetch().then(async (b) => {
        console.log(b)
        if (b.size == 0) return interaction.reply("No one can be unban because there is no user ban in this guild!");
        
        let e = b.find((a) => a.user.id == banned_person);
        return e ? void (await interaction.guild.members.unban(e.user, d).catch((a) => console.log(a)), interaction.reply(`**${e.user}** has been unban`)) : interaction.reply("this user is not banned");
      });
  }
};
