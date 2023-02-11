import { TextChannel, Collection } from 'discord.js';
export interface guildSetting {
	guildID: string;
	name: string;
	logChannelID: string | null;
	welcomeChannelID: string | null;
	antiRaidMode: boolean;
	messageDeleteMode: boolean;
	messageBulkDeleteMode: boolean;
	messageUpdateMode: boolean;
}
export interface blacklistUsers {
	guildID: string;
	ID: string;
	reason?: string;
}
export interface user {
	guildID: string;
	kupo: string;
	inventory: Collection<string, inventory>;
}
export interface inventory {
	products: Collection<string, products>;
	toys: Collection<string, toys>;
}
export interface products {
	vegetables: Collection<string, vegetables>;
	fruits: Collection<string, fruits>;
	fish: Collection<string, fish>;
}
export interface toys {
	id: string;
	name: string;
	type: string;
}
export interface vegetables {
	id: string;
	name: string;
}
export interface fruits {
	id: string;
	name: string;
}
export interface fish {
	id: string;
	name: string;
}
