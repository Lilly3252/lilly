import { Precondition } from "@sapphire/framework";
import type { Message } from "discord.js";
import Guild from "../Database/Guild";
import SYSTEM from "../structure/messageSystem.json";
export class UserPrecondition extends Precondition {
  public async run(message: Message) {
    const guild_db = await Guild.findOne({
      guildID: message.guild?.id,
    });
    return message.member?.roles.cache.has(guild_db.moderatorRoleID)
      ? this.ok()
      : this.error({
          message: SYSTEM.ERROR.COMMANDS.MOD_ONLY,
          context: { silent: true },
        });
  }
}

declare module "@sapphire/framework" {
  interface Preconditions {
    ModOnly: never;
  }
}
