import process from 'node:process';

import { PingCommand, SlowmodeCommand } from '#slashyInformations/index.js';
import { Routes } from 'discord-api-types/v10';
import { config } from 'dotenv';

import { REST } from '@discordjs/rest';

config();

const rest = new REST({ version: "10" }).setToken(process.env.TOKEN!);
try {
  console.log("Start refreshing interaction (/) commands.");
  
  await rest.put(
    Routes.applicationGuildCommands(
      process.env.CLIENT_ID!,
      process.env.GUILD_ID!
    ),
    {
      body: [PingCommand , SlowmodeCommand],
    }
  );
  console.log("Successfully reloaded interaction (/) commands.");
} catch (error) {
  console.error(error);
}
