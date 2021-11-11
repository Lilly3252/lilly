const { Client, Collection, Permissions, Intents } = require("discord.js");
const Util = require("./Util.js");

module.exports = class extends Client {
  constructor(a = {}) {
    super({
      disableMentions: "everyone",
      partials: ["MESSAGE", "CHANNEL", "REACTION", "USER", "GUILD_MEMBER"],
      intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MEMBERS,
        Intents.FLAGS.GUILD_BANS,
        //Intents.FLAGS.GUILD_EMOJIS_AND_STICKERS,
        Intents.FLAGS.GUILD_INTEGRATIONS,
        //Intents.FLAGS.GUILD_WEBHOOKS,
        //Intents.FLAGS.GUILD_INVITES,
        Intents.FLAGS.GUILD_VOICE_STATES,
        Intents.FLAGS.GUILD_PRESENCES,
        Intents.FLAGS.GUILD_MESSAGES,
        //Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
        //Intents.FLAGS.GUILD_MESSAGE_TYPING,
        Intents.FLAGS.DIRECT_MESSAGES
        //Intents.FLAGS.DIRECT_MESSAGE_REACTIONS,
        //Intents.FLAGS.DIRECT_MESSAGE_TYPING
      ]
    });
    this.validate(a);
    this.commands = new Collection();
    this.events = new Collection();
    this.utils = new Util(this);
    this.owners = a.owners;
  }

  validate(a) {
    if ("object" != typeof a) throw new TypeError("Options should be a type of Object.");
    if (!a.token) throw new Error("You must pass the token for the client.");
    if ((this.token = a.token)) if (((this.prefix = a.prefix), !a.defaultPerms)) throw new Error("You must pass default perm(s) for the Client.");
    this.defaultPerms = new Permissions(a.defaultPerms).freeze();
  }
  async start(a = this.token) {
    this.utils.loadCommands(), this.utils.loadEvents(), await super.login(a);
  }
};
