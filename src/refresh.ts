import type { SlashCommand } from '#type/index.js';
import { Routes } from 'discord-api-types/v10';
/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-var-requires */
import { config } from 'dotenv';
import fs from 'fs';
import process from 'process';

import { REST } from '@discordjs/rest';

config();


const commands: any[] = [];
const modules = ['administrator', 'fun', 'information', 'utilities'];

for (const folder of modules) {
	const commandFiles = fs.readdirSync(`./dist/src/commands/${folder}/`).filter((file: string) => file.endsWith('.js'));
	
	for (const file of commandFiles) {
		const command: SlashCommand = await import(`./commands/${folder}/${file}`);
		commands.push(command.slashy.toJSON());
		//console.log(command)
	}
}

const clientId = process.env.CLIENT_ID!;
const rest = new REST({ version: '10' }).setToken(process.env.TOKEN!);

(async () => {
	try {
		console.log('Started refreshing application (/) commands.');

		await rest.put(Routes.applicationCommands(clientId!), {
			body: commands,
		});
		//console.log(data);
		console.log(`Successfully reloaded application (/) commands. ${commands.length} commands has been refreshed`);
	} catch (error) {
		console.error(error);
	}
})();
