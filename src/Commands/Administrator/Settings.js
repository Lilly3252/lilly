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
    .addSubcommand((subcommand) =>
      subcommand
        .setName("anti-raid")
        .setDescription("set anti-raid ON or OFF")
        .addBooleanOption((option) => option.setName("choice").setDescription("Select a boolean"))
    )
    .addSubcommand((subcommand) =>
      subcommand
        .setName("welcomechannel")
        .setDescription("set the welcome channel")
        .addStringOption((option) => option.setName("id").setDescription("Enter a ID"))
    )
    .addSubcommand((subcommand) =>
      subcommand
        .setName("modlog")
        .setDescription("set the Mod Log channel")
        .addStringOption((option) => option.setName("id").setDescription("Enter a ID"))
    )
    .addSubcommand((subcommand) =>
      subcommand
        .setName("modrole")
        .setDescription("set the Mod Role channel")
        .addStringOption((option) => option.setName("id").setDescription("Enter a ID"))
    )
    .addSubcommand((subcommand) =>
      subcommand
        .setName("messagedelete")
        .setDescription("set the DeleteMessages event ON or OFF")
        .addBooleanOption((option) => option.setName("choice").setDescription("Select a boolean"))
    )
    .addSubcommand((subcommand) =>
      subcommand
        .setName("messagedeletebulk")
        .setDescription("set the messageDeleteBulk event ON or OFF")
        .addBooleanOption((option) => option.setName("choice").setDescription("Select a boolean"))
    )
    .addSubcommand((subcommand) =>
      subcommand
        .setName("messageupdates")
        .setDescription("set the MessageUpdates event ON or OFF")
        .addBooleanOption((option) => option.setName("choice").setDescription("Select a boolean"))
    )
    .addSubcommand((subcommand) =>
      subcommand
        .setName("welcomemessage")
        .setDescription("set the WelcomeMessage for your guild")
        .addStringOption((option) => option.setName("message").setDescription("Enter a message"))
    ),
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
            `**❯ Prefix:** Slash commands !`,
            `**❯ WelcomeChannelID:**${guild_db.welcomechannelID ? guild_db.welcomechannelID : "Not defined yet"}`,
            `**❯ ModLogChannelID:** ${guild_db.logchannelID ? guild_db.logchannelID : "Not defined yet"}`,
            `**❯ ModRoleID:** ${guild_db.moderatorRoleID ? guild_db.moderatorRoleID : "Not defined yet"} `,
            `**❯ WelcomeMessage:**${guild_db.PersonalizedWelcomeMessage ? guild_db.PersonalizedWelcomeMessage : "Not defined yet"}`,
            `**❯ Anti-raid:** ${!!guild_db.antiRaidMode && guild_db.antiRaidMode}`,
            `**❯ MessageDelete** ${!!guild_db.messageDeleteMode && guild_db.messageDeleteMode}`,
            `**❯ messageBulkDelete** ${!!guild_db.messageBulkDeleteMode && guild_db.messageBulkDeleteMode}`,
            `**❯ MessageUpdate:** ${!!guild_db.messageUpdateMode && guild_db.messageUpdateMode}`
          ].join("\n")
        )
        .setFooter(`Requested by ${interaction.user.username}`, interaction.user.displayAvatarURL({ dynamic: !0 }));
      interaction.reply({ embeds: [d] });
    }
    //**SUB COMMANDS */
    if (interaction.options.getSubcommand() === "anti-raid") {
      const choices = interaction.options.getBoolean("choice");
      true === choices && (await guild_db.updateOne({ antiRaidMode: !0 }), interaction.reply("\u2705 AntiRaid Mode enable.")), false === choices && (await guild_db.updateOne({ antiRaidMode: !1 }), interaction.reply("\u274C AntiRaid Mode disable."));
    }
    // MessageUpdate event
    if (interaction.options.getSubcommand() === "messageupdates") {
      const choices = interaction.options.getBoolean("choice");
      true === choices && (await guild_db.updateOne({ messageUpdateMode: !0 }), interaction.reply("\u2705 MessageUpdate has been enable.")), false === choices && (await guild_db.updateOne({ messageUpdateMode: !1 }), interaction.reply("\u274C MessageUpdate has been disable."));
    }
    //MessageDelete Event
    if (interaction.options.getSubcommand() === "messagedelete") {
      const choices = interaction.options.getBoolean("choice");
      true === choices && (await guild_db.updateOne({ messageDeleteMode: !0 }), interaction.reply("\u2705 MessageDelete has been enable.")), false === choices && (await guild_db.updateOne({ messageDeleteMode: !1 }), interaction.reply("\u274C MessageDelete has been disable."));
    }
    //MessageDeleteBulk Event
    if (interaction.options.getSubcommand() === "messagedeletebulk") {
      const choices = interaction.options.getBoolean("choice");
      true === choices && (await guild_db.updateOne({ messageBulkDeleteMode: !0 }), interaction.reply("\u2705 messageDeleteBulk has been enable.")), false === choices && (await guild_db.updateOne({ messageBulkDeleteMode: !1 }), interaction.reply("\u274C MessageDeleteBulk has been disable."));
    }
    //WelcomeChannel Setup
    if (interaction.options.getSubcommand() === "welcomechannel") {
      const e = interaction.options.getString("id");
      isNaN(e) && "false" === e ? await guild_db.updateOne({ welcomechannelID: null }) : (await guild_db.updateOne({ welcomechannelID: e }), interaction.reply(`✅ Welcome Channel has been set to ${e}`));
    }
    //ModLog channelID setup
    if (interaction.options.getSubcommand() === "modlog") {
      const f = interaction.options.getString("id");
      isNaN(f) && "false" === i && (await guild_db.updateOne({ logchannelID: null })),
        isNaN(f) && "false" !== i ? interaction.reply("\u274C You need to give me a channelID to set this setting.") : await guild_db.updateOne({ logchannelID: f }).then(() => interaction.reply(`✅ ModLog Channel has been set to ${f}`));
    }
    //ModRole ID Setup
    if (interaction.options.getSubcommand() === "modrole") {
      const h = interaction.options.getString("id");
      isNaN(h) && "false" === h ? await guild_db.updateOne({ moderatorRoleID: null }) : (await guild_db.updateOne({ moderatorRoleID: h }), interaction.reply(`✅ ModRole has been set to ${h}`));
    }
    // WelcomeMessage Setup
    //**Need to be tested */
    if (interaction.options.getSubcommand() === "welcomemessage") {
      const i = interaction.options.getString("input").slice(1).join(` `);
      isNaN(i) && "false" === i ? await guild_db.updateOne({ PersonalizedWelcomeMessage: null }) : (await guild_db.updateOne({ PersonalizedWelcomeMessage: i }), interaction.reply(`✅ Welcome Message has been set to ${i}`));
    }
  }
};
