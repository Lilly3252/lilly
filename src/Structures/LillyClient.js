require("dotenv").config();
const { Client, Collection, GatewayIntentBits , Partials} = require("discord.js");
const Util = require("./Util.js");
const process = require ("node:process");
//const config  = require("./../config.json");

module.exports = class extends Client {
  constructor(a = {}) {
    super({
      partials: [Partials.Message, Partials.Channel, Partials.Reaction, Partials.User, Partials.GuildMember,Partials.GuildScheduledEvent,Partials.ThreadMember],
      intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildBans,
        GatewayIntentBits.GuildVoiceStates,
        GatewayIntentBits.GuildPresences,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.DirectMessages,
      ],
    });

  
    this.commands = new Collection();
    this.events = new Collection();
    this.utils = new Util(this);
    this.owners = a.owners;
  }

  
  async start() {
    await this.utils.loadCommands(),
      await this.utils.loadEvents(),
      await super.login(process.env.TOKEN);
  }
};
