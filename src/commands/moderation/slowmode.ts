import type { SlowmodeCommand } from '#slashyInformations/index.js';
import i18next from 'i18next';
import { injectable } from 'tsyringe';

import { Command } from '@yuudachi/framework';
import type {
  ArgsParam, InteractionParam, LocaleParam,
} from '@yuudachi/framework/types';

@injectable()
export default class extends Command<typeof SlowmodeCommand> {
  public override async chatInput(
    interaction: InteractionParam,
    args: ArgsParam<typeof SlowmodeCommand>,
    locale: LocaleParam
  ): Promise<void> {
    await interaction.deferReply({ ephemeral: args.hide ?? true });
    if (!Number.isInteger(args.time)) {
      await interaction.editReply({});
      return;
    }
    if (args.channel.isTextBased()) {
      await args.channel.setRateLimitPerUser(args.time).then(async () => {
        await interaction.editReply({
          content: i18next.t("command.mod.slowmode.success", { lng: locale }),
        });
      });
    }
  }
}
