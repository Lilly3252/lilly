const { SlashCommandBuilder } = require("@discordjs/builders"),
  { MessageEmbed } = require("discord.js"),
  Guild = require("../../Database/models/Guild"),
  mongoose = require("mongoose"),
  MuteSchema = require("../../Database/models/MuteSchema"),
  ms = require("ms");
const { Permissions } = require("discord.js");
const SYSTEM = require("./../../Structures/messageSystem.json");
module.exports = {
  data: new SlashCommandBuilder()
    .setName("mute")
    .setDescription("mute a member.")
    .addUserOption((option) => option.setName("target").setDescription("Select a user").setRequired(true))
    .addStringOption((option) => option.setName("reason").setDescription("reason to mute").setRequired(true))
    .addStringOption((option) => option.setName("time").setDescription("time to mute")),
  //! needs to be checked//

  async run(interaction) {
    if (!interaction.member.permissions.has(Permissions.FLAGS.MUTE_MEMBERS)) {
      return interaction.reply(SYSTEM.ERROR.PERMISSIONS.MEMBER_PERM["MUTE_MEMBERS"]);
    }
    if (!interaction.guild.me.permissions.has(Permissions.FLAGS.MUTE_MEMBERS)) {
      return interaction.reply(SYSTEM.ERROR.PERMISSIONS.BOT_PERM["MUTE_MEMBERS"]);
    }

    let member = interaction.options.getMember("target");
    (time = interaction.options.getString("time")), (reason = interaction.options.getString("reason"));

    await MuteSchema.findOne({ user_id: member, guild_id: interaction.guild.id }, async (b, g) => {
      if ((b && console.error(b), g)) return interaction.reply("This member is already muted,you cannot mute this member twice");
      if (!g) {
        const b = new MuteSchema({
          _id: mongoose.Types.ObjectId(),
          user_id: member,
          guild_id: interaction.guild.id,
          reason: reason,
          time: time
        });
        let c = a.guild.roles.cache.find((a) => "Muted" === a.name);
        if (!c)
          try {
            (c = await a.guild.roles.create({
              data: { name: "Muted", color: "#514f48", permissions: [] }
            })),
              a.guild.channels.cache.forEach(async (a) => {
                await a.permissionOverwrites.edit(c, {
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
        member.roles.add(c.id).then(() => {
          member.send(`Hello, you have been muted in ${interaction.guild.name} for: ${reason}`).catch((a) => console.log(a)), interaction.reply(`${member.user.username} was successfully muted.`);
        });
        if (!time) {
          return;
        } else {
          setTimeout(async function () {
            await member.roles.remove(c.id, `Temporary mute expired.`).then(b.deleteOne({ user_id: member, guild_id: interaction.guild.id }));
          }, ms(time));
        }
        b.save()
          .then((a) => console.log(a))
          .catch((a) => console.error(a));
      }
      let h = new MessageEmbed()
        .setTitle("SShhhh")
        .setColor("YELLOW")
        .addField("Moderation", [`**❯ Action:** Mute`, `**❯ Member:** ${member.user}`, `**❯ Moderator:** ${a.author.tag} `, `**❯ Reason:** ${reason}`, `**❯ Time:** ${time}`].join("\n"))
        .setFooter(`Date: ${a.createdAt.toLocaleString()}`);
      const i = c.logchannelID;
      i && null !== i && interaction.client.channels.cache.get(i).send({ embeds: [h] });
    });
  }
};
