import { KickCommand } from '#slashyInformations/index.js';
import { checkBotPermission } from '#utils/index.js';

import { Command } from '@yuudachi/framework';
import type {
  ArgsParam, InteractionParam, LocaleParam,
} from '@yuudachi/framework/types';

export default class extends Command<typeof KickCommand> {
	public override async chatInput(
		interaction: InteractionParam,
		args: ArgsParam<typeof KickCommand>,
		locale: LocaleParam,
	): Promise<void> {
		if(!checkBotPermission(interaction.guild , "KickMembers")){
			 await interaction.reply({content:"no permission"})
			 return
		}
		interaction.reply("nope")
	}}