import { Client, Events } from "discord.js";
import { inject, injectable } from "tsyringe";
import { getLanguage } from "#utils/index.js";
import type { Command } from "@yuudachi/framework";
import { kCommands, logger, transformApplicationInteraction } from "@yuudachi/framework";
import type { Event } from "@yuudachi/framework/types";
import { RawCommandParam } from "#utils/types/functiontypes.js";

@injectable()
export default class implements Event {
	public name = "Interaction handling";

	public event = Events.InteractionCreate as const;

	public constructor(
		public readonly client: Client<true>,
		@inject(kCommands) public readonly commands: Map<string, Command>
	) {}

	public async execute(): Promise<void> {
		this.client.on(this.event, async (interaction:RawCommandParam) => {
			const locale = "en-US";
			const effectiveLocale = locale ?? interaction.locale;
		

			if (interaction.isChatInputCommand()) {
				await interaction.deferReply({ ephemeral: interaction.options.getBoolean("hide") ?? true });
				const command = this.commands.get(interaction.commandName);

				logger.info(
					{ command: { name: interaction.commandName, type: interaction.type }, userId: interaction.user.id },
					`Executing ${interaction.isAutocomplete() ? "autocomplete" : "chatInput command"} ${interaction.commandName}`
				);
				const defaultLanguage = (interaction.options.getBoolean("hide") ?? true) ? undefined : "en-US";
				const locale = getLanguage(interaction, defaultLanguage);
				await command?.chatInput(interaction, transformApplicationInteraction(interaction.options.data), locale!);
			}

			if (interaction.isAutocomplete()) {
				try {
					const command = this.commands.get(interaction.commandName);
					if (command) {
						await command.autocomplete(interaction, transformApplicationInteraction(interaction.options.data), effectiveLocale);
					}
				} catch {
					return interaction.respond([]);
				}
			}
		});
	}
}
