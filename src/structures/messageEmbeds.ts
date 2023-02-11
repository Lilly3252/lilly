import { ChannelType, GuildExplicitContentFilter, GuildVerificationLevel, ChatInputCommandInteraction, GuildMember, EmbedBuilder, Colors, DataManager, type GuildMemberResolvable, type Channel, type GuildChannelResolvable, Emoji, type EmojiResolvable, Role, PermissionsBitField, ActivityType, Collection, type Snowflake, Message,type GuildTextBasedChannel, TextChannel } from 'discord.js';
import * as Package from './../../package.json' assert { type: 'json' };
import ms from 'ms';
import os from 'os';
import process from 'process';
import emoji from './JSONs/emoji.json' assert { type: 'json' };
import type { guildSetting } from './@types/database.js';

export function muteEmbed(interaction: ChatInputCommandInteraction<'cached'>, member: GuildMember, reason: string, time: string): EmbedBuilder {
	return new EmbedBuilder()
		.setColor(Colors['Yellow'])
		.addFields([
			{
				name: 'Moderation',
				value: [`**❯ Action:** Timeout`, `**❯ Member:** ${member.user}`, `**❯ Moderator:** ${interaction.member.user.tag} `, `**❯ Reason:** ${reason}`, `**❯ Time:** ${time}`].join('\n'),
			},
		])
		.setFooter({ text: `Date: ${interaction.createdAt.toLocaleString()}` });
}
export function adminEmbed(interaction: ChatInputCommandInteraction<'cached'>, member: GuildMember, reason: string) {
	return new EmbedBuilder()
		.setColor(Colors['DarkRed'])
		.addFields([
			{
				name: 'Moderation',
				value: [`**❯ Action:** ${interaction.commandName}`, `**❯ Member:** ${member.user}`, `**❯ Moderator:** ${interaction.member.user.tag} `, `**❯ Reason:** ${reason}`].join('\n'),
			},
		])
		.setFooter({ text: `Date: ${interaction.createdAt.toLocaleString()}` });
}
export function userInfoEmbed(
	interaction: ChatInputCommandInteraction<'cached'>,
	member: GuildMember,
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	role: any,
	flag: string[],
	flags: { [x: string]: string },
	created: string,
	joinedServer: string,
) {
	const embed = new EmbedBuilder()
		.setThumbnail(member.user.displayAvatarURL({ forceStatic: true, size: 512 }))
		.setColor(member.displayHexColor || Colors['Blue'])
		.addFields([
			{
				name: 'User',
				value: [
					`**❯ Username:** ${member.user.username}`,
					`**❯ Discriminator:** ${member.user.discriminator}`,
					`**❯ ID:** ${member.id}`,
					`**❯ Flags:** ${flag.length ? flag.map((a: string | number) => flags[a]).join(', ') : 'None'}`,
					`**❯ Avatar:** [Link to avatar](${member.user.displayAvatarURL({
						forceStatic: true,
					})})`,
					`**❯ Time Created:** ${created}`,
					`**❯ Status:** ${member.presence?.status}`,
					`\u200b`,
				].join('\n'),
			},
			{
				name: 'Member',
				value: [`**❯ Highest Role:** ${member.roles.highest.id === interaction.guild.id ? 'None' : member.roles.highest.name}`, `**❯ Server Join Date:** ${joinedServer}`, `**❯ Hoist Role:** ${member.roles.hoist ? member.roles.hoist.name : 'None'}`, `**❯ Roles [${role.length}]:** ${role.length < 10 ? role.join(', ') : role.length > 10 ? interaction.client.utils.trimArray(role) : 'None'}`].join('\n'),
			},
		]);
	// eslint-disable-next-line no-unsafe-optional-chaining
	for (const activity of member.presence?.activities.values()!) {
		switch (activity.type) {
			case ActivityType.Playing: {
				if (activity.name === 'Visual Studio Code') {
					embed.addFields([
						{
							name: 'Coding session',
							value: [`**❯ Name:** ${activity.name}`, `**❯ Workspace:** ${activity.details ? activity.details : 'No workspace.'}`, `**❯ Details:** ${activity.state ? activity.state : 'No detail available.'}`].join('\n'),
						},
					]);
				} else {
					embed.addFields([
						{
							name: 'Playing a game',
							value: [`**❯ Name:** ${activity.name}`].join('\n'),
						},
					]);
				}

				break;
			}
			case ActivityType.Listening: {
				embed.addFields([
					{
						name: 'Currently Listening' + emoji[':Spotify:'],
						value: [`**❯ Name:** ${activity.details}`, `**❯ Artist:** ${activity.state}`].join('\n'),
					},
				]);
				break;
			}
			case ActivityType.Streaming: {
				embed.addFields([{ name: `Streaming a video`, value: 'Blabla' }]);
				break;
			}
		}
	}
	if (embed.data.fields?.length! > 20) {
		embed.spliceFields(-1, 1, { name: ':(', value: 'No more activity can be shown due to limits' });
	}
	return embed;
}
export function settingEmbed(interaction: ChatInputCommandInteraction<'cached'>, guild_db: guildSetting) {
	return (
		new EmbedBuilder()
			.setAuthor({ name: `${interaction.guild.name} Settings` })
			// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
			.setThumbnail(interaction.guild.iconURL({ forceStatic: true })!)
			.setDescription(
				[
					`**❯ Prefix:** Slash commands !`,
					`**❯ WelcomeChannelID:**${guild_db.welcomeChannelID ? guild_db.welcomeChannelID : 'No information yet'}`,
					`**❯ ModLogChannelID:** ${guild_db.logChannelID ? guild_db.logChannelID : 'No information yet'}`,
					`**❯ Anti-raid:** ${!!guild_db.antiRaidMode && guild_db.antiRaidMode}`,
					`**❯ MessageDelete** ${!!guild_db.messageDeleteMode && guild_db.messageDeleteMode}`,
					`**❯ messageBulkDelete** ${!!guild_db.messageBulkDeleteMode && guild_db.messageBulkDeleteMode}`,
					`**❯ MessageUpdate:** ${!!guild_db.messageUpdateMode && guild_db.messageUpdateMode}`,
				].join('\n'),
			)
			.setFooter({
				text: `Requested by ${interaction.user.username}`,
				iconURL: `${interaction.user.displayAvatarURL({ forceStatic: true })}`,
			})
	);
}
export function serverInfoEmbed(interaction: ChatInputCommandInteraction<'cached'>, owner: GuildMember, member: DataManager<string, GuildMember, GuildMemberResolvable>, b: string[], d: DataManager<string, Channel, GuildChannelResolvable>, e: DataManager<string, Emoji, EmojiResolvable>, server_create: string) {
	return (
		new EmbedBuilder()
			.setDescription(`**Guild information for __${interaction.guild.name}__**`)
			.setColor(Colors['Blue'])
			// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
			.setThumbnail(interaction.guild.iconURL({ forceStatic: true })!)
			.addFields([
				{
					name: 'General',
					value: [`**❯ Name:** ${interaction.guild.name}`, `**❯ ID:** ${interaction.guild.id}`, `**❯ Owner:** ${owner.user.tag} (${owner.id})`, `**❯ Boost Tier:** ${interaction.guild.premiumTier ? `Tier ${interaction.guild.premiumTier}` : 'None'}`, `**❯ Explicit Filter:** ${GuildExplicitContentFilter[interaction.guild.explicitContentFilter]}`, `**❯ Verification Level:** ${GuildVerificationLevel[interaction.guild.verificationLevel]}`, `**❯ Time Created:** ${server_create}`, '\u200B'].join('\n'),
				},
				{
					name: 'statistic',
					value: [
						`**❯ Role Count:** ${b.length}`,
						`**❯ Emoji Count:** ${e.cache.size}`,
						`**❯ Regular Emoji Count:** ${e.cache.filter((a: Emoji) => !a.animated).size}`,
						`**❯ Animated Emoji Count:** ${e.cache.filter((a: Emoji) => a.animated as true).size}`,
						`**❯ Member Count:** ${interaction.guild.memberCount}`,
						`**❯ Humans:** ${member.cache.filter((a: GuildMember) => !a.user.bot).size}`,
						`**❯ Bots:** ${member.cache.filter((a: GuildMember) => a.user.bot).size}`,
						`**❯ Text Channels:** ${d.cache.filter((channel: Channel) => channel.type === ChannelType.GuildText).size}`,
						`**❯ Voice Channels:** ${d.cache.filter((channel: Channel) => channel.type === ChannelType.GuildVoice).size}`,
						`**❯ Stage Channels:** ${d.cache.filter((channel: Channel) => channel.type === ChannelType.GuildStageVoice).size}`,
						`**❯ Boost Count:** ${interaction.guild.premiumSubscriptionCount || '0'}`,
						'\u200B',
					].join('\n'),
				},
				{
					name: 'Presence',
					value: [
						`**❯ Online:** ${member.cache.filter((guildmember: GuildMember) => guildmember.presence?.status === 'online').size}`,
						`**❯ Idle:** ${member.cache.filter((guildmember: GuildMember) => guildmember.presence?.status === 'idle').size}`,
						`**❯ Do Not Disturb:** ${member.cache.filter((guildmember: GuildMember) => guildmember.presence?.status === 'dnd').size}`,
						`**❯ Offline:** ${member.cache.filter((guildmember: GuildMember) => guildmember.presence?.status === 'offline').size}`,
						`**❯ No presence detected:** ${member.cache.filter((guildmember: GuildMember) => guildmember.presence === null).size}`,
						'\u200B',
					].join('\n'),
				},
				{
					name: `Roles [${b.length - 1}]`,
					value: [b.length < 10 ? b.join(', ') : b.length > 10 ? interaction.client.utils.trimArray(b) : 'None'].join('\n'),
				},
			])
			.setTimestamp()
	);
}
export function botInfoEmbed(interaction: ChatInputCommandInteraction<'cached'>, b: os.CpuInfo, bot_create: string) {
	if (!interaction.client.user) return undefined;
	if (!interaction.guild.members.me) return undefined;
	return new EmbedBuilder()
		.setThumbnail(interaction.client.user.displayAvatarURL())
		.setColor(interaction.guild.members.me.displayHexColor || Colors['Blue'])
		.addFields([
			{
				name: 'General',
				value: [
					`**❯ Client:** ${interaction.client.user.tag} (${interaction.client.user.id})`,
					`**❯ Commands:** ${interaction.client.commands.size}`,
					`**❯ Servers:** ${interaction.client.guilds.cache.size.toLocaleString()} `,
					`**❯ Users:** ${interaction.client.guilds.cache.reduce((c, a) => c + a.memberCount, 0).toLocaleString()}`,
					`**❯ Channels:** ${interaction.client.channels.cache.size.toLocaleString()}`,
					`**❯ Creation Date:** ${bot_create}`,
					`**❯ Node.js:** ${process.version}`,
					`**❯ Version:** v${Package.default.version}`,
					`**❯ Discord.js:** v${Package.default.dependencies['discord.js']}`,
					'\u200B',
				].join('\n'),
			},
			{
				name: 'System',
				value: [`**❯ Platform:** ${process.platform}`, `**❯ Uptime:** ${ms(1e3 * process.uptime(), { long: true })}`, `**❯ CPU:**`, `\u3000 Cores: ${os.cpus().length}`, `\u3000 Model: ${b.model}`, `\u3000 Speed: ${b.speed}MHz`, `**❯ Memory:**`, `\u3000 Total: ${interaction.client.utils.formatBytes(process.memoryUsage().heapTotal)}`, `\u3000 Used: ${interaction.client.utils.formatBytes(process.memoryUsage().heapUsed)}`].join('\n'),
			},
			{
				name: 'Code',
				value: `[Click here](https://github.com/Lilly3252/LillyBot)`,
				inline: true,
			},
		])
		.setTimestamp();
}
export function restrictEmbed(interaction: ChatInputCommandInteraction<'cached'>, reason: string, restriction_name: string, e: GuildMember) {
	return new EmbedBuilder()
		.setAuthor({
			name: `${interaction.user.tag} (${interaction.user.id})`,
			iconURL: interaction.user.displayAvatarURL(),
		})
		.setColor(Colors['DarkOrange'])
		.addFields([
			{
				name: 'Moderation',
				value: [`**❯ Action:** ${restriction_name} restriction`, `**❯ Member:** ${e.user.username}`, `**❯ Moderator:** ${interaction.user.tag} `, `**❯ Reason:** ${reason}`].join('\n'),
			},
		])
		.setTimestamp(new Date())
		.setFooter({ text: `${restriction_name} restricted` });
}
export function roleEmbed(interaction: ChatInputCommandInteraction<'cached'>, c: Role) {
	return (
		new EmbedBuilder()
			.setTimestamp()
			.setColor(c.color)
			// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
			.setThumbnail(interaction.guild.iconURL({ forceStatic: true })!)
			.setDescription(`**Role information**`)
			.addFields([
				{
					name: 'Role',
					value: [`**❯ Name:** ${c.name}`, `**❯ Role ID:** ${c.id}`, `**❯ Color:** ${c.color}`, `**❯ Hoisted:** ${c.hoist}`, `**❯ Mentionable:** ${c.mentionable}`].join('\n'),
				},
			])
	);
}
export function channelEmbed(
	interaction: ChatInputCommandInteraction<'cached'>,
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	chanCreateTime: any,
	channel: TextChannel,
) {
	const chanEmbeds = new EmbedBuilder()
		.setTitle(`${interaction.guild.name}'s Channel Info`)
		// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
		.setThumbnail(interaction.guild.iconURL({ forceStatic: true })!)
		.addFields([
			{
				name: `❯ Name: `,
				value: `${interaction.client.utils.toTitleCase(channel.name)}, (${channel.id})`,
				inline: true,
			},
			{ name: `❯ Created At:`, value: `${chanCreateTime}`, inline: true },
		]);
	if (channel.isTextBased()) {
		chanEmbeds.addFields([
			{
				name: 'Information',
				value: [`**❯ NSFW:** ${channel.nsfw ? channel.nsfw : 'False'}`, `**❯ Slowmode:** ${channel.rateLimitPerUser ? channel.rateLimitPerUser + ' Seconds' : 'None'}`, `**❯ Private Channel:** ${channel.permissionsFor(interaction.guild.id)?.has(PermissionsBitField.Flags.ViewChannel) ? 'False' : 'True'}`].join('\n'),
			},
			{ name: `❯ Topic:`, value: ` ${channel.topic ? channel.topic : 'no topic'}`, inline: true },
		]);
	}

	chanEmbeds.addFields([
		{
			name: `❯ Type:`,
			value: ` ${ChannelType ? ChannelType[channel.type] : 'Cannot provide this information.'}`,
			inline: true,
		},
	]);
	return chanEmbeds;
}
export function messageDeleteEmbed(message: Message) {
	const deleteEmbed = new EmbedBuilder()
		.setAuthor({
			name: `${message.author.tag} (${message.author.id})`,
			iconURL: message.author.displayAvatarURL(),
		})
		.addFields({ name: '\u276F Channel', value: [message.channel].join('\n') })
		.setTimestamp(new Date())
		.setFooter({ text: `Deleted by: ${message.author.tag}` });

	message.content &&
		deleteEmbed.addFields({
			name: '\u276F Content',
			value: `${message.content.substring(0, 1020)}`,
		});
	if (message.attachments.size) {
		deleteEmbed.addFields([
			{
				name: '\u276F Attachment(s)',
				value: `• ${message.attachments.map((a) => a.proxyURL).join('\n\u2022 ')}`,
			},
		]);
	}
	if (!message.content && message.embeds.length) {
		deleteEmbed.addFields({
			name: '\u276F Embeds',
			value: `${message.embeds.length}`,
		});
	}
	if (message.embeds.length) {
		deleteEmbed.addFields({
			name: '\u276F Embed Description',
			value: `${message.embeds[0]?.description}`,
		});
	}
	return deleteEmbed;
}
export function messageDeleteBulkEmbed(messages: Collection<Snowflake, Message<true>>, deletedMessageChannel: GuildTextBasedChannel, length: number) {
	const messageDeleteBulkEmbed = new EmbedBuilder()
		.setAuthor({
			name: `${messages.first()?.author.tag} (${messages.first()?.author.id})`,
			iconURL: messages.first()?.author.displayAvatarURL(),
		})
		.addFields({ name: '\u276F Channel', value: [deletedMessageChannel.name].join('\n') });
	if (messages.first()!.content.length > 1024) {
		messageDeleteBulkEmbed.addFields({
			name: '\u276F Messages',
			value: messages
				.map((message) => `**❯** [${message.author.tag}]: ${message.content.substring(0, 200)}`)
				.join('\n')
				.substring(0, 1024),
		});
	} else {
		messageDeleteBulkEmbed.addFields({
			name: '\u276F Messages',
			value: messages.map((message) => `**❯** [${message.author.tag}]: ${message.content}`).join('\n'),
		});
	}

	messageDeleteBulkEmbed
		.setFooter({ text: `${length} latest shown` })
		.setColor('#dd5f53')
		.setTimestamp();
	return messageDeleteBulkEmbed;
}
