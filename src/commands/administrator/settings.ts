/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-unused-vars */
import type { ChatInputCommandInteraction /*PermissionFlagsBits*/ } from 'discord.js';
import type { SlashCommand } from '../../structures/@types/index.js';
import { PermissionsBitField, SlashCommandBuilder } from 'discord.js';
import settingSchema from './../../database/guildSettings.js';
import * as Embed from '../../structures/messageEmbeds.js';
//import { botPermissionDenied, errors, successful } from './../../structures/constants/test.js';

export const slashy: SlashCommand['slashy'] = new SlashCommandBuilder()
	.setName('settings')
	.setDescription('show or add settings')
	.setDefaultMemberPermissions(PermissionsBitField.Flags.Administrator)
	.addSubcommand((subcommand) => subcommand.setName('showsettings').setDescription('Show settings you have'))
	.addSubcommand((subcommand) =>
		subcommand
			.setName('anti-raid')
			.setDescription('set anti-raid ON or OFF')
			.addBooleanOption((option) => option.setName('choice').setDescription('Select a boolean')),
	)
	.addSubcommand((subcommand) =>
		subcommand
			.setName('welcomechannel')
			.setDescription('set the welcome channel')
			.addChannelOption((option) => option.setName('channel').setDescription('Select a channel.').setRequired(true)),
	)
	.addSubcommand((subcommand) =>
		subcommand
			.setName('modlog')
			.setDescription('set the Mod Log channel')
			.addChannelOption((option) => option.setName('channel').setDescription('Select a channel.').setRequired(true)),
	)
	.addSubcommand((subcommand) =>
		subcommand
			.setName('messagedelete')
			.setDescription('set the DeleteMessages event ON or OFF')
			.addBooleanOption((option) => option.setName('choice').setDescription('Select a boolean')),
	)
	.addSubcommand((subcommand) =>
		subcommand
			.setName('messagedeletebulk')
			.setDescription('set the messageDeleteBulk event ON or OFF')
			.addBooleanOption((option) => option.setName('choice').setDescription('Select a boolean')),
	)
	.addSubcommand((subcommand) =>
		subcommand
			.setName('messageupdates')
			.setDescription('set the MessageUpdates event ON or OFF')
			.addBooleanOption((option) => option.setName('choice').setDescription('Select a boolean')),
	);

export const run: SlashCommand['run'] = async (interaction: ChatInputCommandInteraction<'cached'>): Promise<any> => {
	const guild_db = await settingSchema.findOne({ guildID: interaction.guild.id }).then(async (guild) => {
		if (!guild) {
			await settingSchema.create({
				data: {
					guildID: interaction.guild.id,
					name: interaction.guild.name,
					logChannelID: null,
					welcomeChannelID: null,
					antiRaidMode: false,
					messageDeleteMode: false,
					messageBulkDeleteMode: false,
					messageUpdateMode: false,
				},
			});
		}
		return settingSchema.findOneAndUpdate({ guildID: interaction.guild.id });
	});
	if (interaction.options.getSubcommand() === 'showsettings') {
		interaction.reply({
			embeds: [Embed.settingEmbed(interaction, guild_db!)],
			ephemeral: true,
		});
		console.log("i've been run.");
	}
	//**SUB COMMANDS */
	if (interaction.options.getSubcommand() === 'anti-raid') {
		const choices = interaction.options.getBoolean('choice');
		if (choices === true) {
			await guild_db?.updateOne({ antiRaidMode: true }),
				interaction.reply({
					content: '\u2705 AntiRaid Mode enable.',
					ephemeral: true,
				});
		} else {
			await guild_db?.updateOne({ antiRaidMode: false }),
				interaction.reply({
					content: '\u274C AntiRaid Mode disable.',
					ephemeral: true,
				});
		}
	}
	// MessageUpdate event
	if (interaction.options.getSubcommand() === 'messageupdates') {
		const choices = interaction.options.getBoolean('choice');
		if (choices === true) {
			await guild_db?.updateOne({ messageUpdateMode: true }),
				interaction.reply({
					content: '\u2705 MessageUpdate has been enable.',
					ephemeral: true,
				});
		} else {
			await guild_db?.updateOne({ messageUpdateMode: false }),
				interaction.reply({
					content: '\u274C MessageUpdate has been disable.',
					ephemeral: true,
				});
		}
	}
	//MessageDelete Event
	if (interaction.options.getSubcommand() === 'messagedelete') {
		const choices = interaction.options.getBoolean('choice');
		if (choices === true) {
			await guild_db?.updateOne({ messageDeleteMode: true }),
				interaction.reply({
					content: '\u2705 MessageDelete has been enable.',
					ephemeral: true,
				});
		} else {
			await guild_db?.updateOne({ messageDeleteMode: false }),
				interaction.reply({
					content: '\u274C MessageDelete has been disable.',
					ephemeral: true,
				});
		}
	}
	//MessageDeleteBulk Event
	if (interaction.options.getSubcommand() === 'messagedeletebulk') {
		const choices = interaction.options.getBoolean('choice');
		if (choices === true) {
			await guild_db?.updateOne({ messageBulkDeleteMode: true }),
				interaction.reply({
					content: '\u2705 messageDeleteBulk has been enable.',
					ephemeral: true,
				});
		} else {
			await guild_db?.updateOne({ messageBulkDeleteMode: false }),
				interaction.reply({
					content: '\u274C MessageDeleteBulk has been disable.',
					ephemeral: true,
				});
		}
	}
	//WelcomeChannel Setup
	if (interaction.options.getSubcommand() === 'welcomechannel') {
		const e = interaction.options.getChannel('channel')!;
		if (e.isTextBased()) {
			await guild_db?.updateOne({ welcomeChannelID: e.id }).then(() =>
				interaction.reply({
					content: `✅ Welcome Channel has been set to ${e}`,
					ephemeral: true,
				}),
			);
		} else {
			await guild_db?.updateOne({ welcomeChannelID: null });
			return  interaction.reply({
				content: `✅ Welcome Channel has been removed`,
				ephemeral: true,
			});
		}
	}
	//ModLog channelID setup
	if (interaction.options.getSubcommand() === 'modlog') {
		const f = interaction.options.getChannel('channel')!;
		if (f.isTextBased()) {
			await guild_db?.updateOne({ logChannelID: f.id }).then(() =>
				interaction.reply({
					content: `✅ ModLog Channel has been set to ${f}`,
					ephemeral: true,
				}),
			);
		} else {
			await guild_db?.updateOne({ logChannelID: null });
			return  interaction.reply({
				content: `✅ ModLog Channel has been removed`,
				ephemeral: true,
			});
		}
	}
};
