import { ChatInputCommandInteraction, SlashCommandBuilder } from 'discord.js';
import type { SlashCommand } from './../../structures/@types/index.js';
//import {botPermissionDenied} from '../../structures/constants/constants.js';

export const slashy: SlashCommand['slashy'] = new SlashCommandBuilder()
	.setName('testing')
	.setDescription('testing.')
	
export const run: SlashCommand['run'] = async (interaction: ChatInputCommandInteraction<'cached'>): Promise<any> => {
	

	console.log(interaction.member.voice.serverDeaf)
	
};