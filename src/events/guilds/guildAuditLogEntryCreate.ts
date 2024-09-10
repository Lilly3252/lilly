import { Client, Events } from "discord.js";
import { injectable } from "tsyringe";

import type { Event } from "@yuudachi/framework/types";

@injectable()
export default class implements Event {
	public name = "Audit log";

	public event = Events.GuildAuditLogEntryCreate as const;

	public constructor(public readonly client: Client<true>) {}

	public async execute(): Promise<void> {
		this.client.on(this.event, async (auditLogEntry, guild) => {
			console.log(auditLogEntry);
			console.log(guild);
		});
	}
}
