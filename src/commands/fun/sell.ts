import { ChatInputCommandInteraction, SlashCommandBuilder } from 'discord.js';
import type { SlashCommand } from '#type/index.js';
//import {botPermissionDenied} from '../../structures/constants/constants.js';

export const slashy: SlashCommand['slashy'] = new SlashCommandBuilder()
	.setName('sell')
	.setDescription('testing.')
	
export const run: SlashCommand['run'] = async (interaction: ChatInputCommandInteraction<'cached'>): Promise<any> => {
	console.log(interaction.guild.channels.cache)
};