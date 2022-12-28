import { SlashCommandBuilder } from '@discordjs/builders';
import type { ChatInputCommandInteraction } from 'discord.js';
import type { SlashCommand } from 'src/structures/@types/index.js';
import jokes from '../../Structures/JSONs/funCommands/yo-mama.json' assert { type: 'json' };

export const slashy: SlashCommand['slashy'] = new SlashCommandBuilder().setName('yo-mama').setDescription('tells you a yo-mama insult.');

export const run: SlashCommand['run'] = async (interaction: ChatInputCommandInteraction<'cached'>): Promise<any> => {
	return  interaction.reply(`${jokes[Math.floor(Math.random() * jokes.length)]}`);
};
