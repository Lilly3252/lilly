import type { event } from '../structures/@types/index.js';
import type { Message } from 'discord.js';

export const name: event['name'] = 'messageDelete';
export const once: event['once'] = false;

export const run: event['run'] = async (oldMessage:Message , newMessage : Message): Promise<any> => {
	console.log("OldMessage" + oldMessage)
    console.log("NewMessage" + newMessage)
};
