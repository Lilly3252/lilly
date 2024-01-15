import { on } from 'node:events';

import { Client, Events } from 'discord.js';
import { injectable } from 'tsyringe';

import type { Event } from '@yuudachi/framework/types';

@injectable()
export default class implements Event {
  public name = "Guild Member Add";

  public event = Events.GuildMemberAdd as const;

  public constructor(public readonly client: Client<true>) {}

  public async execute(): Promise<void> {
    await on(this.client, this.event);
    
  }
}