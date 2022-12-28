import { TextChannel } from 'discord.js';
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
