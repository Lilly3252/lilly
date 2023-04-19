//import emoji from "../../structures/JSONs/emoji.json" assert {type : "json"};
import { successful } from '#constants/constants.js';
import type { SlashCommand } from '#type/index.js';
import { ChatInputCommandInteraction, SlashCommandBuilder } from 'discord.js';

export const slashy: SlashCommand['slashy'] = new SlashCommandBuilder().setName('ping').setDescription('pong.');

export const run: SlashCommand['run'] = async (interaction: ChatInputCommandInteraction<'cached'>): Promise<any> => {
	const msg = await interaction.reply({
		content: 'Pinging...',
		fetchReply: true,
	});

	const latency = msg.createdTimestamp - interaction.createdTimestamp;
	const choices = ['Is this really my ping?', "Is this okay? I can't look!", "I hope it isn't bad!"];
	const response = choices[Math.floor(Math.random() * choices.length)];

	interaction.editReply({
		content: successful.ping(latency, response, interaction),
	});
};
