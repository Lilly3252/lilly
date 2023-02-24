export interface ContextCommand {
	/**
	 * The data as ContextCommand
	 */
	//context: ContextMenuCommandBuilder;
	rightClickyBoi: ContextMenuCommandBuilder;
	/**
	 * If the command is owner only.
	 */
	ownerOnly?: boolean;

	/**
	 * The method this command executes if called.
	 *
	 * @param {ContextMenuInteraction} interaction The ContextMenuInteraction object from the interactionCreate event or collector.
	 */
	run(interaction: ContextMenuCommandInteraction): Promise<any>;
}
