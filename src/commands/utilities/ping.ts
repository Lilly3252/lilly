import type { ChatInputCommandInteraction } from 'discord.js';
import type { SlashCommand } from '../../structures/index.js';
import { SlashCommandBuilder } from 'discord.js';

export const slashy: SlashCommand['slashy'] = new SlashCommandBuilder().setName('ping').setDescription('pong.');

export const run: SlashCommand['run'] = async (interaction: ChatInputCommandInteraction<'cached'>): Promise<void> => {
	const msg = await interaction.reply({
		content: 'Pinging...',
		fetchReply: true,
	});

	const latency = msg.createdTimestamp - interaction.createdTimestamp;
	const choices = ['Is this really my ping?', "Is this okay? I can't look!", "I hope it isn't bad!"];
	const response = choices[Math.floor(Math.random() * choices.length)];

	interaction.editReply({
		content: `${response} - Bot Latency: \`${latency}ms\` , API Latency: \`${Math.round(
			interaction.client.ws.ping,
		)}ms\``,
	});
};
