import type { StringSelectMenuBuilder, StringSelectMenuInteraction } from 'discord.js';

export interface SelectMenu {
	/**
	 * Custom id of the select menu.
	 */
	customId: string;
	droppyBoi:StringSelectMenuBuilder
	/**
	 * The method this command executes if called.
	 *
	 * @param {StringSelectMenuInteraction} interaction The CommandInteraction object from the interactionCreate event or collector.
	 */
	run(interaction: StringSelectMenuInteraction): Promise<any>;
}