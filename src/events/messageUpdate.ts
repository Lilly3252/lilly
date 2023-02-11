import type { event } from '../structures/@types/index.js';
import { EmbedBuilder, escapeMarkdown, type Message } from 'discord.js';
import * as diff from 'diff';
import settingSchema from '../database/guildSettings.js';


export const name: event['name'] = 'messageUpdate';
export const once: event['once'] = false;

export const run: event['run'] = async (oldMessage: Message<true>, newMessage: Message<true>): Promise<any> => {
    
	if (!newMessage || !oldMessage) {
		return;
	}
	if (oldMessage.content.includes('https:')) {
		return;
	}
	if (!oldMessage.guild || !newMessage.guild || oldMessage.author.bot || newMessage.author.bot) {
		return;
	}

	const guild = await settingSchema.findOne({ guildID: oldMessage.guild.id });
    
	if (!guild?.messageUpdateMode) {
		return;
	}
    
	const updatedEmbed = new EmbedBuilder().setAuthor({ name: `${newMessage.author.tag} (${newMessage.author.id})` /*(insert icon url here) */ }).addFields({ name: '\u276F Channel', value: [oldMessage.channel].join('\n') });
	let e = '';
	if (/```(.*?)```/s.test(oldMessage.content) && /```(.*?)```/s.test(newMessage.content)) {
		const c = /```(?:(\S+)\n)?\s*([^]+?)\s*```/.exec(oldMessage.content);
		if (!c || !c[2]) {
			return;
		}
        
		const f = /```(?:(\S+)\n)?\s*([^]+?)\s*```/.exec(newMessage.content);
		if (!f || !f[2]) {
			return;
		}
		if (c[2] === f[2]) {
			return;
		}
        
		const g = diff.diffLines(c[2], f[2], { newlineIsToken: true });
		for (const a of g) {
			if (a.value === '\n') continue;
			const b = a.added ? '+ ' : a.removed ? '- ' : '';
			e += `${b}${a.value.replace(/\n/g, '')}\n`;
		}
		updatedEmbed.addFields({ name: '\u276F Modified Message', value: [`${'```diff\n'}${e.substring(0, 1e3)}${'\n```'}`].join('\n') });
	} else {
		const c = diff.diffWords(escapeMarkdown(oldMessage.content), escapeMarkdown(newMessage.content));
		for (const a of c) {
			const b = a.added ? '**' : a.removed ? '~~' : '';
			e += `${b}${a.value}${b}`;
		}
		updatedEmbed.addFields({ name: '\u276F Modified Message', value: `${e.substring(0, 1020)}` || '\u200B' });
	}
	updatedEmbed
		.addFields({ name: 'link!', value: `[Click here to see the message!](${oldMessage.url})` })
		.setTimestamp(oldMessage.editedAt || newMessage.editedAt || new Date())
		.setFooter({ text: 'Edited!' });
        console.log("i've passed the embed")
	const log = guild.logChannelID;
	if (!log) {
		return;
	}
    
	const messageLog = newMessage.client.channels.cache.get(log);
	if (messageLog?.isTextBased()) {
		newMessage.channel.send({ embeds: [updatedEmbed] });
	}
    
};
