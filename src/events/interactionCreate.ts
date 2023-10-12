import { Client, Events } from 'discord.js';
import { inject, injectable } from 'tsyringe';

import {
  Command, kCommands, transformApplicationInteraction,
} from '@yuudachi/framework';
import type { Event } from '@yuudachi/framework/types';

@injectable()
export default class implements Event {
  public name = "Interaction handling";

  public event = Events.InteractionCreate as const;

  public constructor(
    public readonly client: Client<true>,
    @inject(kCommands) public readonly commands: Map<string, Command>
  ) {}

  public async execute(): Promise<void> {
    this.client.on(this.event, async (interaction) => {
      const locale = "en-US";
      const effectiveLocale = locale ?? interaction.locale;
      if(!interaction.inCachedGuild()){return}

      if (interaction.isChatInputCommand()) {
        const command = this.commands.get(
          interaction.commandName.toLowerCase()
        );
        console.log(command); // Undefined-ish ?
        await command.chatInput(
          // TypeError: Cannot read properties of undefined (reading 'chatInput')
          interaction,
          transformApplicationInteraction(interaction.options.data),
          effectiveLocale
        );
      }

      if (interaction.isAutocomplete()) {
        try {
          const command = interaction.client.commands.get(
            interaction.commandName.toLowerCase()
          );
          if (command) {
            await command.autocomplete(
              interaction,
              transformApplicationInteraction(interaction.options.data),
              effectiveLocale
            );
          }
        } catch (err: unknown) {
          return interaction.respond([]);
        }
      }
    });
  }
}
