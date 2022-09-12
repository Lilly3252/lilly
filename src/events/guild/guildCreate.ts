import type { event } from "../../structures/index.js"
import type { Guild } from "discord.js";


export const name: event['name'] = 'guildCreate';
export const once: event["once"] = false

export const run: event["run"] = async (guild:Guild): Promise<void> => {
    console.log(`i joined ${guild.name}`)
}