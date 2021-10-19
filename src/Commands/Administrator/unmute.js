const { SlashCommandBuilder } = require("@discordjs/builders"),
  { MessageEmbed } = require("discord.js"),
  Guild = require("../../Database/models/Guild"),
  MuteSchema = require("../../Database/models/MuteSchema");
const { Permissions } = require("discord.js");
const SYSTEM = require("./../../Structures/messageSystem.json");
//! needs to be checked//
module.exports = {
  data: new SlashCommandBuilder()
    .setName("unmute")
    .setDescription("unmute a member.")
    .addMentionableOption((option) => option.setName("member").setDescription("Mention someone")),
  async run(interaction, b) {
    if (!interaction.member.permissions.has(Permissions.FLAGS.MUTE_MEMBERS)) {
      return interaction.reply(SYSTEM.ERROR.PERMISSIONS.MEMBER_PERM["MUTE_MEMBERS"]);
    }
    if (!interaction.guild.me.permissions.has(Permissions.FLAGS.MUTE_MEMBERS)) {
      return interaction.reply(SYSTEM.ERROR.PERMISSIONS.BOT_PERM["MUTE_MEMBERS"]);
    }
    const c = await Guild.findOne({ guildID: interaction.guild.id });
    let member = a.mentions.members.first() || a.guild.members.cache.get(b[0]);
    if (!member) return interaction.reply("Please mention a user to be unmuted!");
    let e = b.slice(1).join(" ");
    e || (e = "No reason given");
    await MuteSchema.findOne({ user_id: member, guild_id: interaction.guild.id }, async (b, f) => {
      b && console.error(b), f && (await f.deleteOne({ user_id: member, guild_id: interaction.guild.id })), f || interaction.reply("This member is not muted");
      let g = new MessageEmbed()
          .setTitle("Congratulation!")
          .setColor("GREEN")
          .addField("Moderation", [`**❯ Action:** Unmute`, `**❯ Member:** ${member.user.username}`, `**❯ Moderator:** ${a.author.tag} `, `**❯ Reason:** ${e}`].join("\n"))
          .setFooter(`Date: ${a.createdAt.toLocaleString()}`),
        h = a.guild.roles.cache.find((a) => "Muted" === a.name);
      if (!h)
        try {
          (h = await a.guild.roles.create({
            data: { name: "Muted", color: "#514f48", permissions: [] }
          })),
            a.guild.channels.forEach(async (a) => {
              await a.permissionOverwrites.edit(h, {
                SEND_MESSAGES: !1,
                ADD_REACTIONS: !1,
                SEND_TTS_MESSAGES: !1,
                ATTACH_FILES: !1,
                SPEAK: !1
              });
            });
        } catch (a) {
          console.log(a.stack);
        }
      if (!member.roles.cache.has(h.id)) return interaction.reply("This member has no mute role.");
      member.roles.remove(h.id).then(() => {
        member.send(`Hello, you have been unmuted in ${a.guild.name}. Congratulation!`).catch((a) => console.log(a)), interaction.reply(`${member.user.username} was successfully unmuted.`);
      });
      const i = c.logchannelID;
      i && null !== i && a.client.channels.cache.get(i).send({ embeds: [g] });
    });
  }
};
