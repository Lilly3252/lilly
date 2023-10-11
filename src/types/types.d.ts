import { Collection } from 'discord.js';

import { Command } from '@yuudachi/framework';
import type { Event } from '@yuudachi/framework/types';

declare module 'discord.js' {
	interface Client {
		commands: Collection<string, Command>;
		event: Collection<string, Event>;
	}
}