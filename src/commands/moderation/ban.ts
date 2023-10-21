import { BanCommand } from '#slashyInformations/index.js';
import { checkBotPermission } from '#utils/index.js';

import { Command } from '@yuudachi/framework';
import type {
  ArgsParam, InteractionParam, LocaleParam,
} from '@yuudachi/framework/types';

export default class extends Command<typeof BanCommand> {
	public override async chatInput(
		interaction: InteractionParam,
		args: ArgsParam<typeof BanCommand>,
		locale: LocaleParam,
	): Promise<void> {
		if(!checkBotPermission(interaction.guild , "BanMembers")){
			await interaction.reply({content:"no permission"})
			return
		}
		interaction.reply("nope")
	}}