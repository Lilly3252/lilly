import { ContextCommand, event, ModalCommand, SelectMenu, SlashCommand } from '#type/index.js';
import type { Collection } from 'discord.js';

import type client from '../lillyClient.ts';
import * as Util from '../util.ts';

declare module 'discord.js' {
	interface Client {
		utils: Util;
		commands: Collection<string, SlashCommand | ContextCommand>;
		event: Collection<string, event>;
		modals: Collection<string, ModalCommand>;
		selectMenu:Collection<string,SelectMenu>
	}
}
