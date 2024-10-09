import { Snowflake } from "discord.js";
import { Types } from "mongoose";

export interface guild {
	guildID: string;
	name: string;
	auditLogEvent: boolean;
	logChannelID: string | null;
	welcomeChannelID: string | null;
	guildSettings: Types.Array<guildSettings>;
	safeRoles: string[];
	restrictEmbedRole: string;
	restrictReactionRole: string;
	restrictSlashRole: string;
	restrictPollRole: string;
	restrictVoiceRole: string;
}

export interface guildSettings {
	antiRaid: boolean;
	botUpdate: boolean;
	roleUpdate: boolean;
	integrationUpdate: boolean;
	guildUpdate: boolean;
	emojiUpdate: boolean;
	stageInstanceUpdate: boolean;
	messageUpdate: boolean;
	channelUpdate: boolean;
	stickerUpdate: boolean;
	memberUpdate: boolean;
	guildScheduledUpdate: boolean;
	threadUpdate: boolean;
	inviteUpdate: boolean;
	webhookUpdate: boolean;
	autoModeration: boolean;
	commandPermission: boolean;
}
export interface user {
	guildID: string;
	userID: Snowflake;
	blacklisted: boolean;
	notes?: Array<{
		note: string;
		moderator: Snowflake;
		date: Date;
	}>;
	pet?: {
		petName: string;
		petType: string;
		hunger: number;
		happiness: number;
		health: number; // New field for health
		lastFed: Date;
		lastPlayed: Date;
		level: number;
		experience: number;
		skills: string[]; // New field for skills
		inventory: {
			medicine: Array<{
				itemName: string;
				quantity: number;
			}>;
			toys: Array<{
				itemName: string;
				quantity: number;
			}>;
			food: Array<{
				itemName: string;
				quantity: number;
			}>;
		};
	};
	coins: number;
	lastDaily: Date;
	quests?: Array<{
		// New field for quests
		questName: string;
		completed: boolean;
		progress: number;
		reward: string;
		expiryDate: Date;
	}>;
}
