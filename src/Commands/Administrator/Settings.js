const Command = require("../../Structures/Command"),
  { MessageEmbed } = require("discord.js"),
  Guild = require("../../Database/models/Guild");
module.exports = class extends Command {
  constructor(...a) {
    super(...a, {
      aliases: ["settings"],
      description: "This command is for setting up your guild.",
      category: "\uD83D\uDD14Administrator",
      usage:
        "+<ShowSettings>|<Anti-Raid>|<WelcomeChannel>|<ModLog>|<ModRole>|<Prefix>|<DeleteMessages>|<messageDeleteBulk>|<MessageUpdates>|<WelcomeMessage>",
      userPerms: ["ADMINISTRATOR"],
      options: [
          {
            type: undefined,
            name: undefined,
            description: undefined,
            required: false,
            choices: undefined,
            options: undefined
          }
        ]
    });
  }
  async run(message, args) {
    const guild_db = await Guild.findOne({ guildID: message.guild.id });
    switch (
      (b[0] ||
        message.channel.send(
          "You need to tell me at least 1 argument \n <ShowSettings>|<Anti-Raid>|<WelcomeChannel>|<ModLog>|<ModRole>|<Prefix>|<DeleteMessages>|<messageDeleteBulk>|<MessageUpdates>|<WelcomeMessage>"
        ),
      b[0])
    ) {
      case "ShowSettings":
        const d = new MessageEmbed()
          .setAuthor(`${a.guild.name} Settings`)
          .setThumbnail(a.guild.iconURL({ dynamic: !0 }))
          .setDescription([
            `**❯ Prefix:** ${c.prefix}`,
            `**❯ WelcomeChannelID:**${
              c.welcomechannelID ? c.welcomechannelID : "Not defined yet"
            }`,
            `**❯ ModLogChannelID:** ${
              c.logchannelID ? c.logchannelID : "Not defined yet"
            }`,
            `**❯ ModRoleID:** ${
              c.moderatorRoleID ? c.moderatorRoleID : "Not defined yet"
            } `,
            `**❯ WelcomeMessage:**${
              c.PersonalizedWelcomeMessage
                ? c.PersonalizedWelcomeMessage
                : "Not defined yet"
            }`,
            `**❯ Anti-raid:** ${!!c.antiRaidMode && c.antiRaidMode}`,
            `**❯ MessageDelete** ${
              !!c.messageDeleteMode && c.messageDeleteMode
            }`,
            `**❯ messageBulkDelete** ${
              !!c.messageBulkDeleteMode && c.messageBulkDeleteMode
            }`,
            `**❯ MessageUpdate:** ${
              !!c.messageUpdateMode && c.messageUpdateMode
            }`,
          ])
          .setFooter(
            `Requested by ${a.author.username}`,
            a.author.displayAvatarURL({ dynamic: !0 })
          );
        a.channel.send(d);
        break;
      case "Anti-Raid":
        "on" === b[1] &&
          (await c.updateOne({ antiRaidMode: !0 }),
          a.channel.send("\u2705 AntiRaid Mode enable.")),
          "off" === b[1] &&
            (await c.updateOne({ antiRaidMode: !1 }),
            a.channel.send("\u274C AntiRaid Mode disable."));
        break;
      case "MessageUpdates":
        "true" === b[1] &&
          (await c.updateOne({ messageUpdateMode: !0 }),
          a.channel.send("\u2705 MessageUpdate has been enable.")),
          "false" === b[1] &&
            (await c.updateOne({ messageUpdateMode: !1 }),
            a.channel.send("\u274C MessageUpdate has been disable."));
        break;
      case "MessageDeletes":
        "true" === b[1] &&
          (await c.updateOne({ messageDeleteMode: !0 }),
          a.channel.send("\u2705 MessageDelete has been enable.")),
          "false" === b[1] &&
            (await c.updateOne({ messageDeleteMode: !1 }),
            a.channel.send("\u274C MessageDelete has been disable."));
        break;
      case "messageBulkDelete":
        "true" === b[1] &&
          (await c.updateOne({ messageBulkDeleteMode: !0 }),
          a.channel.send("\u2705 messageDeleteBulk has been enable.")),
          "false" === b[1] &&
            (await c.updateOne({ messageBulkDeleteMode: !1 }),
            a.channel.send("\u274C MessageDeleteBulk has been disable."));
        break;
      case "WelcomeChannel":
        const e = b[1];
        isNaN(e) &&
          "false" === b[1] &&
          (await c.updateOne({ welcomechannelID: null })),
          isNaN(e) && "false" !== b[1]
            ? a.channel
                .send(
                  "\u274C You need to give me a channelID to set this setting."
                )
                .then((a) => a.delete({ timeout: 1e4 }))
            : await c
                .updateOne({ welcomechannelID: e })
                .then(() =>
                  a.channel.send(`✅ Welcome Channel has been set to ${e}`)
                );
        break;
      case "ModLog":
        const f = b[1];
        isNaN(f) &&
          "false" === b[1] &&
          (await c.updateOne({ logchannelID: null })),
          isNaN(f) && "false" !== b[1]
            ? a.channel
                .send(
                  "\u274C You need to give me a channelID to set this setting."
                )
                .then((a) => a.delete({ timeout: 1e4 }))
            : await c
                .updateOne({ logchannelID: f })
                .then(() =>
                  a.channel.send(`✅ ModLog Channel has been set to ${f}`)
                );
        break;
      case "Prefix":
        const g = b[1];
        if (1 > g.length)
          return a.channel
            .send(
              `❌ You must specify a prefix to set for this server! Your current server prefix is \`${c.prefix}\``
            )
            .then((a) => a.delete({ timeout: 1e4 }));
        await c.updateOne({ prefix: g }),
          a.channel.send(`✅ Your new prefix has been set to ${g}`);
        break;
      case "ModRole":
        const h = b[1];
        isNaN(h) && "false" === b[1]
          ? await c.updateOne({ moderatorRoleID: null })
          : (await c.updateOne({ moderatorRoleID: h }),
            a.channel.send(`✅ ModRole has been set to ${h}`));
        break;
      case "WelcomeMessage":
        const i = b.slice(1).join(` `);
        isNaN(i) && "false" === b[1]
          ? await c.updateOne({ PersonalizedWelcomeMessage: null })
          : (await c.updateOne({ PersonalizedWelcomeMessage: i }),
            a.channel.send(`✅ Welcome Message has been set to ${i}`));
    }
  }
};
