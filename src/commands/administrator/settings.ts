import settingSchema from '#database/guildSettings.js';
import * as Embed from '#embeds/index.js';
import type { SlashCommand } from '#type/index.js';
/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { ActionRowBuilder, ChatInputCommandInteraction, PermissionsBitField, SlashCommandBuilder, StringSelectMenuBuilder } from 'discord.js';

export const slashy: SlashCommand['slashy'] = new SlashCommandBuilder()
	.setName('settings')
	.setDescription('Show or add settings')
	.setDefaultMemberPermissions(PermissionsBitField.Flags.Administrator)
	.addSubcommand((subcommand) => subcommand.setName('show').setDescription('Show settings you have'))
	.addSubcommand((subcommand) =>
		subcommand
			.setName('audit-log')
			.setDescription('Enable or Disabled the Audit log')
			.addBooleanOption((option) => option.setName('choice').setDescription('Enable or Disabled')),
	)
	.addSubcommand((subcommand) =>
		subcommand
			.setName('events')
			.setDescription('Set all your events for logging purposes')
			.addStringOption((option) => option.setName('events').setDescription('Select your event')),
	)
	.addSubcommand((subcommand) =>
		subcommand
			.setName('channels')
			.setDescription('Set all your channels for logging purposes')
			.addStringOption((option) => option.setName('channels').setDescription('Select your channels').addChoices({ name: 'Welcome Channel', value: 'welcomechannel' }, { name: 'Mod Log', value: 'modlog' }).setRequired(true))
			.addChannelOption((option) => option.setName('channel').setDescription('Select a channel.').setRequired(true)),
	);

export const run: SlashCommand['run'] = async (interaction: ChatInputCommandInteraction<'cached'>): Promise<any> => {
	const channels = interaction.options.getString('channels');
	const choice = interaction.options.getBoolean('choice');
	const chan = interaction.options.getChannel('channel');

	const guild_db = await settingSchema.findOne({ guildID: interaction.guild.id }).then(async (guild) => {
		if (!guild) {
			await settingSchema.create({
				data: {
					guildID: interaction.guild.id,
					name: interaction.guild.name,
					antiRaid: false,
					botUpdate: false,
					roleUpdate: false,
					logChannelID: null,
					guildUpdate: false,
					emojiUpdate: false,
					inviteUpdate: false,
					threadUpdate: false,
					memberUpdate: false,
					auditLogEvent: false,
					messageUpdate: false,
					channelUpdate: false,
					stickerUpdate: false,
					webhookUpdate: false,
					autoModeration: false,
					welcomeChannelID: null,
					urlLinkDetection: false,
					integrationUpdate: false,
					commandPermission: false,
					stageInstanceUpdate: false,
					guildScheduledUpdate: false,
				},
			});
		}
		return settingSchema.findOneAndUpdate({ guildID: interaction.guild.id });
	});
	if (interaction.options.getSubcommand() === 'show') {
		interaction.reply({
			embeds: [Embed.settingEmbed(interaction, guild_db!)],
			ephemeral: true,
		});
	}
	if (interaction.options.getSubcommand() === 'events') {
		const row = new ActionRowBuilder<StringSelectMenuBuilder>().addComponents(
			new StringSelectMenuBuilder()
				.setCustomId('selectevents')
				.setPlaceholder('Select your events.')
				.setMaxValues(17)
				.addOptions([
					{
						label: 'Anti-raid',
						description: 'This is a description',
						value: 'antiRaid',
					},
					{
						label: 'Bot',
						description: 'This is also a description',
						value: 'botUpdate',
					},
					{
						label: 'Roles',
						description: 'This is a description as well',
						value: 'roleUpdate',
					},
					{
						label: 'Guild',
						description: 'This is a description',
						value: 'guildUpdate',
					},
					{
						label: 'Emojis',
						description: 'This is a description',
						value: 'emojiUpdate',
					},
					{
						label: 'Invites',
						description: 'This is a description',
						value: 'inviteUpdate',
					},
					{
						label: 'Threads',
						description: 'This is a description',
						value: 'threadUpdate',
					},
					{
						label: 'Members',
						description: 'This is a description',
						value: 'memberUpdate',
					},
					{
						label: 'Messages',
						description: 'This is a description',
						value: 'messageUpdate',
					},
					{
						label: 'Channels',
						description: 'This is a description',
						value: 'channelUpdate',
					},
					{
						label: 'Stickers',
						description: 'This is a description',
						value: 'stickerUpdate',
					},
					{
						label: 'Webhooks',
						description: 'This is a description',
						value: 'webhookUpdate',
					},
					{
						label: 'Auto-Moderation',
						description: 'This is a description',
						value: 'autoModeration',
					},
					{
						label: 'Integrations',
						description: 'This is a description',
						value: 'integrationUpdate',
					},
					{
						label: 'Command permissions',
						description: 'This is a description',
						value: 'commandPermission',
					},
					{
						label: 'Stage Instances',
						description: 'This is a description',
						value: 'stageInstanceUpdate',
					},
					{
						label: 'Scheduled Events',
						description: 'This is a description',
						value: 'guildScheduledUpdate',
					},
				]),
		);

		await interaction.reply({ content: 'WARNING: THIS WILL OVERRIDE YOUR ALREADY EXISTING EVENT SETTINGS! , BE AWARE!', ephemeral: true, components: [row] });
	}
	if (interaction.options.getSubcommand() === 'audit-log') {
		if (choice) {
			await guild_db?.updateOne({ auditLogEvent: true }).then(() =>
				interaction.reply({
					content: `✅ Audit log is now enabled`,
					ephemeral: true,
				}),
			);
		} else {
			await guild_db?.updateOne({ auditLogEvent: false }).then(() =>
				interaction.reply({
					content: `✅ Audit log is now disabled`,
					ephemeral: true,
				}),
			);
		}
	}
	if (interaction.options.getSubcommand() === 'channels') {
		switch (channels) {
			case 'welcomechannel':
				{
					if (chan?.isTextBased()) {
						await guild_db?.updateOne({ welcomeChannelID: chan.id }).then(() =>
							interaction.reply({
								content: `✅ Welcome Channel has been set to ${chan}`,
								ephemeral: true,
							}),
						);
					} else {
						await guild_db?.updateOne({ welcomeChannelID: null });
						return interaction.reply({
							content: `✅ Welcome Channel has been removed`,
							ephemeral: true,
						});
					}
				}
				break;
			case 'modlog':
				{
					if (chan?.isTextBased()) {
						await guild_db?.updateOne({ logChannelID: chan.id }).then(() =>
							interaction.reply({
								content: `✅ ModLog Channel has been set to ${chan}`,
								ephemeral: true,
							}),
						);
					} else {
						await guild_db?.updateOne({ logChannelID: null });
						return interaction.reply({
							content: `✅ ModLog Channel has been removed`,
							ephemeral: true,
						});
					}
				}
				break;
		}
	}
};
