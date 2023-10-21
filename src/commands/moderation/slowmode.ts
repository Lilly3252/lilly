import type { SlowmodeCommand } from '#slashyInformations/index.js';
import { checkBotPermission } from '#utils/index.js';
import i18next from 'i18next';

import { Command } from '@yuudachi/framework';
import type {
  ArgsParam, InteractionParam, LocaleParam,
} from '@yuudachi/framework/types';

export default class extends Command<typeof SlowmodeCommand> {
  public override async chatInput(
    interaction: InteractionParam,
    args: ArgsParam<typeof SlowmodeCommand>,
    locale: LocaleParam
  ): Promise<void> {

const channel = (args.channel ?? interaction.channel)

    await interaction.deferReply({ ephemeral: args.hide ?? true });
    if(!checkBotPermission(interaction.guild , "ManageChannels")){
      await interaction.reply({content:"no permission"})
    }
    if(channel.isTextBased()){
      await channel.setRateLimitPerUser(args.time).then(async () => {
        await interaction.editReply({
          content: i18next.t("command.mod.slowmode.success", { 
            channel: `${channel}`,
            time:`${args.time}`,
            lng: locale }),
        });
      });
    }  
    }
  }

