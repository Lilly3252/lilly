import LillyClient from '#structures/lillyClient.js';

export interface event {
	name: string;
	client: client;
	type: string;
	emitter: string;
	once: boolean;
	/**
	 * @param args Arguments...
	 */
	run(...args: unknown[]): Promise<any>;
}
