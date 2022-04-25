require("dotenv").config();
import { Precondition } from "@sapphire/framework";
import type { Message } from "discord.js";
import SYSTEM from "../structure/messageSystem.json";

export class OwnerOnlyPrecondition extends Precondition {
  public run(message: Message) {
    return message.author.id === process.env.OWNER
      ? this.ok()
      : this.error({
          message: SYSTEM.ERROR.COMMANDS.OWNER_ONLY,
          context: { silent: true },
        });
  }
}
declare module "@sapphire/framework" {
  interface Preconditions {
    OwnerOnly: never;
  }
}
