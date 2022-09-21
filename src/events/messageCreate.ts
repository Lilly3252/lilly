import type { Message } from "discord.js";
import type { event } from "../structures/index.js"
import url from "./../structures/JSONs/url.json" assert {type: "json"};
export const name: event['name'] = 'messageCreate';
export const once: event["once"] = false


// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const run: event["run"] = async (message: Message): Promise<void> => {
    console.log(message.content)
    if (message.author.bot) { return }
    else {
        const array1 = url.domains;
        const iterator = array1.values();

        for (const value of iterator) {
            if (message.content.includes(value)) {
                message.channel.send("Scam link!");
            }
        }
    }
}