import { lillyColors } from '#constants/colors.js';
import emoji from '#json/emoji.json' assert { type: 'json' };
import { ChatInputCommandInteraction, EmbedBuilder, GuildMember } from 'discord.js';

import type { CharacterResponse } from '@xivapi/angular-client';

export function muteEmbed(interaction: ChatInputCommandInteraction<'cached'>, member: GuildMember, reason: string, time: string): EmbedBuilder {
	return new EmbedBuilder()
		.setColor(lillyColors.Warnings['Yellow'])
		.addFields([
			{
				name: 'Moderation',
				value: [`**❯ Action:** Timeout`, `**❯ Member:** ${member.user}`, `**❯ Moderator:** ${interaction.member.user.tag} `, `**❯ Reason:** ${reason}`, `**❯ Time:** ${time}`].join('\n'),
			},
		])
		.setFooter({ text: `Date: ${interaction.createdAt.toLocaleString()}` });
}
export function adminEmbed(interaction: ChatInputCommandInteraction<'cached'>, member: GuildMember, reason: string) {
	return new EmbedBuilder()
		.setColor(lillyColors.Warnings['Red'])
		.addFields([
			{
				name: 'Moderation',
				value: [`**❯ Action:** ${interaction.commandName}`, `**❯ Member:** ${member.user}`, `**❯ Moderator:** ${interaction.member.user.tag} `, `**❯ Reason:** ${reason}`].join('\n'),
			},
		])
		.setFooter({ text: `Date: ${interaction.createdAt.toLocaleString()}` });
}
export function restrictEmbed(interaction: ChatInputCommandInteraction<'cached'>, reason: string, restriction_name: string, e: GuildMember) {
	return new EmbedBuilder()
		.setAuthor({
			name: `${interaction.user.tag} (${interaction.user.id})`,
			iconURL: interaction.user.displayAvatarURL(),
		})
		.setColor(lillyColors.Warnings['Orange'])
		.addFields([
			{
				name: 'Moderation',
				value: [`**❯ Action:** ${restriction_name} restriction`, `**❯ Member:** ${e.user.username}`, `**❯ Moderator:** ${interaction.user.tag} `, `**❯ Reason:** ${reason}`].join('\n'),
			},
		])
		.setTimestamp(new Date())
		.setFooter({ text: `${restriction_name} restricted` });
}


export function ffxivCharacterEmbed(character: CharacterResponse) {
	const ffxivCharacterEmbed = new EmbedBuilder();
	ffxivCharacterEmbed.setTitle(`${character.Character.Name}, ${character.Character.Nameday}`);
	ffxivCharacterEmbed.setImage(`${character.Character.Portrait}`);
	ffxivCharacterEmbed.addFields([
		{
			name: 'Information:',
			value: `
		**Server:** ${character.Character.Server}, ${character.Character.DC}
		**Language:** ${character.Character.Lang ?? 'English'}
		**Tribes:** ${character.Character.Tribe ? character.Character.Tribe : 'No Tribes'}
	`,
		},
	]);

	if (character.FreeCompany) {
		ffxivCharacterEmbed.addFields([
			{
				name: 'Free Company',
				value: `
			**Free company name:** ${character.FreeCompany.Name ? character.FreeCompany.Name : 'N/A'}
			**Active:** ${character.FreeCompany.Active ? character.FreeCompany.Active : 'N/A'} 
			**Approx. Active Member:** ${character.FreeCompany.ActiveMemberCount ? character.FreeCompany.ActiveMemberCount : 'N/A'}
			**Estate:** ${character.FreeCompany.Estate.Plot ? character.FreeCompany.Estate.Plot : 'N/A'}
			**Recruitment:** ${character.FreeCompany.Recruitment ? character.FreeCompany.Recruitment : 'Closed'}
		`,
			},
		]);
	}
	return ffxivCharacterEmbed;
}
export function ffxivFreeCompanyEmbed(freeCompany: any) {
	const ffxivFreeCompanyEmbed = new EmbedBuilder()
		.setTitle(`${freeCompany.FreeCompany.Name}, (${freeCompany.FreeCompany.Tag})`)
		.addFields([
			{
				name: 'Information',
				value: `
		**Name**: ${freeCompany.FreeCompany.Name}(Rank: ${freeCompany.FreeCompany.Rank}),
		**Formed**: ${freeCompany.FreeCompany.Formed},
		**Server**:${freeCompany.FreeCompany.Server},
		**Recruitment**:${freeCompany.FreeCompany.Recruitment},
`,
			},
		])
		.setFooter({ text: freeCompany.FreeCompany.Slogan });
	return ffxivFreeCompanyEmbed;
}
export function testEmbed(interaction:ChatInputCommandInteraction){
	const test = new EmbedBuilder()
	.setTitle(`${emoji[":Astrologian:"]} <@${interaction.user.id}>` )
	.setDescription(`${emoji[":Conjurer:"]} Description `)
	.setFields({name:`${emoji[":Armorer:"]} Addfields Name` , value: `${emoji[":Bard:"]} Add fields value`})
	.setFooter({text: `${emoji[":Botanist:"]} Footer value`})
	return test
}