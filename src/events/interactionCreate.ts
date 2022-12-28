/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import type { event, ContextCommand, ModalCommand, SlashCommand } from '../structures/@types/index.js';
import type { Interaction, AutocompleteInteraction, ModalSubmitInteraction, ChatInputCommandInteraction, ContextMenuCommandInteraction } from 'discord.js';
import blacklistUser from './../database/blacklistUser.js';

export const name: event['name'] = 'interactionCreate';
export const once: event['once'] = false;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const run: event['run'] = async (interaction: Interaction<'cached'>): Promise<any> => {
	const blockedUsers = await blacklistUser.findOne({ guildID: interaction.guild.id });
	if (blockedUsers?.ID.includes(blockedUsers.ID)) return;

	if (interaction.isChatInputCommand() || interaction.isContextMenuCommand()) {
		return  handleCommand(interaction);
	}

	if (interaction.isAutocomplete()) {
		return  handleAutocomplete(interaction);
	}

	if (interaction.isModalSubmit()) {
		return  handleModal(interaction);
	}
	if (interaction.isButton()) {
		console.log(interaction);
	}
};
const handleCommand = async (interaction: ChatInputCommandInteraction | ContextMenuCommandInteraction): Promise<any> => {
	try {
		if (interaction.isChatInputCommand()) {
			const command = interaction.client.commands.get(interaction.commandName) as SlashCommand;
			if (command) {
				await command.run(interaction);
			}
		}
		if (interaction.isContextMenuCommand()) {
			const command = interaction.client.commands.get(interaction.commandName) as ContextCommand;
			if (command) {
				await command.run(interaction);
			}
		}
	} catch (err: any) {
		return  console.error(err);
	}
};

const handleAutocomplete = async (interaction: AutocompleteInteraction): Promise<any> => {
	try {
		const command = interaction.client.commands.get(interaction.commandName) as SlashCommand | undefined;
		if (command) {
			await command.run(interaction);
		}
	} catch (err: unknown) {
		return interaction.respond([]);
	}
};
const handleModal = async (interaction: ModalSubmitInteraction): Promise<any> => {
	try {
		const modal = interaction.client.modals.get(interaction.customId) as ModalCommand | undefined;
		if (modal) {
			await modal.run(interaction);
		}
	} catch (err: unknown) {
		return  interaction.reply('Cannot find that modal...');
	}
};
