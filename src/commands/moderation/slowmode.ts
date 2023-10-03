import type { SlowmodeCommand } from '#slashyInformations/index.js';
import i18next from 'i18next';

import { Command } from '@yuudachi/framework';
import type {
  ArgsParam, InteractionParam, LocaleParam,
} from '@yuudachi/framework/types';

export default class extends Command<typeof SlowmodeCommand> {
	public override async chatInput(
		interaction: InteractionParam,
		args: ArgsParam<typeof SlowmodeCommand>,
		locale: LocaleParam,
	): Promise<void> {
		await interaction.deferReply({ ephemeral: args.hide ?? true });
		if(!Number.isInteger(args.time)){
            await interaction.editReply({})
        }
		await interaction.editReply({
			content: i18next.t("command.mod.slowmode.success", { lng: locale }),
		});
	}
}