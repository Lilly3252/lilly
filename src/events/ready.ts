import type { event } from '../structures/types/index.js';

export const name: event['name'] = 'ready';
export const once: event['once'] = true;

export const run: event['run'] = async (): Promise<any> => {
	console.log('Ready !!!!');
};
