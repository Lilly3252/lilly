import type { SlashCommand } from '#type/index.js';
/* eslint-disable @typescript-eslint/no-unused-vars */
import { ChatInputCommandInteraction, PermissionsBitField, SlashCommandBuilder } from 'discord.js';

export const slashy: SlashCommand['slashy'] = new SlashCommandBuilder()
	.setName('unmute')
	.setDescription('unmute a member.')
	.addMentionableOption((option) => option.setName('member').setDescription('Mention someone').setRequired(true))
	.setDefaultMemberPermissions(PermissionsBitField.Flags.MuteMembers);

export const run: SlashCommand['run'] = async (interaction: ChatInputCommandInteraction<'cached'>): Promise<any> => {
	await interaction.reply({ content: 'This command is not finished yet.', ephemeral: true });
};
