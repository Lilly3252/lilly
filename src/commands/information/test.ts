import type { SlashCommand } from '#type/index.js';
import { ChatInputCommandInteraction, SlashCommandBuilder } from 'discord.js';

//import {botPermissionDenied} from '../../structures/constants/constants.js';
//import { lillyColors } from '#constants/colors.js';

export const slashy: SlashCommand['slashy'] = new SlashCommandBuilder().setName('testing').setDescription('testing.');

export const run: SlashCommand['run'] = async (interaction: ChatInputCommandInteraction<'cached'>): Promise<void> => {
	
};
