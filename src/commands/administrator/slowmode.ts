/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-non-null-assertion */

import type { SlashCommand } from '#type/index.js';
import { ChatInputCommandInteraction, PermissionsBitField, SlashCommandBuilder } from 'discord.js';
import { successful, botPermissionDenied, errors } from '#constants/constants.js';

export const slashy: SlashCommand['slashy'] = new SlashCommandBuilder()
	.setName('slowmode')
	.setDescription('slowmode a channel.')
	.addChannelOption((option) => option.setName('channel').setDescription('channel name').setRequired(true))
	.addNumberOption((option) => option.setName('number').setDescription('Enter a number').setRequired(true))
	.setDefaultMemberPermissions(PermissionsBitField.Flags.ManageChannels);

export const run: SlashCommand['run'] = async (interaction: ChatInputCommandInteraction<'cached'>): Promise<any> => {
	if (!interaction.guild.members.me?.permissions.has(PermissionsBitField.Flags.ManageChannels)) {
		return interaction.reply({ content: botPermissionDenied('ManageChannels'), ephemeral: true });
	}
	const channel = interaction.options.getChannel('channel')!;
	const time = interaction.options.getNumber('number')!;
	if (isNaN(time)) {
		interaction.reply({ content: errors.notNumber });
	} else {
		if (channel.isTextBased()) {
			await channel
				.setRateLimitPerUser(time)
				.then(() => {
					interaction.reply({ content: successful.slowmode(time), ephemeral: true });
				})
				.catch((a: any) => console.log(a));
		}
	}
};
