/* eslint-disable @typescript-eslint/no-unused-vars */
import type { CharacterResponse } from '@xivapi/angular-client';
import { ChatInputCommandInteraction, PermissionsBitField, SlashCommandBuilder } from 'discord.js';
import type { SlashCommand } from '#type/index.js';
import { ffxivCharacterEmbed, ffxivFreeCompanyEmbed } from '#structures/messageEmbeds.js';

export const slashy: SlashCommand['slashy'] = new SlashCommandBuilder()
	.setName('ffxiv')
	.setDescription('FFXIV infos.')
	.setDefaultMemberPermissions(PermissionsBitField.Flags.ManageRoles)
	.addSubcommand((subcommand) =>
		subcommand
			.setName('character')
			.setDescription('Character information.')
			.addStringOption((option) => option.setName('firstname').setDescription('Whats the name of your character?').setRequired(true))
			.addStringOption((option) => option.setName('lastname').setDescription('Whats the name of your character?').setRequired(true))
			.addStringOption((option) => option.setName('server').setDescription('Whats the server of your character?').setRequired(true)),
	)
	.addSubcommand((subcommand) =>
		subcommand
			.setName('freecompany')
			.setDescription('name of the free company to search')
			.addStringOption((option) => option.setName('namefc').setDescription('Whats the name of your character?').setRequired(true))
			.addStringOption((option) => option.setName('serverfc').setDescription('Whats the server of your character?').setRequired(true)),
	);

// eslint-disable-next-line @typescript-eslint/ban-ts-comment

export const run: SlashCommand['run'] = async (interaction: ChatInputCommandInteraction<'cached'>): Promise<any> => {
	switch (interaction.options.getSubcommand()) {
		case 'character':
			{
				const firstName = interaction.options.getString('firstname');
				const lastName = interaction.options.getString('lastname');
				const server = interaction.options.getString('server');
				interaction.deferReply();
				try {
					const resolvedCharacter = await fetch(`https://xivapi.com/character/search?name=${firstName}+${lastName}&server=${server}`).then((x) => x.json());
					if (resolvedCharacter.Pagination.Results !== 1) {
						return await interaction.editReply('Nothing found !');
					}

					const id = resolvedCharacter.Results[0].ID;
					const character = (await fetch(`https://xivapi.com/character/${id}?data=FC`).then(async (x) => {
						return await x.json();
					})) as CharacterResponse;

					interaction.editReply({ embeds: [ffxivCharacterEmbed(character)] });
				} catch (err) {
					console.log(err);
					interaction.editReply('hmm nope');
				}
			}
			break;
		case 'freecompany':
			{
				const FCname = interaction.options.getString('namefc');
				const FCserver = interaction.options.getString('serverfc');
				interaction.deferReply();
				try {
					const resolvedFreeCompagny = await fetch(`https://xivapi.com/freecompany/search?name=${FCname}&server=${FCserver}`).then((x) => x.json());

					const id = resolvedFreeCompagny.Results[0].ID;
					const freeCompany = await fetch(`https://xivapi.com/freecompany/${id}`).then(async (x) => {
						return await x.json();
					});

					interaction.editReply({ embeds: [ffxivFreeCompanyEmbed(freeCompany)] });
				} catch (err) {
					console.log(err);
					interaction.editReply('hmm nope');
				}
			}
			break;
	}
};

declare module '@xivapi/angular-client' {
	interface Character {
		Lang?: string;
		DC: string;
	}
}
