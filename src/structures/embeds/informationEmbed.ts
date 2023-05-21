import { lillyColors } from '#constants/colors.js';
import emoji from '#json/emoji.json' assert { type: 'json' };
import type { guildSetting } from '#type/database.js';
import {
	ActivityType, type Channel, ChannelType, ChatInputCommandInteraction, ClientApplication, Colors, DataManager, EmbedBuilder, Emoji, type EmojiResolvable, type GuildChannelResolvable, GuildExplicitContentFilter, GuildMember,
	type GuildMemberResolvable, GuildVerificationLevel, PermissionsBitField, Role, TextChannel, User,
} from 'discord.js';
import ms from 'ms';
import os from 'os';

import * as Package from '../../../package.json' assert { type: 'json' };

export function userInfoEmbed(
	interaction: ChatInputCommandInteraction<'cached'>,
	user:User,
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	
	flag: string[],
	flags: { [x: string]: string },
	created: string,
	joinedServer: string,
	role?: any,
	member?: GuildMember,
) {

	const embed = new EmbedBuilder()
		.setThumbnail(member?.user.displayAvatarURL({ forceStatic: true, size: 512 }) ?? user.displayAvatarURL({ forceStatic: true, size: 512 }))
		.setColor(member?.displayHexColor ?? lillyColors.RainbowDark["SadBlue"])
		.addFields([
			{
				name: 'User',
				value: [
					`**❯ Username:** ${member?.user.username ?? user.username}`,
					`**❯ Discriminator:** ${member?.user.discriminator ?? user.discriminator}`,
					`**❯ ID:** ${member?.id ?? user.id}`,
					`**❯ Flags:** ${flag.length ? flag.map((a: string) => flags[a]).join(', ') : 'None'}`,
					`**❯ Avatar:** [Link to avatar](${member?.user.displayAvatarURL({
						forceStatic: true,
					}) ?? user.displayAvatarURL({
						forceStatic: true,
					})})`,
					`**❯ Time Created:** ${created}`,
					`**❯ Status:** ${member?.presence?.status ?? "No information"}`,
					`\u200b`,
				].join('\n'),
			},
		])
		if(member){
			embed.addFields({
				name: 'Member',
				value: [
					`**❯ Highest Role:** ${member?.roles.highest.id === interaction.guild.id ? 'None' : member?.roles.highest.name}`,
					`**❯ Server Join Date:** ${joinedServer ? joinedServer: "Not in server"}`,
					`**❯ Hoist Role:** ${member?.roles.hoist ? member.roles.hoist.name : 'None'}`,
					`**❯ Roles [${role.length}]:** ${role.length < 10 ? role.join(', ') : role.length > 10 ? interaction.client.utils.trimArray(role) : 'None'}`,
				].join('\n'),
			},)
		}
	// eslint-disable-next-line no-unsafe-optional-chaining
	for (const activity of member?.presence?.activities.values()?? []) {
		switch (activity.type) {
			case ActivityType.Playing: {
				if (activity.name === 'Visual Studio Code') {
					embed.addFields([
						{
							name: 'Coding session',
							value: [
								`**❯ Name:** ${activity.name}`,
								`**❯ Workspace:** ${activity.details ? activity.details : 'No workspace.'}`,
								`**❯ Details:** ${activity.state ? activity.state : 'No detail available.'}`,
							].join('\n'),
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
						name: `Currently Listening \u0020 ${emoji[':Spotify:']}`,
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
	const settingEmbed = new EmbedBuilder()
		.setAuthor({ name: `${interaction.guild.name} Server settings` })
		.setThumbnail(interaction.guild.iconURL())
		.addFields({
			name: 'Channels',
			value: [
				`**\u3000❯ Welcome Channel:** <#${guild_db.welcomeChannelID}> ` ?? `No information yet`,
				`**\u3000❯ Mod-Log Channel:** <#${guild_db.logChannelID}> \u000A` ?? `No information yet\u000A`,
				`**Anti-raid:** ${interaction.client.utils.isEnabled(guild_db.antiRaid)}`,
				`**Audit Logs:** ${interaction.client.utils.isEnabled(guild_db.auditLogEvent)}\u000A`,
			].join('\n'),
		});
	if (guild_db.auditLogEvent) {
		settingEmbed.addFields({
			name: `Event Updates`,
			value: [
				'**\u3000❯ Bot:**'.padEnd(53, '\u202F'),`${interaction.client.utils.emojify(guild_db.botUpdate)}`,'**\u3000❯ Stickers:**'.padEnd(84, '\u202F'),`${interaction.client.utils.emojify(guild_db.stickerUpdate)}\n`,
				'**\u3000❯ Roles:**'.padEnd(47, '\u202F'),`${interaction.client.utils.emojify(guild_db.roleUpdate)}`,'**\u3000❯ Channels:**'.padEnd(80, '\u202F'),`${interaction.client.utils.emojify(guild_db.channelUpdate)}\n`,
				'**\u3000❯ Guild:**'.padEnd(47, '\u202F'),`${interaction.client.utils.emojify(guild_db.guildUpdate)}`,'**\u3000❯ Invitations:**'.padEnd(78, '\u202F'),`${interaction.client.utils.emojify(guild_db.inviteUpdate)}\n`,
				'**\u3000❯ Emojis:**'.padEnd(43, '\u202F'),`${interaction.client.utils.emojify(guild_db.emojiUpdate)}`,'**\u3000❯ Integrations:**'.padEnd(73, '\u202F'),`${interaction.client.utils.emojify(guild_db.integrationUpdate)}\n`,
				'**\u3000❯ Threads:**'.padEnd(38, '\u202F'),`${interaction.client.utils.emojify(guild_db.threadUpdate)}`,'**\u3000❯ Guild Members:**'.padEnd(62, '\u202F'),`${interaction.client.utils.emojify(guild_db.memberUpdate)}\n`,
				'**\u3000❯ Messages:**'.padEnd(33, '\u202F'),`${interaction.client.utils.emojify(guild_db.messageUpdate)}`,'**\u3000❯ Auto-Moderation:**'.padEnd(54, '\u202F'),`${interaction.client.utils.emojify(guild_db.autoModeration)}\n`,
				'**\u3000❯ Webhooks:**'.padEnd(31, '\u202F'),`${interaction.client.utils.emojify(guild_db.webhookUpdate)}`,'**\u3000❯ Scheduled Events:**'.padEnd(54, '\u202F'),`${interaction.client.utils.emojify(guild_db.guildScheduledUpdate)}\n`,
				'**\u3000❯ Stage Events:**'.padEnd(24, '\u202F'),`${interaction.client.utils.emojify(guild_db.stageInstanceUpdate)}`,'**\u3000❯ Commands Permissions:**'.padEnd(34, '\u202F'),`${interaction.client.utils.emojify(guild_db.commandPermission)}\n`,
			].join(''),
		});
	}
	/*settingEmbed.setFooter({
		text: `Requested by ${interaction.user.username}`,
		iconURL: `${interaction.user.displayAvatarURL({ forceStatic: true })}`,
	});*/
	return settingEmbed;
}
export function serverInfoEmbed(
	interaction: ChatInputCommandInteraction<'cached'>,
	owner: GuildMember,
	member: DataManager<string, GuildMember, GuildMemberResolvable>,
	b: string[],
	d: DataManager<string, Channel, GuildChannelResolvable>,
	e: DataManager<string, Emoji, EmojiResolvable>,
	server_create: string,
) {
	return (
		new EmbedBuilder()
			.setDescription(`**Guild information for __${interaction.guild.name}__**`)
			.setColor(Colors['Blue'])
			// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
			.setThumbnail(interaction.guild.iconURL({ forceStatic: true })!)
			.addFields([
				{
					name: 'General',
					value: [
						`**❯ Name:** ${interaction.guild.name}`,
						`**❯ ID:** ${interaction.guild.id}`,
						`**❯ Owner:** ${owner.user.tag} (${owner.id})`,
						`**❯ Boost Tier:** ${interaction.guild.premiumTier ? `Tier ${interaction.guild.premiumTier}` : 'None'}`,
						`**❯ Explicit Filter:** ${GuildExplicitContentFilter[interaction.guild.explicitContentFilter]}`,
						`**❯ Verification Level:** ${GuildVerificationLevel[interaction.guild.verificationLevel]}`,
						`**❯ Time Created:** ${server_create}`,
						'\u200B',
					].join('\n'),
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
export function botInfoEmbed(interaction: ChatInputCommandInteraction<'cached'>, b: os.CpuInfo, bot_create: string , application: ClientApplication ,flag: string[] , flags: { [x: string]: string }) {
	if (!interaction.client.user) return undefined;
	if (!interaction.guild.members.me) return undefined;
	return new EmbedBuilder()
		.setThumbnail(interaction.client.user.displayAvatarURL())
		.setColor(interaction.guild.members.me.displayHexColor || Colors['Blue'])
		.setTitle(`${interaction.client.user.tag} (${interaction.client.user.id})`)
		.addFields([
			{
				name: `Information`,
				value: [
					`**❯ Owner:** ${application.owner} (${application.owner?.id})`,
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
				value: [
					`**❯ Platform:** ${process.platform}`,
					`**❯ Uptime:** ${ms(1e3 * process.uptime(), { long: true })}`,
					`**❯ CPU:**`,
					`\u3000 Cores: ${os.cpus().length}`,
					`\u3000 Model: ${b.model}`,
					`\u3000 Speed: ${b.speed}MHz`,
					`**❯ Memory:**`,
					`\u3000 Total: ${interaction.client.utils.formatBytes(process.memoryUsage().heapTotal)}`,
					`\u3000 Used: ${interaction.client.utils.formatBytes(process.memoryUsage().heapUsed)}`,
				].join('\n'),
			},
			{
				name: "Flags",
				value: `${flag.length ? flag.map((a: string) => flags[a]).join(', ') : 'None'}`,
			},
			{
				name: 'Code',
				value: `[Click here](https://github.com/Lilly3252/LillyBot)`,
			},
		])
		.setTimestamp();
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
				value: [
					`**❯ NSFW:** ${channel.nsfw ? channel.nsfw : 'False'}`,
					`**❯ Slowmode:** ${channel.rateLimitPerUser ? channel.rateLimitPerUser + ' Seconds' : 'None'}`,
					`**❯ Private Channel:** ${channel.permissionsFor(interaction.guild.id)?.has(PermissionsBitField.Flags.ViewChannel) ? 'False' : 'True'}`,
				].join('\n'),
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
