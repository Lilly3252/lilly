const { Client, Collection, Permissions, GatewayIntentBits , Partials} = require("discord.js");
const Util = require("./Util.js");
const process = require ("node:process");
module.exports = class extends Client {
  constructor(a = {}) {
    super({
      partials: ["MESSAGE", "CHANNEL", "REACTION", "USER", "GUILD_MEMBER"],
      intents: [
        GatewayIntentBits.FLAGS.GUILDS,
        GatewayIntentBits.FLAGS.GUILD_MEMBERS,
        GatewayIntentBits.FLAGS.GUILD_BANS,
        GatewayIntentBits.FLAGS.GUILD_VOICE_STATES,
        GatewayIntentBits.FLAGS.GUILD_PRESENCES,
        GatewayIntentBits.FLAGS.GUILD_MESSAGES,
        GatewayIntentBits.FLAGS.DIRECT_MESSAGES,
      ],
    });

    if (process.env.TOKEN) {
      a = {
        // check if owners has a ,
        owners: process.env.OWNERS.includes(",")
          ? process.env.OWNERS.split(",")
          : process.env.OWNERS,

        token: process.env.TOKEN,
        prefix: process.env.PREFIX,
        mongooseLink: process.env.MONGOOSE_URI,
        ClientID: process.env.CLIENT_ID,
        GuildID: process.env.GUILD_ID,
        defaultPerms: new Permissions([
          "VIEW_CHANNEL",
          "SEND_MESSAGES",
        ]).freeze(),
      };
    }

    this.validate(a);
    this.commands = new Collection();
    this.events = new Collection();
    this.utils = new Util(this);
    this.owners = a.owners;
  }

  validate(a) {
    if ("object" != typeof a)
      throw new TypeError("Options should be a type of Object.");
    if (!a.token) throw new Error("You must pass the token for the client.");
    if ((this.token = a.token))
      if (((this.prefix = a.prefix), !a.defaultPerms))
        throw new Error("You must pass default perm(s) for the Client.");
    this.defaultPerms = new Permissions(a.defaultPerms).freeze();
  }
  async start(a = this.token) {
    await this.utils.loadCommands(),
      await this.utils.loadEvents(),
      await super.login(a);
  }
};
