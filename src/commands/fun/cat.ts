import { ChatInputCommandInteraction, SlashCommandBuilder } from 'discord.js';
import type { SlashCommand } from 'src/structures/@types/index.js';
import cat from '../../Structures/JSONs/funCommands/cat-fact.json' assert { type: 'json' };

export const slashy: SlashCommand['slashy'] = new SlashCommandBuilder().setName('cat').setDescription('tells you a cat fact.');

export const run: SlashCommand['run'] = async (interaction: ChatInputCommandInteraction<'cached'>): Promise<any> => {
	return  interaction.reply(`${cat[Math.floor(Math.random() * cat.length)]}`);
};
