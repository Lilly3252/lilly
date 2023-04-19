import type { ContextMenuCommandBuilder, ContextMenuCommandInteraction } from 'discord.js';

export interface ContextCommand {
	/**
	 * The data as ContextCommand
	 */
	rightClickyBoi: ContextMenuCommandBuilder;
	/**
	 * If the command is owner only.
	 */
	ownerOnly?: boolean;

	/**
	 * The method this command executes if called.
	 *
	 * @param {ContextMenuCommandInteraction} interaction The ContextMenuInteraction object from the interactionCreate event or collector.
	 */
	run(interaction: ContextMenuCommandInteraction): Promise<any>;
}
