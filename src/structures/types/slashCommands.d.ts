export interface SlashCommand {
	/**
	 * Data as SlashCommandBuilder.
	 */
	slashy:
		| Omit<SlashCommandBuilder, 'addSubcommand' | 'addSubcommandGroup'>
		| SlashCommandSubcommandsOnlyBuilder;
	/**
	 *
	 * @param {CommandInteraction} interaction  The CommandInteraction object from the interactionCreate event or collector
	 */
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	run(interaction: ChatInputCommandInteraction | AutocompleteInteraction): Promise<any>;
}
