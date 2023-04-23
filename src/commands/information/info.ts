import * as Embed from '#embeds/index.js';
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
		const b = os.cpus()[0];
		const botCreate = time(interaction.client.user.createdAt, 'R');
		await interaction.reply({
			embeds: [Embed.botInfoEmbed(interaction, b!, botCreate)!],
		});
	}

	if (interaction.options.getSubcommand() === 'user') {
		const member = interaction.options.getMember('target');
		const flags = {
			BotHTTPInteractions: 'HTTP Interaction Only',
			Staff: 'Discord Employee',
			Partner: 'Partnered Server Owner',
			BugHunterLevel1: 'Bug Hunter (Level 1)',
			BugHunterLevel2: 'Bug Hunter (Level 2)',
			HypeSquadOnlineHouse1: 'House of Bravery',
			HypeSquadOnlineHouse2: 'House of Brilliance',
			HypeSquadOnlineHouse3: 'House of Balance',
			Hypesquad: 'Hypesquad',
			Quarantined: 'Quarantined Account',
			Spammer: 'Spammer User',
			PremiumEarlySupporter: 'Early Nitro Supporter',
			TeamPseudoUser: 'Team User',
			VerifiedBot: 'Verified Bot',
			VerifiedDeveloper: 'Early Verified Bot Developer',
			CertifiedModerator: 'Moderator Programs Alumni',
			ActiveDeveloper: 'Active Developer',
			RestrictedCollaborator:'Restricted Collaborator',
			MFASMS:'',
			PremiumPromoDismissed:'Premium Dismissed',
			DisablePremium:'Premium Disabled',
			HasUnreadUrgentMessages:'Has urgent messages',
			Collaborator:'Collaborator'

		};
		const created = time(member?.user.createdAt!, 'R');
		const joinedServer = time(member?.joinedAt!, 'R');
		const flag = member?.user.flags?.toArray();
		const role = member?.roles.cache
			.sort((c, a) => a.position - c.position)
			.map((a) => a.toString())
			.slice(0, -1);
		return interaction.reply({
			embeds: [Embed.userInfoEmbed(interaction, member!, role, flag!, flags, created, joinedServer)],
		});
	}
};
