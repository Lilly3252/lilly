import type { event } from '#type/index.js';
import type { Role } from 'discord.js';

export const name: event['name'] = 'roleUpdate';
export const once: event['once'] = false;

export const run: event['run'] = async (role:Role): Promise<any> => {
	console.log(role);
};
