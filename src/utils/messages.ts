import { GuildMember, User } from "discord.js";

export const successful = {
	blacklisted: "Successfully blacklisted.",
	unlockChannel: "This channel has been unlocked!",
	lockChannel: "This channel has been successfully locked for moderation purposes.",

	restricted: (member: GuildMember | string) => `${member} was successfully restricted.`,
	timeout: (member: GuildMember | string) => `${member} was successfully timed out.`,
	deleted: (count: number | null) => `${count} messages has been deleted.`,
	ban: (member: GuildMember | string) => `**${member}** has been banned.`,
	unban: (user: User | string) => `**${user}** has been unbanned.`,
	mute: (member: GuildMember | string) => `**${member}** has been muted.`,
	kick: (member: GuildMember | string) => `**${member}** has been kicked.`
};
