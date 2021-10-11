const { SlashCommandBuilder } = require("@discordjs/builders"),
	{ MessageEmbed } = require("discord.js"),
	Guild = require("../../Database/models/Guild");
const SYSTEM = require("./../../Structures/messageSystem.json");
const { Permissions } = require("discord.js");
module.exports = {
	data: new SlashCommandBuilder()
		.setName("settings")
		.setDescription("show or add settings")
		.addSubcommand((subcommand) => subcommand.setName("showsettings").setDescription("Show settings you have"))
		.addSubcommand((subcommand) => subcommand.setName("anti-raid").setDescription("set anti-raid ON or OFF"))
		.addSubcommand((subcommand) => subcommand.setName("welcomechannel").setDescription("set the welcome channel"))
		.addSubcommand((subcommand) => subcommand.setName("modlog").setDescription("set the Mod Log channel"))
		.addSubcommand((subcommand) => subcommand.setName("modrole").setDescription("set the Mod Role channel"))
		.addSubcommand((subcommand) => subcommand.setName("deletemessages").setDescription("set the DeleteMessages event ON or OFF"))
		.addSubcommand((subcommand) => subcommand.setName("messagedeletebulk").setDescription("set the messageDeleteBulk event ON or OFF"))
		.addSubcommand((subcommand) => subcommand.setName("messageupdates").setDescription("set the MessageUpdates event ON or OFF"))
		.addSubcommand((subcommand) => subcommand.setName("welcomemessage").setDescription("set the WelcomeMessage for your guild")),

	async run(interaction) {
		if (!interaction.member.permissions.has(Permissions.FLAGS.ADMINISTRATOR)) {
			return interaction.reply(SYSTEM.ERROR.PERMISSIONS.MEMBER_PERM["ADMINISTRATOR"]);
		}
		if (!interaction.guild.me.permissions.has(Permissions.FLAGS.ADMINISTRATOR)) {
			return interaction.reply(SYSTEM.ERROR.PERMISSIONS.BOT_PERM["ADMINISTRATOR"]);
		}

		const guild_db = await Guild.findOne({ guildID: interaction.guild.id });
		if (interaction.options.getSubcommand() === "showsettings") {
			const d = new MessageEmbed()
				.setAuthor(`${interaction.guild.name} Settings`)
				.setThumbnail(interaction.guild.iconURL({ dynamic: !0 }))
				.setDescription(
					[
						`**❯ Prefix:** ${guild_db.prefix}`,
						`**❯ WelcomeChannelID:**${
							guild_db.welcomechannelID ? guild_db.welcomechannelID : "Not defined yet"
						}`,
						`**❯ ModLogChannelID:** ${guild_db.logchannelID ? guild_db.logchannelID : "Not defined yet"}`,
						`**❯ ModRoleID:** ${guild_db.moderatorRoleID ? guild_db.moderatorRoleID : "Not defined yet"} `,
						`**❯ WelcomeMessage:**${
							guild_db.PersonalizedWelcomeMessage
								? guild_db.PersonalizedWelcomeMessage
								: "Not defined yet"
						}`,
						`**❯ Anti-raid:** ${!!guild_db.antiRaidMode && guild_db.antiRaidMode}`,
						`**❯ MessageDelete** ${!!guild_db.messageDeleteMode && guild_db.messageDeleteMode}`,
						`**❯ messageBulkDelete** ${!!guild_db.messageBulkDeleteMode && guild_db.messageBulkDeleteMode}`,
						`**❯ MessageUpdate:** ${!!guild_db.messageUpdateMode && guild_db.messageUpdateMode}`
					].join("\n")
				)
				.setFooter(
					`Requested by ${interaction.user.username}`,
					interaction.user.displayAvatarURL({ dynamic: !0 })
				);
			interaction.reply({ embeds: [d] });
		}
		//** NOTE : THIS NEEDS TO BE CONTINUED*/
		/*
        break;
      case "Anti-Raid":
        "on" === b[1] &&
          (await c.updateOne({ antiRaidMode: !0 }),
          interaction.reply("\u2705 AntiRaid Mode enable.")),
          "off" === b[1] &&
            (await c.updateOne({ antiRaidMode: !1 }),
            interaction.reply("\u274C AntiRaid Mode disable."));
        break;
      case "MessageUpdates":
        "true" === b[1] &&
          (await c.updateOne({ messageUpdateMode: !0 }),
          interaction.reply("\u2705 MessageUpdate has been enable.")),
          "false" === b[1] &&
            (await c.updateOne({ messageUpdateMode: !1 }),
            interaction.reply("\u274C MessageUpdate has been disable."));
        break;
      case "MessageDeletes":
        "true" === b[1] &&
          (await c.updateOne({ messageDeleteMode: !0 }),
          interaction.reply("\u2705 MessageDelete has been enable.")),
          "false" === b[1] &&
            (await c.updateOne({ messageDeleteMode: !1 }),
            interaction.reply("\u274C MessageDelete has been disable."));
        break;
      case "messageBulkDelete":
        "true" === b[1] &&
          (await c.updateOne({ messageBulkDeleteMode: !0 }),
          interaction.reply("\u2705 messageDeleteBulk has been enable.")),
          "false" === b[1] &&
            (await c.updateOne({ messageBulkDeleteMode: !1 }),
            interaction.reply("\u274C MessageDeleteBulk has been disable."));
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
                  interaction.reply(`✅ Welcome Channel has been set to ${e}`)
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
                  interaction.reply(`✅ ModLog Channel has been set to ${f}`)
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
          interaction.reply(`✅ Your new prefix has been set to ${g}`);
        break;
      case "ModRole":
        const h = b[1];
        isNaN(h) && "false" === b[1]
          ? await c.updateOne({ moderatorRoleID: null })
          : (await c.updateOne({ moderatorRoleID: h }),
            interaction.reply(`✅ ModRole has been set to ${h}`));
        break;
      case "WelcomeMessage":
        const i = b.slice(1).join(` `);
        isNaN(i) && "false" === b[1]
          ? await c.updateOne({ PersonalizedWelcomeMessage: null })
          : (await c.updateOne({ PersonalizedWelcomeMessage: i }),
            interaction.reply(`✅ Welcome Message has been set to ${i}`));
               }
              */
	}
};
