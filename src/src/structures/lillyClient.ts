import { config } from 'dotenv';
config();
import { Client, Collection, GatewayIntentBits, Partials } from 'discord.js';
import * as process from "node:process";
import Util from './util.js';

export default class client extends Client {
  public constructor() {
    super({
      partials: [
        Partials.Message,
        Partials.Channel,
        Partials.Reaction,
        Partials.User,
        Partials.GuildMember,
        Partials.GuildScheduledEvent,
        Partials.ThreadMember],
      intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildBans,
        GatewayIntentBits.GuildVoiceStates,
        GatewayIntentBits.GuildPresences,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.DirectMessages,
        GatewayIntentBits.MessageContent

      ],
    });
    this.commands = new Collection();
    this.event = new Collection();
    this.utils = new Util(this);
  }
  async start() {
    await this.utils.loadCommands(),
      await this.utils.loadEvents(),
      await super.login(process.env.TOKEN);
  }

}
