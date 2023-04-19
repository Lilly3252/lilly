import { botPermissionDenied, errors, successful } from '#constants/constants.js';
import type { SlashCommand } from '#type/index.js';
/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { ChatInputCommandInteraction, PermissionsBitField, SlashCommandBuilder } from 'discord.js';

export const slashy: SlashCommand['slashy'] = new SlashCommandBuilder()
	.setName('purge')
	.setDescription('purge messages in a channel')
	.addNumberOption((option) => option.setName('number').setDescription('number of messages from 1-99').setRequired(true))
	.setDefaultMemberPermissions(PermissionsBitField.Flags.ManageMessages);

export const run: SlashCommand['run'] = async (interaction: ChatInputCommandInteraction<'cached'>): Promise<any> => {
	if (!interaction.guild.members.me?.permissions.has(PermissionsBitField.Flags.ManageMessages)) {
		return interaction.reply({ content: botPermissionDenied('ManageMessages'), ephemeral: true });
	}
	const count = interaction.options.getNumber('number')!;
	if (count > 100) return interaction.reply({ content: errors.validAmount, ephemeral: true });
	try {
		await interaction.channel?.bulkDelete(count).then(() => {
			interaction.reply({ content: successful.deleted(count) });
		});
	} catch {
		return interaction.reply({ content: errors.messageDeleted, ephemeral: true });
	}
};
