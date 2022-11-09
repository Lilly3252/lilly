import type { event } from "../structures/@types/index.js"
import type { Guild } from "discord.js";


export const name: event['name'] = 'guildUpdate';
export const once: event["once"] = false

export const run: event["run"] = async (oldGuild:Guild, newGuild:Guild): Promise<void> => {
    console.log(`${oldGuild.name} updated to ${newGuild.name}`)
}