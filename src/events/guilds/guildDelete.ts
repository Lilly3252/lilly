//fs.unlink() for deleting tags file from the guild.
import { Client, Events } from "discord.js";
import { injectable } from "tsyringe";

import type { Event } from "@yuudachi/framework/types";

import { unlink } from "node:fs";

@injectable()
export default class implements Event {
	public name = "Guild Create";

	public event = Events.GuildCreate as const;

	public constructor(public readonly client: Client<true>) {}

	public async execute(): Promise<void> {
		this.client.on(this.event, async (guild) => {
			unlink(`./dist/tags/${guild.id}-tags.toml`, (err) => {
				if (err) console.log(err);
			});
		});
	}
}
