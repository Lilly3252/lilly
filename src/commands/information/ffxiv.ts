/* eslint-disable @typescript-eslint/no-unused-vars */
import type { CharacterResponse } from '@xivapi/angular-client';
import { ChatInputCommandInteraction, EmbedBuilder, PermissionsBitField, SlashCommandBuilder } from 'discord.js';
import type { SlashCommand } from '../../structures/@types/index.js';

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

					const embed = new EmbedBuilder();
					embed.setTitle(`${character.Character.Name}, ${character.Character.Nameday}`);
					embed.setImage(`${character.Character.Portrait}`);
					embed.addFields([
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
						embed.addFields([
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

					interaction.editReply({ embeds: [embed] });
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

					const embedCompany = new EmbedBuilder()
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
					interaction.editReply({ embeds: [embedCompany] });
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
