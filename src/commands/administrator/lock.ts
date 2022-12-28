/* eslint-disable @typescript-eslint/no-unused-vars */
import type { ChatInputCommandInteraction } from 'discord.js';
import type { SlashCommand } from '../../structures/@types/index.js';
import { PermissionsBitField, SlashCommandBuilder } from 'discord.js';
import { botPermissionDenied, successful } from '../../structures/constants/constants.js';

export const slashy: SlashCommand['slashy'] = new SlashCommandBuilder()
	.setName('lock')
	.setDescription('Lock a channel')
	.addBooleanOption((option) => option.setName('choice').setDescription('Select a boolean').setRequired(true))
	.setDefaultMemberPermissions(PermissionsBitField.Flags.ManageChannels);

export const run: SlashCommand['run'] = async (interaction: ChatInputCommandInteraction<'cached'>): Promise<any> => {
	if (!interaction.guild.members.me?.permissions.has(PermissionsBitField.Flags.ManageChannels)) {
		return interaction.reply({ content: botPermissionDenied('ManageChannels'), ephemeral: true });
	}
	const role = interaction.guild.roles.everyone;
	const lockChoice = interaction.options.getBoolean('choice');

	if (lockChoice === true) {
		role.permissions.remove('SendMessages');
		return interaction.reply({ content: successful.lockChannel });
	} else {
		role.permissions.add('SendMessages');
	}
	return interaction.reply({ content: successful.unlockChannel });
};
