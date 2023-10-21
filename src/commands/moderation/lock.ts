import { LockCommand } from '#slashyInformations/index.js';
import { checkBotPermission } from '#utils/index.js';

import { Command } from '@yuudachi/framework';
import type {
  ArgsParam, InteractionParam, LocaleParam,
} from '@yuudachi/framework/types';

export default class extends Command<typeof LockCommand> {
	public override async chatInput(
		interaction: InteractionParam,
		args: ArgsParam<typeof LockCommand>,
		locale: LocaleParam,
	): Promise<void> {
		const role = interaction.guild.roles.everyone
		const lock = args.activate
		

if(!checkBotPermission(interaction.guild , "ManageChannels")){
	await interaction.reply({content:"no permission"})
	return
}
if(lock === true){
	role.permissions.remove("SendMessages")
	await interaction.reply({})
}else{
	role.permissions.add("SendMessages")
	await interaction.reply({})
}
	}
}