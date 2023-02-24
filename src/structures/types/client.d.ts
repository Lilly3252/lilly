import type { Collection } from 'discord.js';
import * as Util from '../util.ts';
import type client from '../lillyClient.ts';
import { event } from '@structures/types/event.js';
import { SlashCommand } from '@structures/types/slashCommands.js';
import { ContextCommand } from '@structures/types/contextCommands.js';
import { ModalCommand } from '@structures/types/modalCommands.js';

declare module 'discord.js' {
	interface Client {
		utils: Util;
		commands: Collection<string, SlashCommand | ContextCommand>;
		event: Collection<string, event>;
		modals: Collection<string, ModalCommand>;
		contextCommand: Collection<string, ContextCommand>;
	}
}