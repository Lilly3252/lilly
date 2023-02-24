/* eslint-disable @typescript-eslint/no-non-null-assertion */
import type { SlashCommand } from '#type/index.js';
import { PermissionsBitField, SlashCommandBuilder , ChatInputCommandInteraction, RESTJSONErrorCodes } from 'discord.js';
import { botPermissionDenied, errors } from '#constants/constants.js';

export const slashy: SlashCommand['slashy'] = new SlashCommandBuilder()
	.setName('say')
	.setDescription('say something.')
	.addStringOption((option) => option.setName('message').setDescription('message to say'))
	.addChannelOption((option) => option.setName('channel').setDescription('select a channel.'))
	.setDefaultMemberPermissions(PermissionsBitField.Flags.ManageMessages);

export const run: SlashCommand['run'] = async (interaction: ChatInputCommandInteraction<'cached'>): Promise<any> => {
	if (!interaction.guild.members.me?.permissions.has(PermissionsBitField.Flags.ManageMessages)) {
		return  interaction.reply({ content: botPermissionDenied("ManageMessages"), ephemeral: true });
	}
	const message = interaction.options.getString('message')!;
	const d = interaction.options.getChannel('channel')!;
	if (d?.isTextBased()) {
		d.send(message).catch((error) => {
			if (error.code === RESTJSONErrorCodes.InvalidFormBodyOrContentType) {
				interaction.reply({content: errors.textTooLong , ephemeral:true});
			}
		});
	} else {
		return  interaction.reply({content:errors.notTextChan , ephemeral: true});
	}
};
