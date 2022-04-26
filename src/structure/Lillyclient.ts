require("dotenv").config();
import { SapphireClient, BucketScope } from "@sapphire/framework";
import { Collection} from "discord.js";
import type Util from './util';

export class Lillyclient extends SapphireClient {
  util: Collection<undefined, typeof Util>; // thats completely wrong

  public constructor() {
    super({
      presence: {
        activities: [{ name: "Will i keep that?", type: "WATCHING" }],
      },
      intents: [
        "GUILDS",
        "GUILD_MESSAGES",
        "GUILD_MEMBERS",
        "GUILD_PRESENCES",
        "GUILD_VOICE_STATES",
      ],
      partials: ["MESSAGE", "CHANNEL", "REACTION", "USER", "GUILD_MEMBER"],
      defaultCooldown: {
        delay: 10_000, // 10_000 milliseconds
        filteredCommands: ["ping"], // Ignore the `ping` command
        filteredUsers: ["YOUR_ID"], // Ignore the bot owner
        limit: 2, // Allow 2 uses before ratelimiting
        scope: BucketScope.Channel, // Scope cooldown to channel
      },
      shards: "auto",
    });
    this.util = new Collection(); // thats maybe ok
  }
}