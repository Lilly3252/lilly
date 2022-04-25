import { Precondition } from "@sapphire/framework";
import type { Message } from "discord.js";
import SYSTEM from "../structure/messageSystem.json";
import { Permissions } from "discord.js";

export class UserPrecondition extends Precondition {
  public run(message: Message) {
    return message.member?.permissions.missing(Permissions.FLAGS.ADMINISTRATOR)
      ? this.error({
          message: SYSTEM.ERROR.PERMISSIONS.MEMBER_PERM.ADMINISTRATOR,
          context: { silent: true },
        })
      : this.ok()
      
  }
}

declare module "@sapphire/framework" {
  interface Preconditions {
    AdminOnly: never;
  }
}
