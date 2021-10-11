const { SlashCommandBuilder } = require('@discordjs/builders'),
  { MessageEmbed } = require("discord.js"),
  Guild = require("../../Database/models/Guild"),
  mongoose = require("mongoose"),
  MuteSchema = require("../../Database/models/MuteSchema"),
  ms = require("ms");
  const { Permissions } = require("discord.js");
const SYSTEM = require("./../../Structures/messageSystem.json");
  module.exports = {
    data : new SlashCommandBuilder()
            .setName('mute')
            .setDescription('mute a member.')
            .addMentionableOption(option => option.setName('member').setDescription('Mention a member'))
    ,
  async run(interaction, b) {
    if (!interaction.member.permissions.has(Permissions.FLAGS.MUTE_MEMBERS)) {
      return interaction.reply(
        SYSTEM.ERROR.PERMISSIONS.MEMBER_PERM["MUTE_MEMBERS"]
      );
    }
    if(!interaction.guild.me.permission.has(Permissions.FLAGS.MUTE_MEMBERS)){
      return interaction.reply(SYSTEM.ERROR.PERMISSIONS.BOT_PERM["MUTE_MEMBERS"])
    }
    const c = await Guild.findOne({ guildID: interaction.guild.id });
    let d = a.mentions.members.first() || a.guild.members.cache.get(b[0]),
      e = b[1],
      f = b.slice(2).join(" ") || "No reason given.";
    await MuteSchema.findOne(
      { user_id: d, guild_id: interaction.guild.id },
      async (b, g) => {
        if ((b && console.error(b), g))
          return interaction.reply(
            "This member is already muted,you cannot mute this member twice"
          );
        if (!g) {
          const b = new MuteSchema({
            _id: mongoose.Types.ObjectId(),
            user_id: d,
            guild_id: interaction.guild.id,
            reason: f,
            time: e,
          });
          if (!d) return interaction.reply("Please mention a user to be muted!");
          let c = a.guild.roles.cache.find((a) => "Muted" === a.name);
          if (!c)
            try {
              (c = await a.guild.roles.create({
                data: { name: "Muted", color: "#514f48", permissions: [] },
              })),
                a.guild.channels.cache.forEach(async (a) => {
                  await a.updateOverwrite(c, {
                    SEND_MESSAGES: !1,
                    ADD_REACTIONS: !1,
                    SEND_TTS_MESSAGES: !1,
                    ATTACH_FILES: !1,
                    SPEAK: !1,
                  });
                });
            } catch (a) {
              console.log(a.stack);
            }
          d.roles.add(c.id).then(() => {
            d
              .send(`Hello, you have been muted in ${a.guild.name} for: ${f}`)
              .catch((a) => console.log(a)),
              interaction.reply(`${d.user.username} was successfully muted.`);
          }); if (!e) {return} else{
            setTimeout(async function () {
              await d.roles
                .remove(c.id, `Temporary mute expired.`)
                .then(b.deleteOne({ user_id: d, guild_id: interaction.guild.id }));
            }, ms(e));
          }
            b
              .save()
              .then((a) => console.log(a))
              .catch((a) => console.error(a));
        }
        let h = new MessageEmbed()
          .setTitle("SShhhh")
          .setColor("YELLOW")
          .addField("Moderation", [
            `**❯ Action:** Mute`,
            `**❯ Member:** ${d.user}`,
            `**❯ Moderator:** ${a.author.tag} `,
            `**❯ Reason:** ${f}`,
            `**❯ Time:** ${e}`,
          ].join("\n"))
          .setFooter(`Date: ${a.createdAt.toLocaleString()}`);
        const i = c.logchannelID;
        i && null !== i && a.client.channels.cache.get(i).send({ embeds: [h] });
      }
    );
  }
};
