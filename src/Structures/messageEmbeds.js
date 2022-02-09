
const { MessageEmbed, version: djsversion } = require("discord.js");
const moment = require("moment")
const { version } = require("./../../package.json");
const ms = require("ms")
const os = require("os")

module.exports.MuteEmbed = function (interaction, member, reason, time) {
    const mute = new MessageEmbed()
        .setColor("YELLOW")
        .addField("Moderation",
            [
                `**❯ Action:** ${interaction.commandName}`,
                `**❯ Member:** ${member.user}`,
                `**❯ Moderator:** ${interaction.member.user.tag} `,
                `**❯ Reason:** ${reason}`,
                `**❯ Time:** ${time}`,
            ].join("\n")
        )
        .setFooter({ text: `Date: ${interaction.createdAt.toLocaleString()}` });
    return mute
}

module.exports.AdminEmbed = function (interaction, member, reason) {
    const Admin = new MessageEmbed()
        .setColor("DARK_RED")
        .addField(
            "Moderation",
            [
                `**❯ Action:** ${interaction.commandName}`,
                `**❯ Member:** ${member.user}`,
                `**❯ Moderator:** ${interaction.member.user.tag} `,
                `**❯ Reason:** ${reason}`,
            ].join("\n")
        )
        .setFooter({ text: `Date: ${interaction.createdAt.toLocaleString()}` });
    return Admin
}
module.exports.UserInfoEmbed = function (interaction, member, role, flag, flags) {
    const UserInfo = new MessageEmbed()
        .setThumbnail(member.user.displayAvatarURL({ dynamic: true, size: 512 }))
        .setColor(member.displayHexColor || "BLUE")
        .addField(
            "User",
            [
                `**❯ Username:** ${member.user.username}`,
                `**❯ Discriminator:** ${member.user.discriminator}`,
                `**❯ ID:** ${member.id}`,
                `**❯ Flags:** ${flag.length ? flag.map((a) => flags[a]).join(", ") : "None"
                }`,
                `**❯ Avatar:** [Link to avatar](${member.user.displayAvatarURL({ dynamic: true })})`,
                `**❯ Time Created:** ${moment(member.user.createdTimestamp).format("LT")} ${moment(member.user.createdTimestamp).format("LL")} ${moment(member.user.createdTimestamp).fromNow()}`,
                `**❯ Status:** ${member.presence?.status}`,
                `**❯ Game / Custom status:** ${member.presence?.activities[0]?.state || "Not playing a game."
                }`,
                `\u200b`,
            ].join("\n")
        )
        .addField(
            "Member",
            [
                `**❯ Highest Role:** ${member.roles.highest.id === interaction.guild.id ? "None" : member.roles.highest.name
                }`,
                `**❯ Server Join Date:** ${moment(member.joinedAt).format("LL LTS")}`,
                `**❯ Hoist Role:** ${member.roles.hoist ? member.roles.hoist.name : "None"}`,
                `**❯ Roles [${role.length}]:** ${10 > role.length ? role.join(", ") : 10 < role.length ? interaction.client.utils.trimArray(role) : "None"
                }`,
                `\u200b`,
            ].join("\n")
        );
    return UserInfo
}
module.exports.SettingEmbed = function (interaction, guild_db) {
    const Setting = new MessageEmbed()
        .setAuthor({ name: `${interaction.guild.name} Settings` })
        .setThumbnail(interaction.guild.iconURL({ dynamic: true }))
        .setDescription(
            [
                `**❯ Prefix:** Slash commands !`,
                `**❯ WelcomeChannelID:**${guild_db.welcomechannelID ? guild_db.welcomechannelID : "No information yet"}`,
                `**❯ ModLogChannelID:** ${guild_db.logchannelID ? guild_db.logchannelID : "No information yet"}`,
                `**❯ ModRoleID:** ${guild_db.moderatorRoleID ? guild_db.moderatorRoleID : "No information yet"} `,
                `**❯ WelcomeMessage:** ${guild_db.PersonalizedWelcomeMessage ? guild_db.PersonalizedWelcomeMessage : "No information yet"}`,
                `**❯ Anti-raid:** ${!!guild_db.antiRaidMode && guild_db.antiRaidMode}`,
                `**❯ MessageDelete** ${!!guild_db.messageDeleteMode && guild_db.messageDeleteMode}`,
                `**❯ messageBulkDelete** ${!!guild_db.messageBulkDeleteMode && guild_db.messageBulkDeleteMode}`,
                `**❯ MessageUpdate:** ${!!guild_db.messageUpdateMode && guild_db.messageUpdateMode}`,
            ].join("\n")
        )
        .setFooter({
            text: `Requested by ${interaction.user.username}`, iconURL: `${interaction.user.displayAvatarURL({ dynamic: true })}`
        });
    return Setting
}
module.exports.ServerInfoEmbed = function (interaction, owner, member, b, d, e, filterLevels, verificationLevels) {
    const ServerInfo = new MessageEmbed()
        .setDescription(`**Guild information for __${interaction.guild.name}__**`)
        .setColor("BLUE")
        .setThumbnail(interaction.guild.iconURL({ dynamic: true }))
        .addField("General",
            [
                `**❯ Name:** ${interaction.guild.name}`,
                `**❯ ID:** ${interaction.guild.id}`,
                `**❯ Owner:** ${owner.user.tag} (${owner.id})`,
                `**❯ Boost Tier:** ${interaction.guild.premiumTier ? `Tier ${interaction.guild.premiumTier}` : "None"}`,
                `**❯ Explicit Filter:** ${filterLevels[interaction.guild.explicitContentFilter]}`,
                `**❯ Verification Level:** ${verificationLevels[interaction.guild.verificationLevel]}`,
                `**❯ Time Created:** ${moment(interaction.guild.createdTimestamp).format("LT")} ${moment(interaction.guild.createdTimestamp).format("LL")} ${moment(interaction.guild.createdTimestamp).fromNow()}`,
                "\u200B",
            ].join("\n")
        )
        .addField("Statistics",
            [
                `**❯ Role Count:** ${b.length}`,
                `**❯ Emoji Count:** ${e.size}`,
                `**❯ Regular Emoji Count:** ${e.filter((a) => !a.animated).size}`,
                `**❯ Animated Emoji Count:** ${e.filter((a) => a.animated).size}`,
                `**❯ Member Count:** ${interaction.guild.memberCount}`,
                `**❯ Humans:** ${member.filter((a) => !a.user.bot).size}`,
                `**❯ Bots:** ${member.filter((a) => a.user.bot).size}`,
                `**❯ Text Channels:** ${d.filter((channel) => "GUILD_TEXT" === channel.type).size}`,
                `**❯ Voice Channels:** ${d.filter((channel) => "GUILD_VOICE" === channel.type).size}`,
                `**❯ Stage Channels:** ${d.filter((channel) => "GUILD_STAGE_VOICE" === channel.type).size}`,
                `**❯ Boost Count:** ${interaction.guild.premiumSubscriptionCount || "0"}`,
                "\u200B",
            ].join("\n")
        )
        .addField("Presence",
            [
                `**❯ Online:** ${member.filter((guildmember) => "online" === guildmember.presence?.status).size}`,
                `**❯ Idle:** ${member.filter((guildmember) => "idle" === guildmember.presence?.status).size}`,
                `**❯ Do Not Disturb:** ${member.filter((guildmember) => "dnd" === guildmember.presence?.status).size}`,
                `**❯ Offline:** ${member.filter((guildmember) => "offline" === guildmember.presence?.status).size}`,
                `**❯ No presence detected:** ${member.filter((guildmember) => null === guildmember.presence).size}`,
                "\u200B",
            ].join("\n")
        )
        .addField(`Roles [${b.length - 1}]`,
            [
                10 > b.length ? b.join(", ") : 10 < b.length ? interaction.client.utils.trimArray(b) : "None",
            ].join("\n")
        )
        .setTimestamp();
    return ServerInfo
}
module.exports.BotInfoEmbed = function (interaction, b) {
    const BotInfo = new MessageEmbed()
        .setThumbnail(interaction.client.user.displayAvatarURL())
        .setColor(interaction.guild.me.displayHexColor || "BLUE")
        .addField("General",
            [
                `**❯ Client:** ${interaction.client.user.tag} (${interaction.client.user.id})`,
                `**❯ Commands:** ${interaction.client.commands.size}`,
                `**❯ Servers:** ${interaction.client.guilds.cache.size.toLocaleString()} `,
                `**❯ Users:** ${interaction.client.guilds.cache.reduce((c, a) => c + a.memberCount, 0).toLocaleString()}`,
                `**❯ Channels:** ${interaction.client.channels.cache.size.toLocaleString()}`,
                `**❯ Creation Date:** ${moment.utc(interaction.client.user.createdTimestamp).format("Do MMMM YYYY HH:mm:ss")}`,
                `**❯ Node.js:** ${process.version}`,
                `**❯ Version:** v${version}`,
                `**❯ Discord.js:** v${djsversion}`,
                "\u200B",
            ].join("\n")
        )
        .addField("System",
            [
                `**❯ Platform:** ${process.platform}`,
                `**❯ Uptime:** ${ms(1e3 * process.uptime(), { long: true })}`,
                `**❯ CPU:**`,
                `\u3000 Cores: ${os.cpus().length}`,
                `\u3000 Model: ${b.model}`,
                `\u3000 Speed: ${b.speed}MHz`,
                `**❯ Memory:**`,
                `\u3000 Total: ${interaction.client.utils.formatBytes(process.memoryUsage().heapTotal)}`,
                `\u3000 Used: ${interaction.client.utils.formatBytes(process.memoryUsage().heapUsed)}`,
            ].join("\n")
        )

        .addField("OpenSource Code", `[Click here](https://github.com/Lilly3252/LillyBot)`, true)
        .setTimestamp();

    return BotInfo
}
module.exports.RestrictEmbed = function (interaction, reason,restriction_name , e) {
    const restrict = new MessageEmbed()
    .setAuthor({ name: `${interaction.user.tag} (${interaction.user.id})`, iconURL: interaction.user.displayAvatarURL() })
    .setColor("DARK_ORANGE")
    .addField("Moderation", [
        `**❯ Action:** ${restriction_name} restriction`, 
        `**❯ Member:** ${e.user.username}`, 
        `**❯ Moderator:** ${interaction.user.tag} `, 
        `**❯ Reason:** ${reason}`].join("\n"))
    .setTimestamp(new Date())
    .setFooter({ text: `${restriction_name} restricted` });
    return restrict
}