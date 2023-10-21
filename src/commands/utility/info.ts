import { InfoCommand } from '#slashyInformations/index.js';

import { Command } from '@yuudachi/framework';
import type {
  ArgsParam, InteractionParam, LocaleParam,
} from '@yuudachi/framework/types';

export default class extends Command<typeof InfoCommand> {
	public override async chatInput(
		interaction: InteractionParam,
		args: ArgsParam<typeof InfoCommand>,
		locale: LocaleParam,
	): Promise<void> {

		interaction.reply("nope")
	}}