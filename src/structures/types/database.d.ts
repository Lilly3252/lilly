import { Collection, TextChannel } from 'discord.js';

export interface guildSetting {
	guildID: string;
	name: string;
	auditLogEvent: boolean;
	logChannelID: string | null;
	welcomeChannelID: string | null;
	antiRaid: boolean;
	botUpdate:boolean;
	roleUpdate:boolean;
	integrationUpdate:boolean;
	guildUpdate:boolean;
	emojiUpdate:boolean;
	stageInstanceUpdate:boolean;
	messageUpdate:boolean;
	channelUpdate:boolean;
	stickerUpdate:boolean;
	memberUpdate:boolean;
	guildScheduledUpdate:boolean;
	threadUpdate:boolean;
	inviteUpdate:boolean;
	webhookUpdate:boolean;
	autoModeration:boolean;
	commandPermission:boolean;
	urlLinkDetection: boolean;
	urlLinks: Collection<string, links>;
}
export interface links {
	domains: string;
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
