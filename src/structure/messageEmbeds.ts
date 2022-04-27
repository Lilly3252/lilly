
import * as discordJs from "discord.js";
import type * as enums from "discord.js/typings/enums";
import * as Package from "./../../package.json";
import ms from "ms";
import os from "os";


export function MuteEmbed(
  interaction: discordJs.CommandInteraction<"cached">,
  member: discordJs.GuildMember,
  reason: string,
  time: string
) {
  return new discordJs.MessageEmbed()
    .setColor("YELLOW")
    .addField(
      "Moderation",
      [
        `**❯ Action:** Timeout`,
        `**❯ Member:** ${member.user}`,
        `**❯ Moderator:** ${interaction.member.user.tag} `,
        `**❯ Reason:** ${reason}`,
        `**❯ Time:** ${time}`,
      ].join("\n")
    )
    .setFooter({ text: `Date: ${interaction.createdAt.toLocaleString()}` });
}

 export function AdminEmbed(
  interaction: discordJs.CommandInteraction<"cached">,
  member: discordJs.GuildMember,
  reason: string
) {
  return new discordJs.MessageEmbed()
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
};

export function UserInfoEmbed (
  interaction: discordJs.CommandInteraction<"cached">,
  member: discordJs.GuildMember,
  role: any,
  flag: string[],
  flags: { [x: string]: string },
  created: string
) {
  return new discordJs.MessageEmbed()
    .setThumbnail(member.user.displayAvatarURL({ dynamic: true, size: 512 }))
    .setColor(member.displayHexColor || "BLUE")
    .addField(
      "User",
      [
        `**❯ Username:** ${member.user.username}`,
        `**❯ Discriminator:** ${member.user.discriminator}`,
        `**❯ ID:** ${member.id}`,
        `**❯ Flags:** ${
          flag.length
            ? flag.map((a: string | number) => flags[a]).join(", ")
            : "None"
        }`,
        `**❯ Avatar:** [Link to avatar](${member.user.displayAvatarURL({
          dynamic: true,
        })})`,
        `**❯ Time Created:** ${created}`,
        `**❯ Status:** ${member.presence?.status}`,
        `**❯ Game / Custom status:** ${
          member.presence?.activities[0]?.state || "Not playing a game."
        }`,
        `\u200b`,
      ].join("\n")
    )
    .addField(
      "Member",
      [
        `**❯ Highest Role:** ${
          member.roles.highest.id === interaction.guild.id
            ? "None"
            : member.roles.highest.name
        }`,
        `**❯ Server Join Date:** ${member.joinedTimestamp}`,
        `**❯ Hoist Role:** ${
          member.roles.hoist ? member.roles.hoist.name : "None"
        }`,
        `**❯ Roles [${role.length}]:** ${
          10 > role.length
            ? role.join(", ")
            : 10 < role.length
            ? interaction.client.utils.trimArray(role)
            : "None"
        }`,
        `\u200b`,
      ].join("\n")
    );
};
export function SettingEmbed(
  interaction: discordJs.CommandInteraction<"cached">,
  guild_db: {
    welcomechannelID: string;
    logchannelID: string;
    moderatorRoleID: string;
    PersonalizedWelcomeMessage: string;
    antiRaidMode: boolean;
    messageDeleteMode: boolean;
    messageBulkDeleteMode: boolean;
    messageUpdateMode: boolean;
  }
) {
  return new discordJs.MessageEmbed()
    .setAuthor({ name: `${interaction.guild.name} Settings` })
    .setThumbnail(interaction.guild.iconURL({ dynamic: true })!)
    .setDescription(
      [
        `**❯ Prefix:** Slash commands !`,
        `**❯ WelcomeChannelID:**${
          guild_db.welcomechannelID
            ? guild_db.welcomechannelID
            : "No information yet"
        }`,
        `**❯ ModLogChannelID:** ${
          guild_db.logchannelID ? guild_db.logchannelID : "No information yet"
        }`,
        `**❯ ModRoleID:** ${
          guild_db.moderatorRoleID
            ? guild_db.moderatorRoleID
            : "No information yet"
        } `,
        `**❯ WelcomeMessage:** ${
          guild_db.PersonalizedWelcomeMessage
            ? guild_db.PersonalizedWelcomeMessage
            : "No information yet"
        }`,
        `**❯ Anti-raid:** ${!!guild_db.antiRaidMode && guild_db.antiRaidMode}`,
        `**❯ MessageDelete** ${
          !!guild_db.messageDeleteMode && guild_db.messageDeleteMode
        }`,
        `**❯ messageBulkDelete** ${
          !!guild_db.messageBulkDeleteMode && guild_db.messageBulkDeleteMode
        }`,
        `**❯ MessageUpdate:** ${
          !!guild_db.messageUpdateMode && guild_db.messageUpdateMode
        }`,
      ].join("\n")
    )
    .setFooter({
      text: `Requested by ${interaction.user.username}`,
      iconURL: `${interaction.user.displayAvatarURL({ dynamic: true })}`,
    });
};
export function ServerInfoEmbed (
  interaction: discordJs.CommandInteraction<"cached">,
  owner: discordJs.GuildMember,
  member: discordJs.DataManager<string, discordJs.GuildMember, discordJs.GuildMemberResolvable>,
  b: discordJs.Role[],
  d: discordJs.DataManager<string, discordJs.Channel, discordJs.GuildResolvable>,
  e: discordJs.DataManager<string, discordJs.Emoji, discordJs.EmojiResolvable>,
  filterLevels: discordJs.ExplicitContentFilterLevel,
  verificationLevels: discordJs.VerificationLevel,
  server_create: string
) {
  return new discordJs.MessageEmbed()
    .setDescription(`**Guild information for __${interaction.guild.name}__**`)
    .setColor("BLUE")
    .setThumbnail(interaction.guild.iconURL({ dynamic: true })!)
    .addField(
      "General",
      [
        `**❯ Name:** ${interaction.guild.name}`,
        `**❯ ID:** ${interaction.guild.id}`,
        `**❯ Owner:** ${owner.user.tag} (${owner.id})`,
        `**❯ Boost Tier:** ${
          interaction.guild.premiumTier
            ? `Tier ${interaction.guild.premiumTier}`
            : "None"
        }`,
        `**❯ Explicit Filter:** ${
          filterLevels[interaction.guild.explicitContentFilter as any]
        }`,
        `**❯ Verification Level:** ${
          verificationLevels[interaction.guild.verificationLevel as any]
        }`,
        `**❯ Time Created:** ${server_create}`,
        "\u200B",
      ].join("\n")
    )
    .addField(
      "Statistics",
      [
        `**❯ Role Count:** ${b.length}`,
        `**❯ Emoji Count:** ${e.cache.size}`,
        `**❯ Regular Emoji Count:** ${
          e.cache.filter((a: discordJs.Emoji) => !a.animated).size
        }`,
        `**❯ Animated Emoji Count:** ${
          e.cache.filter((a: discordJs.Emoji) => a.animated as true).size
        }`,
        `**❯ Member Count:** ${interaction.guild.memberCount}`,
        `**❯ Humans:** ${
          member.cache.filter((a: discordJs.GuildMember) => !a.user.bot).size
        }`,
        `**❯ Bots:** ${
          member.cache.filter((a: discordJs.GuildMember) => a.user.bot).size
        }`,
        `**❯ Text Channels:** ${
          d.cache.filter((channel: discordJs.Channel) => channel.type === "GUILD_TEXT")
            .size
        }`,
        `**❯ Voice Channels:** ${
          d.cache.filter((channel: discordJs.Channel) => channel.type === "GUILD_VOICE")
            .size
        }`,
        `**❯ Stage Channels:** ${
          d.cache.filter(
            (channel: discordJs.Channel) => channel.type === "GUILD_STAGE_VOICE"
          ).size
        }`,
        `**❯ Boost Count:** ${
          interaction.guild.premiumSubscriptionCount || "0"
        }`,
        "\u200B",
      ].join("\n")
    )
    .addField(
      "Presence",
      [
        `**❯ Online:** ${
          member.cache.filter(
            (guildmember: discordJs.GuildMember) =>
              "online" === guildmember.presence?.status
          ).size
        }`,
        `**❯ Idle:** ${
          member.cache.filter(
            (guildmember: discordJs.GuildMember) =>
              "idle" === guildmember.presence?.status
          ).size
        }`,
        `**❯ Do Not Disturb:** ${
          member.cache.filter(
            (guildmember: discordJs.GuildMember) => "dnd" === guildmember.presence?.status
          ).size
        }`,
        `**❯ Offline:** ${
          member.cache.filter(
            (guildmember: discordJs.GuildMember) =>
              "offline" === guildmember.presence?.status
          ).size
        }`,
        `**❯ No presence detected:** ${
          member.cache.filter(
            (guildmember: discordJs.GuildMember) => null === guildmember.presence
          ).size
        }`,
        "\u200B",
      ].join("\n")
    )
    .addField(
      `Roles [${b.length - 1}]`,
      [
        10 > b.length
          ? b.join(", ")
          : 10 < b.length
          ? interaction.client.utils.trimArray(b)
          : "None",
      ].join("\n")
    )
    .setTimestamp();
};
export function BotInfoEmbed(
  interaction: discordJs.CommandInteraction<"cached">,
  b: { model: any; speed: any },
  bot_create: any
) {
  if (!interaction.client.user) return;
  if (!interaction.guild.me) return;
 return new discordJs.MessageEmbed()
    .setThumbnail(interaction.client.user.displayAvatarURL())
    .setColor(interaction.guild.me.displayHexColor || "BLUE")
    .addField(
      "General",
      [
        `**❯ Client:** ${interaction.client.user.tag} (${interaction.client.user.id})`,
        `**❯ Commands:** ${interaction.client.stores.size}`,
        `**❯ Servers:** ${interaction.client.guilds.cache.size.toLocaleString()} `,
        `**❯ Users:** ${interaction.client.guilds.cache
          .reduce((c, a) => c + a.memberCount, 0)
          .toLocaleString()}`,
        `**❯ Channels:** ${interaction.client.channels.cache.size.toLocaleString()}`,
        `**❯ Creation Date:** ${bot_create}`,
        `**❯ Node.js:** ${process.version}`,
        `**❯ Version:** v${Package.version}`,
        `**❯ Discord.js:** v${Package.dependencies["discord.js"]}`,
        "\u200B",
      ].join("\n")
    )
    .addField(
      "System",
      [
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
    )

    .addField(
      "OpenSource Code",
      `[Click here](https://github.com/Lilly3252/LillyBot)`,
      true
    )
    .setTimestamp();
};
export function RestrictEmbed(
  interaction: discordJs.CommandInteraction<"cached">,
  reason: string,
  restriction_name: string,
  e: discordJs.GuildMember
) {
  return new discordJs.MessageEmbed()
    .setAuthor({
      name: `${interaction.user.tag} (${interaction.user.id})`,
      iconURL: interaction.user.displayAvatarURL(),
    })
    .setColor("DARK_ORANGE")
    .addField(
      "Moderation",
      [
        `**❯ Action:** ${restriction_name} restriction`,
        `**❯ Member:** ${e.user.username}`,
        `**❯ Moderator:** ${interaction.user.tag} `,
        `**❯ Reason:** ${reason}`,
      ].join("\n")
    )
    .setTimestamp(new Date())
    .setFooter({ text: `${restriction_name} restricted` });
 
};
export function RoleEmbed(
  interaction: discordJs.CommandInteraction<"cached">,
  c: discordJs.Role
) {
 return new discordJs.MessageEmbed()
    .setTimestamp()
    .setColor(c.color)
    .setThumbnail(interaction.guild.iconURL({ dynamic: true })!)
    .setDescription(`**Role information**`)
    .addField(
      "Role",
      [
        `**❯ Name:** ${c.name}`,
        `**❯ Role ID:** ${c.id}`,
        `**❯ Color:** ${c.color}`,
        `**❯ Hoisted:** ${c.hoist}`,
        `**❯ Mentionable:** ${c.mentionable}`,
      ].join("\n")
    );
};
export function ChannelEmbed(
  interaction: discordJs.CommandInteraction<"cached">,
  chanCreateTime: any,
  channel: discordJs.GuildChannel,
  channeltypes: any,
  ChannelType: enums.ChannelTypes[]
) {
  const ChanEmbeds = new discordJs.MessageEmbed()
    .setTitle(`${interaction.guild.name}'s Channel Info`)
    .setThumbnail(interaction.guild.iconURL({ dynamic: true })!)
    .addField(
      `❯ Name: `,
      `${interaction.client.utils.toTitleCase(channel.name)}, (${channel.id})`,
      true
    )
    .addField(`❯ Created At:`, `${chanCreateTime}`, true);
  if (channel.isText() && channel.type === "GUILD_TEXT") {
    ChanEmbeds.addField(
      "Informations",
      [
        `**❯ NSFW:** ${channel.nsfw ? channel.nsfw : "False"}`,
        `**❯ Slowmode:** ${
          channel.rateLimitPerUser
            ? channel.rateLimitPerUser + " Seconds"
            : "None"
        }`,
        `**❯ Private Channel:** ${
          channel.permissionsFor(interaction.guild.id)?.has("VIEW_CHANNEL")
            ? "False"
            : "True"
        }`,
      ].join("\n")
    ).addField(
      `❯ Topic:`,
      ` ${channel.topic ? channel.topic : "no topic"}`,
      true
    );
  }

  ChanEmbeds.addField(
    `❯ Type:`,
    ` ${channel ? channel.type : "Cannot provide this information."}`,
    true
  );
  return ChanEmbeds;
};
