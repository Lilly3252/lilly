import blacklistUser from '#database/blacklistUser.js';
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import type { ContextCommand, event, ModalCommand, SelectMenu, SlashCommand } from '#type/index.js';
import type { AutocompleteInteraction, ChatInputCommandInteraction, ContextMenuCommandInteraction, Interaction, MessageComponentInteraction, ModalSubmitInteraction } from 'discord.js';

export const name: event['name'] = 'interactionCreate';
export const once: event['once'] = false;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const run: event['run'] = async (interaction: Interaction<'cached'>): Promise<any> => {
	const blockedUsers = await blacklistUser.findOne({ guildID: interaction.guild.id });
	if (blockedUsers?.ID.includes(blockedUsers.ID)) return;

	if (interaction.isChatInputCommand() || interaction.isContextMenuCommand()) {
		return handleCommand(interaction);
	}

	if (interaction.isAutocomplete()) {
		return handleAutocomplete(interaction);
	}

	if (interaction.isModalSubmit()) {
		return handleModal(interaction);
	}
	
	if(interaction.isStringSelectMenu()){
		return handleStringMenu(interaction)
	}
};
const handleStringMenu = async(interaction: MessageComponentInteraction<"cached">): Promise<any> =>{
try{
	if(interaction.isStringSelectMenu()){
		const selectMenuCommand = interaction.client.selectMenu.get(interaction.customId) as SelectMenu
		//if(selectMenuCommand){
			//selectMenuCommand.run(interaction)
			//}
			console.log(selectMenuCommand)
	}
	if (interaction.isButton()) {
		console.log(interaction);
	}
}catch(err:unknown){
	return interaction.reply("Cannot find the select menu..")
}

}

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
		return console.error(err);
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
		const modal = interaction.client.modals.get(interaction.customId) as ModalCommand;
		if (modal) {
			await modal.run(interaction);
		}
	} catch (err: unknown) {
		return interaction.reply('Cannot find that modal...');
	}
};
