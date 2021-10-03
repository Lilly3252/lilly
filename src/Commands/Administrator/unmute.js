const Command = require("../../Structures/Command"),
  { MessageEmbed } = require("discord.js"),
  Guild = require("../../Database/models/Guild"),
  MuteSchema = require("../../Database/models/MuteSchema");
module.exports = class extends Command {
  constructor(...a) {
    super(...a, {
      
      description: "unmute a member.",
      category: "\uD83D\uDD14Administrator",
      usage: `<MentionMember>`,
      userPerms: ["ADMINISTRATOR"],
      botPerms: ["MANAGE_ROLES", "MUTE_MEMBERS"],
      options: [
        {
          type: "USER",
          name: 'member',
          description: 'member to unmute.',
          required: true
        }
      ]
    });
  }
  async run(a, b) {
    const c = await Guild.findOne({ guildID: a.guild.id });
    let d = a.mentions.members.first() || a.guild.members.cache.get(b[0]);
    if (!d) return interaction.reply("Please mention a user to be unmuted!");
    let e = b.slice(1).join(" ");
    e || (e = "No reason given");
    await MuteSchema.findOne(
      { user_id: d, guild_id: a.guild.id },
      async (b, f) => {
        b && console.error(b),
          f && (await f.deleteOne({ user_id: d, guild_id: a.guild.id })),
          f || interaction.reply("This member is not muted");
        let g = new MessageEmbed()
            .setTitle("Congratulation!")
            .setColor("GREEN")
            .addField("Moderation", [
              `**❯ Action:** Unmute`,
              `**❯ Member:** ${d.user.username}`,
              `**❯ Moderator:** ${a.author.tag} `,
              `**❯ Reason:** ${e}`,
            ].join("\n"))
            .setFooter(`Date: ${a.createdAt.toLocaleString()}`),
          h = a.guild.roles.cache.find((a) => "Muted" === a.name);
        if (!h)
          try {
            (h = await a.guild.roles.create({
              data: { name: "Muted", color: "#514f48", permissions: [] },
            })),
              a.guild.channels.forEach(async (a) => {
                await a.updateOverwrite(h, {
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
        if (!d.roles.cache.has(h.id))
          return interaction.reply("This member has no mute role.");
        d.roles.remove(h.id).then(() => {
          d
            .send(
              `Hello, you have been unmuted in ${a.guild.name}. Congratulation!`
            )
            .catch((a) => console.log(a)),
            interaction.reply(`${d.user.username} was successfully unmuted.`);
        });
        const i = c.logchannelID;
        i && null !== i && a.client.channels.cache.get(i).send(g);
      }
    );
  }
};
