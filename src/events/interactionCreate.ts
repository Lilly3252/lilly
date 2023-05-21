import { selectMenuEvents } from '#constants/constants.js';
import blacklistUser from '#database/blacklistUser.js';
import settingSchema from '#database/guildSettings.js';
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import type { ContextCommand, event, ModalCommand, SlashCommand } from '#type/index.js';
import type { AnySelectMenuInteraction, AutocompleteInteraction, Interaction, ModalSubmitInteraction } from 'discord.js';

export const name: event['name'] = 'interactionCreate';
export const once: event['once'] = false;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const run: event['run'] = async (interaction: Interaction<'cached'>): Promise<any> => {
	const blockedUsers = await blacklistUser.findOne({ guildID: interaction.guild.id });
	if (blockedUsers?.ID.includes(blockedUsers.ID)) return;

	if (interaction.isChatInputCommand() || interaction.isContextMenuCommand()) {
		return handleCommand(interaction);
	}
	if (interaction.isAnySelectMenu()) {
		return handleSelect(interaction);
	}
	if (interaction.isAutocomplete()) {
		return handleAutocomplete(interaction);
	}

	if (interaction.isModalSubmit()) {
		return handleModal(interaction);
	}
};

async function handleSelect(interaction: AnySelectMenuInteraction): Promise<any> {
	try {
		if (interaction.isStringSelectMenu()) {
			const values = interaction.values;
			function getPropsFromEnums<T extends Record<string, unknown>>(en: T): Array<keyof T> {
				const values = Object.values(en) as Array<keyof T>;
				return values.slice(0, Math.floor(values.length / 2));
			}
			type enumType = Omit<{ -readonly [key in keyof typeof selectMenuEvents]?: boolean }, number>
			const resultObj: enumType = {};
		 getPropsFromEnums(selectMenuEvents).forEach((a) => (resultObj[a] = values.includes(a)));
			const guild_db = await settingSchema.findOne({ guildID: interaction.guild?.id })
			await guild_db?.updateOne({$set:resultObj})
		}
	} catch (err: any) {
		return console.error(err);
	}
}
async function handleCommand(interaction: Interaction): Promise<any> {
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
}
async function handleAutocomplete(interaction: AutocompleteInteraction): Promise<any> {
	try {
		const command = interaction.client.commands.get(interaction.commandName) as SlashCommand | undefined;
		if (command) {
			await command.run(interaction);
		}
	} catch (err: unknown) {
		return interaction.respond([]);
	}
}
async function handleModal(interaction: ModalSubmitInteraction): Promise<any> {
	try {
		const modal = interaction.client.modals.get(interaction.customId) as ModalCommand;
		if (modal) {
			await modal.run(interaction);
		}
	} catch (err: unknown) {
		return interaction.reply('Cannot find that modal...');
	}
}
