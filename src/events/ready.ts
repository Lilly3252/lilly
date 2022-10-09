import type { event } from './../structures/index.js';

export const name: event['name'] = 'ready';
export const once: event['once'] = true;

export const run: event['run'] = async (): Promise<void> => {
	console.log('Ready !!!!');
};
