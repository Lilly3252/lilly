import { SettingCommand } from '#slashyInformations/index.js';
import { checkMemberPermission } from '#utils/index.js';

import { Command } from '@yuudachi/framework';
import type {
  ArgsParam, InteractionParam, LocaleParam,
} from '@yuudachi/framework/types';

export default class extends Command<typeof SettingCommand> {
	public override async chatInput(
		interaction: InteractionParam,
		args: ArgsParam<typeof SettingCommand>,
		locale: LocaleParam,
	): Promise<void> {
		await interaction.deferReply({ ephemeral: args.hide ?? true });
		if (!checkMemberPermission(interaction.member , "Administrator")) {
			await interaction.editReply({content:"no permissions"});
			return
		  }
		  console.log(`${checkMemberPermission(interaction.member , "Administrator")}`)
		interaction.editReply("nope")
	}}