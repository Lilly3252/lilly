import { Client, Events } from "discord.js";
import { injectable } from "tsyringe";

import type { Event } from "@yuudachi/framework/types";
import { createSettings } from "#utils/index.js";

@injectable()
export default class implements Event {
	public name = "Guild Create";

	public event = Events.GuildCreate as const;

	public constructor(public readonly client: Client<true>) {}

	public async execute(): Promise<void> {
		this.client.on(this.event, async (guild) => {
			await createSettings(guild);
		});
	}
}
