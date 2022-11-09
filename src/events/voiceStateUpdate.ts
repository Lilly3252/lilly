
import type { event } from "../structures/@types/index.js"
import type { VoiceState } from "discord.js";


export const name: event['name'] = 'voiceStateUpdate';
export const once: event["once"] = false

export const run: event["run"] = async (oldState: VoiceState, newState: VoiceState): Promise<void> => {
    console.log(`
    ${oldState.member?.id} (${oldState.member?.user.tag}) 
    on ${oldState.channelId}, Named : ${oldState.channel ? oldState.channel.name : null} 
    been moved to ${newState.channelId}, Named : ${newState.channel ? newState.channel.name : null}
    `);
    
}