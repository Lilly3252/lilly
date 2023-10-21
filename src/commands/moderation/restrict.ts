import { RestrictCommand } from '#slashyInformations/index.js';
import { checkBotPermission } from '#utils/index.js';
import { GuildMember } from 'discord.js';

import { Command } from '@yuudachi/framework';
import type {
  ArgsParam, InteractionParam, LocaleParam,
} from '@yuudachi/framework/types';

export default class extends Command<typeof RestrictCommand> {
  public override async chatInput(
    interaction: InteractionParam,
    args: ArgsParam<typeof RestrictCommand>,
    locale: LocaleParam
  ): Promise<void> {
    const member = args.target as GuildMember;
    const reason = args.reason;
    const restriction = args.restriction;
	
	
    if (!checkBotPermission(interaction.guild , "ManageRoles")) {
      await interaction.reply({content:"no permissions"});
	  return
    }
    if (!member.moderatable || !member.manageable) {
      await interaction.reply({content:"No can do"});
    }

    switch (restriction) {
      case "embed": {
        break;
      }
      case "reaction": {
        break;
      }
      case "slash": {
        break;
      }
      case "voice": {
        break;
      }
    }
  }
}
