import settingSchema from '#database/guildSettings.js';
import * as Embed from '#embeds/index.js';
import type { SelectMenu, SlashCommand } from '#type/index.js';
/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { ActionRowBuilder, ChatInputCommandInteraction, PermissionsBitField, SlashCommandBuilder, StringSelectMenuBuilder } from 'discord.js';

export const customId: SelectMenu["customId"] = "selectevents"

export const slashy: SlashCommand['slashy'] = new SlashCommandBuilder()
	.setName('settings')
	.setDescription('Show or add settings')
	.setDefaultMemberPermissions(PermissionsBitField.Flags.Administrator)
	.addSubcommand((subcommand) => subcommand.setName('show').setDescription('Show settings you have'))
	.addSubcommand((subcommand) => subcommand.setName('audit-log').setDescription('Show settings you have').addBooleanOption((option) => option.setName("choice").setDescription("Enable or Disabled")))
	.addSubcommand((subcommand) =>
		subcommand
			.setName('events')
			.setDescription('Set all your events for logging purposes')
			/*.addStringOption((option) => option.setName('events').setDescription('Select your event')
			.addChoices(
			{ name: 'anti-raid', value: 'Anti Raid' }, 
			{ name: 'Message Update/Create/Delete', value: 'messageUpdate' }, 
			{ name: 'Bot Add/Update', value: 'botUpdate' }, 
			{ name: 'Role Update/Create/Delete', value: 'roleUpdate' }, 
			{ name: 'Guild Update/Create/Delete', value: 'guildUpdate' },
			{ name: 'Emoji Update/Create/Delete', value: 'emojiUpdate' },
			{ name: 'Invite Update/Create/Delete', value: 'inviteUpdate' },
			{ name: 'Thread Update/Create/Delete', value: 'threadUpdate' },
			{ name: 'Member Update/Create/Delete', value: 'memberUpdate' },
			{ name: 'Channel Update/Create/Delete', value: 'channelUpdate' },
			{ name: 'Sticker Update/Create/Delete', value: 'stickerUpdate' },
			{ name: 'Webhook Update/Create/Delete', value: 'webhookUpdate' },
			{ name: 'Auto-Moderation Update/Create/Delete', value: 'autoModeration' },
			{ name: 'Integration Update', value: 'integrationUpdate' },
			{ name: 'Command Permissions Update', value: 'commandPermission' },
			{ name: 'Stage Instance Update', value: 'stageInstanceUpdate' },
			{ name: 'Guild Schedule Update', value: 'guildScheduledUpdate' }
			).setRequired(true))
			.addBooleanOption((option) => option.setName('choice').setDescription('Select a boolean').setRequired(true))*/,
	)
	.addSubcommand((subcommand) =>
		subcommand
			.setName('channels')
			.setDescription('Set all your channels for logging purposes')
			.addStringOption((option) => option.setName('channels').setDescription('Select your channels').addChoices({ name: 'Welcome Channel', value: 'welcomechannel' }, { name: 'Mod Log', value: 'modlog' }).setRequired(true))
			.addChannelOption((option) => option.setName('channel').setDescription('Select a channel.').setRequired(true)),
	);

export const run: SlashCommand['run'] = async (interaction: ChatInputCommandInteraction<'cached'>): Promise<any> => {
	/*const events = interaction.options.getString('events');
	const channels = interaction.options.getString('channels');
	const choices = interaction.options.getBoolean('choice');
	const chan = interaction.options.getChannel('channel');*/

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
		
		const row = new ActionRowBuilder<StringSelectMenuBuilder>()
		.addComponents(new StringSelectMenuBuilder()
				.setCustomId('selectevents')
				.setPlaceholder('Nothing selected')
				.setMaxValues(17)
				.addOptions([
					{
						label: 'Anti-raid',
						description: 'This is a description',
						value: 'first_option',
					},
					{
						label: 'Bot',
						description: 'This is also a description',
						value: 'second_option',
					},
					{
						label: 'Roles',
						description: 'This is a description as well',
						value: 'third_option',
					},
					{
						label: 'Guild',
						description: 'This is a description',
						value: 'fourth_option',
					},
					{
						label: 'Emojis',
						description: 'This is a description',
						value: 'fifth_option',
					},
					{
						label: 'Invites',
						description: 'This is a description',
						value: 'sixth_option',
					},
					{
						label: 'Threads',
						description: 'This is a description',
						value: 'seventh_option',
					},
					{
						label: 'Members',
						description: 'This is a description',
						value: 'eight_option',
					},
					{
						label: 'Messages',
						description: 'This is a description',
						value: 'ninth_option',
					},
					{
						label: 'Channels',
						description: 'This is a description',
						value: 'tenth_option',
					},
					{
						label: 'Stickers',
						description: 'This is a description',
						value: 'eleventh_option',
					},
					{
						label: 'Webhooks',
						description: 'This is a description',
						value: 'twelfth_option',
					},
					{
						label: 'Auto-Moderation',
						description: 'This is a description',
						value: 'thirteenth_option',
					},
					{
						label: 'Integrations',
						description: 'This is a description',
						value: 'fourteenth_option',
					},
					{
						label: 'Command permissions',
						description: 'This is a description',
						value: 'fifteenth_option',
					},
					{
						label: 'Stage Instances',
						description: 'This is a description',
						value: 'seventeenth_option',
					},
					{
						label: 'Scheduled Events',
						description: 'This is a description',
						value: 'eighteenth_option',
					},
				]),)
				await interaction.channel?.send({components:[row]})



	}
	/*if (interaction.options.getSubcommand() === 'channels') {
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
	}*/
};
