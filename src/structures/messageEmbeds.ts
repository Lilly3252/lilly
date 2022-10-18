import * as discordJs from "discord.js";
import * as Package from "./../../package.json" assert {type:"json"} ;
import ms from "ms";
import os from "os";
import process from 'process';
import { ChannelType, GuildExplicitContentFilter, GuildVerificationLevel } from "discord.js";


export function MuteEmbed(
    interaction: discordJs.ChatInputCommandInteraction<"cached">,
    member: discordJs.GuildMember,
    reason: string,
    time: string
): discordJs.EmbedBuilder {
    return new discordJs.EmbedBuilder()
        .setColor(discordJs.Colors["Yellow"])
        .addFields([{
            name: "Moderation", value: [
                `**❯ Action:** Timeout`,
                `**❯ Member:** ${member.user}`,
                `**❯ Moderator:** ${interaction.member.user.tag} `,
                `**❯ Reason:** ${reason}`,
                `**❯ Time:** ${time}`,
            ].join("\n")
        }]
        )
        .setFooter({ text: `Date: ${interaction.createdAt.toLocaleString()}` });
}

export function AdminEmbed(
    interaction: discordJs.ChatInputCommandInteraction<"cached">,
    member: discordJs.GuildMember,
    reason: string
) {
    return new discordJs.EmbedBuilder()
        .setColor(discordJs.Colors["DarkRed"])
        .addFields([{
            name: "Moderation", value:
                [
                    `**❯ Action:** ${interaction.commandName}`,
                    `**❯ Member:** ${member.user}`,
                    `**❯ Moderator:** ${interaction.member.user.tag} `,
                    `**❯ Reason:** ${reason}`,
                ].join("\n")
        }]


        )
        .setFooter({ text: `Date: ${interaction.createdAt.toLocaleString()}` });
}

export function UserInfoEmbed(
    interaction: discordJs.CommandInteraction<"cached">,
    member: discordJs.GuildMember,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    role: any,
    flag: string[],
    flags: { [x: string]: string },
    created: string
) {
    return new discordJs.EmbedBuilder()
        .setThumbnail(member.user.displayAvatarURL({ forceStatic: true, size: 512 }))
        .setColor(member.displayHexColor || discordJs.Colors["Blue"])
        .addFields([{
            name: "User", value:
                [
                    `**❯ Username:** ${member.user.username}`,
                    `**❯ Discriminator:** ${member.user.discriminator}`,
                    `**❯ ID:** ${member.id}`,
                    `**❯ Flags:** ${flag.length
                        ? flag.map((a: string | number) => flags[a]).join(", ")
                        : "None"
                    }`,
                    `**❯ Avatar:** [Link to avatar](${member.user.displayAvatarURL({
                        forceStatic: true,
                    })})`,
                    `**❯ Time Created:** ${created}`,
                    `**❯ Status:** ${member.presence?.status}`,
                    `**❯ Game / Custom status:** ${member.presence?.activities[0]?.state || "Not playing a game."
                    }`,
                    `\u200b`,
                ].join("\n")
        },
        {
            name: "Member", value:
                [
                    `**❯ Highest Role:** ${member.roles.highest.id === interaction.guild.id
                        ? "None"
                        : member.roles.highest.name
                    }`,
                    `**❯ Server Join Date:** ${member.joinedTimestamp}`,
                    `**❯ Hoist Role:** ${member.roles.hoist ? member.roles.hoist.name : "None"
                    }`,
                    `**❯ Roles [${role.length}]:** ${role.length < 10
                        ? role.join(", ")
                        : role.length > 10
                            ? interaction.client.utils.trimArray(role)
                            : "None"
                    }`,
                    `\u200b`,
                ].join("\n")
        }])
}

