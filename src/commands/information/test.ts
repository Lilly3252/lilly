import { ChatInputCommandInteraction, SlashCommandBuilder } from 'discord.js';
import type { SlashCommand } from '#type/index.js';
//import {botPermissionDenied} from '../../structures/constants/constants.js';

export const slashy: SlashCommand['slashy'] = new SlashCommandBuilder()
	.setName('testing')
	.setDescription('testing.')
	
export const run: SlashCommand['run'] = async (interaction: ChatInputCommandInteraction<'cached'>): Promise<any> => {
	
//const fetchlink = (await fetch("https://ffxiv.consolegameswiki.com/wiki/Carpenter_Tools").then(async (x) => {
	//return await x.json();
//}))
	console.log(interaction)
	
};
