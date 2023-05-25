import * as Embed from '#embeds/index.js';
import Emoji from '#json/emoji.json' assert { type: 'json' };
import type { SlashCommand } from '#type/index.js';
/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { ChatInputCommandInteraction, PermissionsBitField, SlashCommandBuilder, TextChannel, time } from 'discord.js';
import os from 'os';

export const slashy: SlashCommand['slashy'] = new SlashCommandBuilder()
	.setName('info')
	.setDescription('Information.')
	.setDefaultMemberPermissions(PermissionsBitField.Flags.ManageRoles)
	.addSubcommand((subcommand) =>
		subcommand
			.setName('channel')
			.setDescription('Select a channel.')
			.addChannelOption((option) => option.setName('channel').setDescription('Select a channel.').setRequired(true)),
	)
	.addSubcommand((subcommand) =>
		subcommand
			.setName('role')
			.setDescription('Select a role.')
			.addRoleOption((option) => option.setName('role').setDescription('Select a role.').setRequired(true)),
	)
	.addSubcommand((subcommand) => subcommand.setName('bot').setDescription('Get information of the bot.'))
	.addSubcommand((subcommand) =>
		subcommand
			.setName('user')
			.setDescription('Get information of a user.')
			.addUserOption((option) => option.setName('target').setDescription('Select a user').setRequired(true)),
	)
	.addSubcommand((subcommand) => subcommand.setName('server').setDescription('Get information of the server.'));

export const run: SlashCommand['run'] = async (interaction: ChatInputCommandInteraction<'cached'>): Promise<any> => {
	if (interaction.options.getSubcommand() === 'channel') {
		const channel = interaction.options.getChannel('channel') as TextChannel;
		const chanCreateTime = time(channel?.createdAt!, 'R');

		await interaction.reply({
			embeds: [Embed.channelEmbed(interaction, chanCreateTime, channel)],
		});
	}

	if (interaction.options.getSubcommand() === 'role') {
		const c = interaction.options.getRole('role');

		interaction.reply({ embeds: [Embed.roleEmbed(interaction, c!)] });
	}

	if (interaction.options.getSubcommand() === 'server') {
		const serverCreate = time(interaction.guild.createdAt, 'R');
		const owner = await interaction.guild.fetchOwner();
		const b = interaction.guild.roles.cache.sort((c, a) => a.position - c.position).map((a) => a.toString());
		const member = interaction.guild.members;
		const d = interaction.guild.channels;
		const e = interaction.guild.emojis;

		interaction.reply({
			embeds: [Embed.serverInfoEmbed(interaction, owner, member, b, d, e, serverCreate)],
		});
	}

	if (interaction.options.getSubcommand() === 'bot') {
		const application = await interaction.client.application.fetch();
		const flag = application.flags?.toArray();
		const flags = {
			GatewayPresenceLimited: 'Limited Presence',
			GatewayGuildMembersLimited: 'Limited guild member',
			GatewayMessageContentLimited: 'Limited message content',
			ApplicationAutoModerationRuleCreateBadge: 'AutoMod',
			ApplicationCommandBadge: 'Slash Command Supported',
		};
		const b = os.cpus()[0];
		const botCreate = time(interaction.client.user.createdAt, 'R');
		await interaction.reply({
			embeds: [Embed.botInfoEmbed(interaction, b!, botCreate, application, flag, flags)!],
		});
	}

	if (interaction.options.getSubcommand() === 'user') {
		const user = interaction.options.getUser('target',true);
		try {
			const fetchedUser = await interaction.guild.members.fetch(user)
			if (fetchedUser) {
				const flags = {
					Staff: `${Emoji.DiscordStaff}`,
					Partner: `${Emoji.DiscordPartner}`,
					BugHunterLevel1: `${Emoji.BugHunter}`,
					BugHunterLevel2: `${Emoji.GoldBugHunter}`,
					HypeSquadOnlineHouse1: `${Emoji.Bravery}`,
					HypeSquadOnlineHouse2: `${Emoji.Brilliance}`,
					HypeSquadOnlineHouse3: `${Emoji.Balance}`,
					Hypesquad: `${Emoji.HSEvent}`,
					Spammer: `${Emoji.AccountWarning}`,
					PremiumEarlySupporter: `${Emoji.DiscordEarlySupport}`,
					VerifiedDeveloper: `${Emoji.EarlyBotDeveloper}`,
					CertifiedModerator: `${Emoji.DiscordMod}`,
					ActiveDeveloper: `${Emoji.ActiveDeveloper}`,
				};
				const created = time(fetchedUser?.user.createdAt!, 'R');
				const joinedServer = time(fetchedUser?.joinedAt!, 'R');
				const flag = fetchedUser?.user.flags?.toArray();
				const role = fetchedUser?.roles.cache
					.sort((c, a) => a.position - c.position)
					.map((a) => a.toString())
					.slice(0, -1);
				return interaction.reply({
					embeds: [Embed.userInfoEmbed(interaction,user, flag!, flags, created, joinedServer, role,fetchedUser!)],
				});
			}
		} catch {
			const flags = {
				Staff: `${Emoji.DiscordStaff}`,
				Partner: `${Emoji.DiscordPartner}`,
				BugHunterLevel1: `${Emoji.BugHunter}`,
				BugHunterLevel2: `${Emoji.GoldBugHunter}`,
				HypeSquadOnlineHouse1: `${Emoji.Bravery}`,
				HypeSquadOnlineHouse2: `${Emoji.Brilliance}`,
				HypeSquadOnlineHouse3: `${Emoji.Balance}`,
				Hypesquad: `${Emoji.HSEvent}`,
				Spammer: `${Emoji.AccountWarning}`,
				PremiumEarlySupporter: `${Emoji.DiscordEarlySupport}`,
				VerifiedDeveloper: `${Emoji.EarlyBotDeveloper}`,
				CertifiedModerator: `${Emoji.DiscordMod}`,
				ActiveDeveloper: `${Emoji.ActiveDeveloper}`,
			};
			const joinedServer = "not Joined";
			const created = time(user.createdAt!, 'R');
			const flag = user.flags?.toArray();
			const role = "none"
			return interaction.reply({
				embeds: [Embed.userInfoEmbed(interaction,user, flag!, flags, created,role, joinedServer)],
			});
		}
	}
};
