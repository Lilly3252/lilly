import process from "node:process";

import * as command from "#slashyInformations/index.js";
import { Routes } from "discord-api-types/v10";
import { config } from "dotenv";

import { REST } from "@discordjs/rest";

config();

const rest = new REST({ version: "10" }).setToken(process.env.TOKEN!);
try {
	console.log("Start refreshing interaction (/) commands.");

	await rest.put(Routes.applicationGuildCommands(process.env.CLIENT_ID!, process.env.GUILD_ID!), {
		body: [
			//moderation commands
			command.BanCommand,
			command.BlacklistCommand,
			command.KickCommand,
			command.LockCommand,
			command.RestrictCommand,
			command.SettingCommand,
			command.SlowmodeCommand,
			command.TestCommand,
			command.TimeoutCommand,
			command.UnbanCommand,
			//utility commands
			command.PingCommand,
			command.InfoCommand,
			command.TagCommand
		]
	});

	console.log("Successfully reloaded interaction (/) commands.");
} catch (error) {
	console.error(error);
}
