import type { event } from '../structures/@types/index.js';
import { EmbedBuilder, GuildMember } from 'discord.js';
import moment from 'moment';
import settingSchema from './../database/guildSettings.js';
export const name: event['name'] = 'guildMemberAdd';
export const once: event['once'] = false;

export const run: event['run'] = async (member: GuildMember): Promise<any> => {
	if (!member.guild) return;

	const created_account = `${moment(member.user.createdTimestamp).format('LL')} (${moment(member.user.createdTimestamp).fromNow()})`;

	const c = await settingSchema.findOne({ guildID: member.guild.id });

	const welcomeEmbed = new EmbedBuilder()
		.setColor('Random')
		.setAuthor({ name: `${member.user.tag} (${member.id})`, iconURL: member.user.displayAvatarURL() })
		.addFields({ name: 'Information', value: [`**❯ Username:** ${member.user}`, `**❯ Created at:** ${created_account}`].join('\n') })
		.setFooter({ text: 'User joined' })
		.setTimestamp(new Date());

	const welcomeChannelDatabase = c?.welcomeChannelID;
	if (!welcomeChannelDatabase || welcomeChannelDatabase === null) {
		return;
	}
	const welcomeChannel = member.client.channels.cache.get(welcomeChannelDatabase)!;
	if (!welcomeChannel || welcomeChannel === null) {
		return;
	}
	if (welcomeChannel?.isTextBased()) {
		welcomeChannel.send({ embeds: [welcomeEmbed] });
	}
};
