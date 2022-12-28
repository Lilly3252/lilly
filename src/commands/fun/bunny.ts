import { ChatInputCommandInteraction, SlashCommandBuilder } from 'discord.js';
import type { SlashCommand } from 'src/structures/@types/index.js';
import bunny from '../../Structures/JSONs/funCommands/bunny-fact.json' assert { type: 'json' };

export const slashy: SlashCommand['slashy'] = new SlashCommandBuilder().setName('bunny').setDescription('tells you a bunny fact.');

export const run: SlashCommand['run'] = async (interaction: ChatInputCommandInteraction<'cached'>): Promise<any> => {
	return  interaction.reply(`${bunny[Math.floor(Math.random() * bunny.length)]}`);
};
