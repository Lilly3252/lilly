import { once } from "node:events";

import { Client, Events } from "discord.js";
import { injectable } from "tsyringe";

//import { logger } from "@yuudachi/framework";
import type { Event } from "@yuudachi/framework/types";

@injectable()
export default class implements Event {
	public name = "Client ready handling";

	public event = Events.ClientReady as const;

	public constructor(public readonly client: Client<true>) {}

	public async execute(): Promise<void> {
		await once(this.client, this.event);
		console.log("connected via console.logging instead of logger");
	}
}
