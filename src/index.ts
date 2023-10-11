import 'reflect-metadata';

import process from 'node:process';
import { fileURLToPath, pathToFileURL } from 'node:url';

import { Collection } from 'discord.js';
import { config } from 'dotenv';
import readdirp from 'readdirp';

import {
  Command, commandInfo, container, createClient, createCommands, dynamicImport,
  kCommands, logger,
} from '@yuudachi/framework';
import type { Event } from '@yuudachi/framework/types';

config()

const client = createClient({
    intents:[],
    partials:[]
})
createCommands()
client.commands = new Collection() // dont actually know if i need that or not..




    const slashyFiles = readdirp(fileURLToPath(new URL("commands", import.meta.url)), {
        fileFilter: "*.js"
    });

  const eventFiles = readdirp(fileURLToPath(new URL("events", import.meta.url)), {
	fileFilter: "*.js",
});


    for await (const slashyFile of slashyFiles) {
        const cmdInfo = commandInfo(slashyFile.path);
    const commands = container.resolve<Map<string, Command>>(kCommands);
   
    const dynamic = dynamicImport<new () => Command>(async () => import(pathToFileURL(slashyFile.fullPath).href));
      const slashy = container.resolve<Command>((await dynamic()).default);
       logger.info(
        { command: { name: slashy.name?.join(", ") ?? cmdInfo.name } },
        `Registering command: ${slashy.name?.join(", ") ?? cmdInfo.name}`,
    ); // logger meant to be removed as soon as it starts working .. lol
      if (slashy.name) {
        for (const name of slashy.name) {
          commands.set(name.toLowerCase(), slashy);
      
        }
    }
}
  for await (const eventFile of eventFiles) {
    const dynamic = dynamicImport<new () => Event>(async () => import(pathToFileURL(eventFile.fullPath).href));
    const lillyevent = container.resolve<Event>((await dynamic()).default);
    if (lillyevent.disabled) {
        continue;
    }
    void lillyevent.execute();
  }


await client.login(process.env.TOKEN!)


