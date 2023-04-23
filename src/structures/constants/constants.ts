import { type ChatInputCommandInteraction, type GuildMember, type PermissionFlagsBits, type User } from 'discord.js';

export const errors = {
	questionTextTooLong: "I can't answer questions that long ! please limit your message under 2000char.",
	textTooLong: "I can't send messages that are that long ! please limit your message under 2000char.",
	notTextChan: 'I cant send messages in a channel that is not a text channel.',
	noMention: 'Please mention a user!',
	alreadyMuted: 'This member is already muted, you cannot mute this member twice!',
	noMuted: 'This member is not muted.',
	notNumber: 'This is not a number...?',
	messageDeleted: 'An error occurred when deleting the messages, make sure they are not older than 14 days.',
	validAmount: 'Amount must be a valid number and below 100.',
	noChannelID: 'You need to tell me a channel ID to work..',
	noUserID: "That's not a user ID!",
	noUserBanned: 'This user is not banned.',
	noGuildBanned: 'Nobody was banned from this server.',
	moderationDenied: 'Moderation action cannot be done on this member.',
	noTagFound: (name: string) => `Unfortunately , no tag has been found for ${name}`,
} as const;

export function botPermissionDenied<P extends keyof typeof PermissionFlagsBits>(permission: P): `❌ Error: i'm missing ${P} permission to use that command.` {
	return `❌ Error: i'm missing ${permission} permission to use that command.`;
}

export const successful = {
	blacklisted: 'Successfully blacklisted.',
	unlockChannel: 'This channel has been unlocked!',
	lockChannel: 'This channel has been successfully locked for moderation purposes.',
	ping: (latency: number, response: string | undefined, interaction: ChatInputCommandInteraction) =>
		`${response} - Bot Latency: \`${latency}ms\` , API Latency: \`${Math.round(interaction.client.ws.ping)}ms.\``,
	slowmode: (time: number) => `Slowmode has been set to ${time} seconds.`,
	restricted: (member: GuildMember | string) => `${member} was successfully restricted.`,
	timeout: (member: GuildMember | string) => `${member} was successfully timed out.`,
	deleted: (count: number | null) => `${count} messages has been deleted.`,
	ban: (member: GuildMember | string) => `**${member}** has been banned.`,
	unban: (user: User | string) => `**${user}** has been unbanned.`,
	mute: (member: GuildMember | string) => `**${member}** has been muted.`,
	kick: (member: GuildMember | string) => `**${member}** has been kicked.`,
} as const;

export enum selectMenuEvents {
	antiRaid,
	botUpdate,
	roleUpdate,
	guildUpdate,
	emojiUpdate,
	inviteUpdate,
	threadUpdate,
	memberUpdate,
	messageUpdate,
	channelUpdate,
	stickerUpdate,
	webhookUpdate,
	autoModeration,
	urlLinkDetection,
	integrationUpdate,
	commandPermission,
	stageInstanceUpdate,
	guildScheduledUpdate,
}
