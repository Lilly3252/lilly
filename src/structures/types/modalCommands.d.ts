import type { ModalSubmitInteraction } from 'discord.js';

export interface ModalCommand {
	/**
	 * Custom id of the modal.
	 */
	customId: string;
	/**
	 * The method this command executes if called.
	 *
	 * @param {ModalSubmitInteraction} interaction The CommandInteraction object from the interactionCreate event or collector.
	 */
	run(interaction: ModalSubmitInteraction): Promise<any>;
}
