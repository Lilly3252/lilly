import { Client, Events } from "discord.js";
import { injectable } from "tsyringe";

import type { Event } from "@yuudachi/framework/types";

@injectable()
export default class implements Event {
	public name = "Message Create";

	public event = Events.MessageCreate as const;

	public constructor(public readonly client: Client<true>) {}

	public async execute(): Promise<void> {
		this.client.on(this.event, async (message) => {
			if (message.author.bot) {
				return;
			}
		});
	}
}
