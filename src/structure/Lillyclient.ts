require("dotenv").config();
import * as framework from "@sapphire/framework";
import utils from './util';

export default class client extends framework.SapphireClient {
  utils: typeof utils;
 
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
        scope: framework.BucketScope.Channel, // Scope cooldown to channel
      },
      shards: "auto",
      
    }),
    this.utils = utils;
  }
}