export function SettingEmbed(
    interaction: discordJs.ChatInputCommandInteraction<"cached">,
    guild_db: {
        welcomeChannelID: string | null;
        logChannelID: string | null;
        moderatorRole: string | null;
        personalizedWelcomeMessage: string | null;
        antiRaidMode: boolean;
        messageDeleteMode: boolean;
        messageBulkDeleteMode: boolean;
        messageUpdateMode: boolean;
    }
) {
    return new discordJs.EmbedBuilder()
        .setAuthor({ name: `${interaction.guild.name} Settings` })
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        .setThumbnail(interaction.guild.iconURL({ forceStatic: true })!)
        .setDescription(
            [
                `**❯ Prefix:** Slash commands !`,
                `**❯ WelcomeChannelID:**${guild_db.welcomeChannelID
                    ? guild_db.welcomeChannelID
                    : "No information yet"
                }`,
                `**❯ ModLogChannelID:** ${guild_db.logChannelID ? guild_db.logChannelID : "No information yet"
                }`,
                `**❯ ModRoleID:** ${guild_db.moderatorRole
                    ? guild_db.moderatorRole
                    : "No information yet"
                } `,
                `**❯ WelcomeMessage:** ${guild_db.personalizedWelcomeMessage
                    ? guild_db.personalizedWelcomeMessage
                    : "No information yet"
                }`,
                `**❯ Anti-raid:** ${!!guild_db.antiRaidMode && guild_db.antiRaidMode}`,
                `**❯ MessageDelete** ${!!guild_db.messageDeleteMode && guild_db.messageDeleteMode
                }`,
                `**❯ messageBulkDelete** ${!!guild_db.messageBulkDeleteMode && guild_db.messageBulkDeleteMode
                }`,
                `**❯ MessageUpdate:** ${!!guild_db.messageUpdateMode && guild_db.messageUpdateMode
                }`,
            ].join("\n")
        )
        .setFooter({
            text: `Requested by ${interaction.user.username}`,
            iconURL: `${interaction.user.displayAvatarURL({ forceStatic: true })}`,
        });
}
export function ServerInfoEmbed(
    interaction: discordJs.ChatInputCommandInteraction<"cached">,
    owner: discordJs.GuildMember,
    member: discordJs.DataManager<string, discordJs.GuildMember, discordJs.GuildMemberResolvable>,
    b: string[],
    d: discordJs.DataManager<string, discordJs.Channel, discordJs.GuildChannelResolvable>,
    e: discordJs.DataManager<string, discordJs.Emoji, discordJs.EmojiResolvable>,
    server_create: string
) {
    return new discordJs.EmbedBuilder()
        .setDescription(`**Guild information for __${interaction.guild.name}__**`)
        .setColor(discordJs.Colors["Blue"])
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        .setThumbnail(interaction.guild.iconURL({ forceStatic: true })!)
        .addFields([{
            name: "General", value: [
                `**❯ Name:** ${interaction.guild.name}`,
                `**❯ ID:** ${interaction.guild.id}`,
                `**❯ Owner:** ${owner.user.tag} (${owner.id})`,
                `**❯ Boost Tier:** ${interaction.guild.premiumTier
                    ? `Tier ${interaction.guild.premiumTier}`
                    : "None"
                }`,
                `**❯ Explicit Filter:** ${GuildExplicitContentFilter[interaction.guild.explicitContentFilter]
                }`,
                `**❯ Verification Level:** ${GuildVerificationLevel[interaction.guild.verificationLevel]
                }`,
                `**❯ Time Created:** ${server_create}`,
                "\u200B",
            ].join("\n")
        },
        {
            name: "statistic", value: [
                `**❯ Role Count:** ${b.length}`,
                `**❯ Emoji Count:** ${e.cache.size}`,
                `**❯ Regular Emoji Count:** ${e.cache.filter((a: discordJs.Emoji) => !a.animated).size
                }`,
                `**❯ Animated Emoji Count:** ${e.cache.filter((a: discordJs.Emoji) => a.animated as true).size
                }`,
                `**❯ Member Count:** ${interaction.guild.memberCount}`,
                `**❯ Humans:** ${member.cache.filter((a: discordJs.GuildMember) => !a.user.bot).size
                }`,
                `**❯ Bots:** ${member.cache.filter((a: discordJs.GuildMember) => a.user.bot).size
                }`,
                `**❯ Text Channels:** ${d.cache.filter((channel: discordJs.Channel) => channel.type === ChannelType.GuildText)
                    .size
                }`,
                `**❯ Voice Channels:** ${d.cache.filter((channel: discordJs.Channel) => channel.type === ChannelType.GuildVoice)
                    .size
                }`,
                `**❯ Stage Channels:** ${d.cache.filter(
                    (channel: discordJs.Channel) => channel.type === ChannelType.GuildStageVoice
                ).size
                }`,
                `**❯ Boost Count:** ${interaction.guild.premiumSubscriptionCount || "0"
                }`,
                "\u200B",
            ].join("\n")
        },
        {
            name: "Presence", value: [
                `**❯ Online:** ${member.cache.filter(
                    (guildmember: discordJs.GuildMember) =>
                        guildmember.presence?.status === "online"
                ).size
                }`,
                `**❯ Idle:** ${member.cache.filter(
                    (guildmember: discordJs.GuildMember) =>
                        guildmember.presence?.status === "idle"
                ).size
                }`,
                `**❯ Do Not Disturb:** ${member.cache.filter(
                    (guildmember: discordJs.GuildMember) => guildmember.presence?.status === "dnd"
                ).size
                }`,
                `**❯ Offline:** ${member.cache.filter(
                    (guildmember: discordJs.GuildMember) =>
                        guildmember.presence?.status === "offline"
                ).size
                }`,
                `**❯ No presence detected:** ${member.cache.filter(
                    (guildmember: discordJs.GuildMember) => guildmember.presence === null
                ).size
                }`,
                "\u200B",
            ].join("\n")
        }, {
            name: `Roles [${b.length - 1}]`, value: [
                b.length < 10
                    ? b.join(", ")
                    : b.length > 10
                        ? interaction.client.utils.trimArray(b)
                        : "None",
            ].join("\n")
        }
        ])
        .setTimestamp();
}
export function BotInfoEmbed(
    interaction: discordJs.ChatInputCommandInteraction<"cached">,
    b: os.CpuInfo,
    bot_create: string
) {
    if (!interaction.client.user) return undefined;
    if (!interaction.guild.members.me) return undefined;
    return new discordJs.EmbedBuilder()
        .setThumbnail(interaction.client.user.displayAvatarURL())
        .setColor(interaction.guild.members.me.displayHexColor || discordJs.Colors["Blue"])
        .addFields([{
            name: "General", value: [
                `**❯ Client:** ${interaction.client.user.tag} (${interaction.client.user.id})`,
                `**❯ Commands:** ${interaction.client.commands.size}`,
                `**❯ Servers:** ${interaction.client.guilds.cache.size.toLocaleString()} `,
                `**❯ Users:** ${interaction.client.guilds.cache
                    .reduce((c, a) => c + a.memberCount, 0)
                    .toLocaleString()}`,
                `**❯ Channels:** ${interaction.client.channels.cache.size.toLocaleString()}`,
                `**❯ Creation Date:** ${bot_create}`,
                `**❯ Node.js:** ${process.version}`,
                `**❯ Version:** v${Package.default.version}`,
                `**❯ Discord.js:** v${Package.default.dependencies["discord.js"]}`,
                "\u200B",
            ].join("\n")
        },
        {
            name: "System", value: [
                `**❯ Platform:** ${process.platform}`,
                `**❯ Uptime:** ${ms(1e3 * process.uptime(), { long: true })}`,
                `**❯ CPU:**`,
                `\u3000 Cores: ${os.cpus().length}`,
                `\u3000 Model: ${b.model}`,
                `\u3000 Speed: ${b.speed}MHz`,
                `**❯ Memory:**`,
                `\u3000 Total: ${interaction.client.utils.formatBytes(
                    process.memoryUsage().heapTotal
                )}`,
                `\u3000 Used: ${interaction.client.utils.formatBytes(
                    process.memoryUsage().heapUsed
                )}`,
            ].join("\n")
        },
        {
            name: "Code", value: `[Click here](https://github.com/Lilly3252/LillyBot)`,
            inline: true
        }

        ])
        .setTimestamp();
}
export function RestrictEmbed(
    interaction: discordJs.ChatInputCommandInteraction<"cached">,
    reason: string,
    restriction_name: string,
    e: discordJs.GuildMember
) {
    return new discordJs.EmbedBuilder()
        .setAuthor({
            name: `${interaction.user.tag} (${interaction.user.id})`,
            iconURL: interaction.user.displayAvatarURL(),
        })
        .setColor(discordJs.Colors["DarkOrange"])
        .addFields([{
            name: "Moderation", value: [
                `**❯ Action:** ${restriction_name} restriction`,
                `**❯ Member:** ${e.user.username}`,
                `**❯ Moderator:** ${interaction.user.tag} `,
                `**❯ Reason:** ${reason}`,
            ].join("\n")
        }]


        )
        .setTimestamp(new Date())
        .setFooter({ text: `${restriction_name} restricted` });

}
export function RoleEmbed(
    interaction: discordJs.ChatInputCommandInteraction<"cached">,
    c: discordJs.Role
) {
    return new discordJs.EmbedBuilder()
        .setTimestamp()
        .setColor(c.color)
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        .setThumbnail(interaction.guild.iconURL({ forceStatic: true })!)
        .setDescription(`**Role information**`)
        .addFields([{
            name: "Role", value: [
                `**❯ Name:** ${c.name}`,
                `**❯ Role ID:** ${c.id}`,
                `**❯ Color:** ${c.color}`,
                `**❯ Hoisted:** ${c.hoist}`,
                `**❯ Mentionable:** ${c.mentionable}`,
            ].join("\n")
        }]


        );
}
export function ChannelEmbed(
    interaction: discordJs.CommandInteraction<"cached">,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    chanCreateTime: any,
    channel: discordJs.TextChannel,
) {
    const ChanEmbeds = new discordJs.EmbedBuilder()
        .setTitle(`${interaction.guild.name}'s Channel Info`)
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        .setThumbnail(interaction.guild.iconURL({ forceStatic: true })!)
        .addFields([{
            name: `❯ Name: `, value:
                `${interaction.client.utils.toTitleCase(channel.name)}, (${channel.id})`,
            inline: true
        },
        { name: `❯ Created At:`, value: `${chanCreateTime}`, inline: true }
        ])
    if (channel.isTextBased()) {
        ChanEmbeds.addFields([{
            name: "Information", value: [
                `**❯ NSFW:** ${channel.nsfw ? channel.nsfw : "False"}`,
                `**❯ Slowmode:** ${channel.rateLimitPerUser
                    ? channel.rateLimitPerUser + " Seconds"
                    : "None"
                }`,
                `**❯ Private Channel:** ${channel.permissionsFor(interaction.guild.id)?.has(discordJs.PermissionsBitField.Flags.ViewChannel)
                    ? "False"
                    : "True"
                }`,
            ].join("\n")
        },
        { name: `❯ Topic:`, value: ` ${channel.topic ? channel.topic : "no topic"}`, inline: true }])
    }

    ChanEmbeds.addFields([{
        name: `❯ Type:`, value: ` ${ChannelType
            ? ChannelType[channel.type]
            : "Cannot provide this information."}`, inline: true
    }]);
    return ChanEmbeds;
}