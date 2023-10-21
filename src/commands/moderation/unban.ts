import { UnbanCommand } from '#slashyInformations/index.js';
import { checkBotPermission } from '#utils/index.js';

import { Command } from '@yuudachi/framework';
import type {
  ArgsParam, InteractionParam, LocaleParam,
} from '@yuudachi/framework/types';

export default class extends Command<typeof UnbanCommand> {
	public override async chatInput(
		interaction: InteractionParam,
		args: ArgsParam<typeof UnbanCommand>,
		locale: LocaleParam,
	): Promise<void> {
		if(!checkBotPermission(interaction.guild , "BanMembers")){
			await interaction.reply({content:"no permission"})
		}
		interaction.reply("nope")
	}}