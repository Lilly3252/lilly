import { SlashCommandBuilder } from '@discordjs/builders';
import type { ChatInputCommandInteraction } from 'discord.js';
import type { SlashCommand } from 'src/structures/index.js';
import dog from '../../Structures/JSONs/dog-fact.json' assert { type: 'json' };

export const slashy: SlashCommand['slashy'] = new SlashCommandBuilder()
	.setName('dog')
	.setDescription('tells you a dog fact.');

export const run: SlashCommand['run'] = async (interaction: ChatInputCommandInteraction<'cached'>): Promise<void> => {
	return void interaction.reply(`${dog[Math.floor(Math.random() * dog.length)]}`);
};
