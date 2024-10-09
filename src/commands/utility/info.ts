import { InfoCommand } from "#slashyInformations/index.js";

import { Command } from "@yuudachi/framework";
import type { ArgsParam, InteractionParam, LocaleParam } from "@yuudachi/framework/types";
import { bot } from "./subCommands/info/bot.js";
import { channel } from "./subCommands/info/channels.js";
import { role } from "./subCommands/info/role.js";
import { server } from "./subCommands/info/server.js";
import { user } from "./subCommands/info/user.js";

export default class extends Command<typeof InfoCommand> {
	public override async chatInput(interaction: InteractionParam, args: ArgsParam<typeof InfoCommand>, locale: LocaleParam): Promise<void> {
		const subCommand = interaction.options.getSubcommand();

		switch (subCommand) {
			case "user": {
				await user(interaction, args.user, locale);
				break;
			}
			case "channel": {
				await channel(interaction, args.channel, locale);
				break;
			}
			case "role": {
				await role(interaction, args, locale);
				break;
			}
			case "bot": {
				await bot(interaction, args, locale);
				break;
			}
			case "server": {
				await server(interaction, args, locale);
				break;
			}
		}
	}
}
