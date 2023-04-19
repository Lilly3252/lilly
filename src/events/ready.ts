import type { event } from '#type/index.js';
import { type Client } from 'discord.js';

export const name: event['name'] = 'ready';
export const once: event['once'] = true;

export const run: event['run'] = async (client:Client): Promise<any> => {
	console.log('Ready !!!!');


};
