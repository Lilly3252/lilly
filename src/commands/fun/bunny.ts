import { ChatInputCommandInteraction, SlashCommandBuilder } from 'discord.js';
import type { SlashCommand } from 'src/structures/index.js';
import bunny from '../../Structures/JSONs/bunny-fact.json' assert { type: 'json' };

export const slashy: SlashCommand['slashy'] = new SlashCommandBuilder()
	.setName('bunny')
	.setDescription('tells you a bunny fact.');

export const run: SlashCommand['run'] = async (interaction: ChatInputCommandInteraction<'cached'>): Promise<void> => {
	return void interaction.reply(`${bunny[Math.floor(Math.random() * bunny.length)]}`);
};
