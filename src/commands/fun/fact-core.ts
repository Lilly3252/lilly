import { SlashCommandBuilder } from '@discordjs/builders';
import type { ChatInputCommandInteraction } from 'discord.js';
import type { SlashCommand } from 'src/structures/index.js';
import facts from '../../Structures/JSONs/fact-core.json' assert { type: 'json' };

export const slashy: SlashCommand['slashy'] = new SlashCommandBuilder().setName('fact-core').setDescription('....');

export const run: SlashCommand['run'] = async (interaction: ChatInputCommandInteraction<'cached'>): Promise<void> => {
	return void interaction.reply(`${facts[Math.floor(Math.random() * facts.length)]}`);
};
