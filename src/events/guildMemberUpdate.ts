import type { event } from '../structures/types/index.js';
import type { GuildMember } from 'discord.js';

export const name: event['name'] = 'guildMemberUpdate';
export const once: event['once'] = false;

export const run: event['run'] = async (oldMember: GuildMember, newMember: GuildMember): Promise<any> => {
	console.log(`${oldMember.user.tag} updated to ${newMember.user.tag}`);
};
