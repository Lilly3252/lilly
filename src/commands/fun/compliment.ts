import { SlashCommandBuilder } from '@discordjs/builders';
import type { ChatInputCommandInteraction } from 'discord.js';
import type { SlashCommand } from 'src/structures/@types/index.js';
import compliments from '../../Structures/JSONs/funCommands/compliment.json' assert { type: 'json' };

export const slashy: SlashCommand['slashy'] = new SlashCommandBuilder()
	.setName('compliment')
	.setDescription('compliment someone.')
	.addUserOption((option) => option.setName('target').setDescription('Select a user').setRequired(true));

export const run: SlashCommand['run'] = async (interaction: ChatInputCommandInteraction<'cached'>): Promise<any> => {
	const member = interaction.options.getMember('target');
	if (member) {
		return  interaction.reply(`${compliments[Math.floor(Math.random() * compliments.length)]}`);
	}
};
