import "reflect-metadata";
import { Backend } from "@skyra/i18next-backend";
import { type Command, commandInfo, container, createClient, createCommands, dynamicImport, kCommands } from "@yuudachi/framework";
import type { Event } from "@yuudachi/framework/types";
import { GatewayIntentBits, Partials } from "discord.js";
import { config } from "dotenv";
import i18next from "i18next";
import mongoose from "mongoose";
import process from "node:process";
import { fileURLToPath, pathToFileURL } from "node:url";
import readdirp, { EntryInfo } from "readdirp";

config();

const client = createClient({
	intents: [
		GatewayIntentBits.Guilds,
		GatewayIntentBits.MessageContent,
		GatewayIntentBits.GuildMessages,
		GatewayIntentBits.GuildMembers,
		GatewayIntentBits.GuildModeration,
		GatewayIntentBits.GuildPresences,
		GatewayIntentBits.AutoModerationConfiguration,
		GatewayIntentBits.AutoModerationExecution
	],
	partials: [Partials.Message, Partials.Channel, Partials.Reaction, Partials.User, Partials.GuildMember, Partials.GuildScheduledEvent, Partials.ThreadMember]
});
createCommands();

mongoose.connect(process.env.MONGOOSE_URL);
console.log("db connected");
const jsFileFilter = (entry: EntryInfo) => entry.basename.endsWith(".js");
const slashyFiles = readdirp(fileURLToPath(new URL("commands", import.meta.url)), {
	fileFilter: jsFileFilter
});

const commands = container.resolve<Map<string, Command>>(kCommands);

for await (const slashyFile of slashyFiles) {
	const cmdInfo = commandInfo(slashyFile.path);
	const dynamic = dynamicImport<new () => Command>(async () => import(pathToFileURL(slashyFile.fullPath).href));
	console.log(cmdInfo);
	const slashy = container.resolve<Command>((await dynamic()).default);
	commands.set(cmdInfo.name.toLowerCase(), slashy);
}

const eventFiles = readdirp(fileURLToPath(new URL("events", import.meta.url)), {
	fileFilter: jsFileFilter
});

for await (const eventFile of eventFiles) {
	const dynamic = dynamicImport<new () => Event>(async () => import(pathToFileURL(eventFile.fullPath).href));
	const lillyevent = container.resolve<Event>((await dynamic()).default);

	if (lillyevent.disabled) {
		continue;
	}
	void lillyevent.execute();
}

await i18next.use(Backend).init({
	backend: {
		paths: [new URL("../locales/{{lng}}/{{ns}}.json", import.meta.url)]
	},
	cleanCode: true,
	preload: ["en-US", "fr-FR", "ja-JP"],
	supportedLngs: ["en-US", "fr-FR", "ja-JP"],
	fallbackLng: ["en-US"],
	returnNull: false,
	returnEmptyString: false,
	debug: false
});

await client.login(process.env.TOKEN!);
