import type { event } from '../structures/@types/index.js';
import type { GuildMember } from 'discord.js';

export const name: event['name'] = 'guildMemberRemove';
export const once: event['once'] = false;

export const run: event['run'] = async (member: GuildMember): Promise<any> => {
	console.log(`${member.user.tag} removed`);
};
