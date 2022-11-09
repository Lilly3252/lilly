/* eslint-disable @typescript-eslint/no-unused-vars */
import type { CharacterResponse } from '@xivapi/angular-client';
import { ChatInputCommandInteraction, EmbedBuilder, PermissionsBitField, SlashCommandBuilder } from 'discord.js';
import type { SlashCommand } from '../../structures/@types/index.js';
import Emoji from '../../structures/JSONs/emoji.json' assert { type: 'json' };

export const slashy: SlashCommand['slashy'] = new SlashCommandBuilder()
    .setName('ffxiv')
    .setDescription('FFXIV infos.')
    .setDefaultMemberPermissions(PermissionsBitField.Flags.ManageRoles)
    .addSubcommand((subcommand) =>
        subcommand
            .setName('character')
            .setDescription('Character information.')
            .addStringOption((option) =>
                option.setName('firstname').setDescription('Whats the name of your character?').setRequired(true),
            )
            .addStringOption((option) =>
                option.setName('lastname').setDescription('Whats the name of your character?').setRequired(true),
            )
            .addStringOption((option) =>
                option.setName('server').setDescription('Whats the server of your character?').setRequired(true),
            ),
    )
    .addSubcommand((subcommand) =>
        subcommand
            .setName('free-company')
            .setDescription('name of the free company to search')
            .addStringOption((option) =>
                option.setName('namefc').setDescription('Whats the name of your character?').setRequired(true),
            )
            .addStringOption((option) =>
                option.setName('serverfc').setDescription('Whats the server of your character?').setRequired(true),
            ),
    );

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
const jobClassData = {
    Gladiator: Emoji[':Gladiator:'],
    Paladin: Emoji[':Paladin:'],
    Marauder: Emoji[':Marauder:'],
    Warrior: Emoji[':Warrior:'],
    'Dark Knight': Emoji[':Dark Knight:'],
    Gunbreaker: Emoji[':Gunbreaker:'],
    Conjurer: Emoji[':Conjurer:'],
    'White Mage': Emoji[':White Mage:'],
    Arcanist: Emoji[':Arcanist:'],
    Scholar: Emoji[':Scholar:'],
    Astrologian: Emoji[':Astrologian:'],
    Sage: Emoji[':Sage:'],
    Pugilist: Emoji[':Pugilist:'],
    Monk: Emoji[':Monk:'],
    Lancer: Emoji[':Lancer:'],
    Dragoon: Emoji[':Dragoon:'],
    Rogue: Emoji[':Rogue:'],
    Ninja: Emoji[':Ninja:'],
    Samurai: Emoji[':Samurai:'],
    Reaper: Emoji[':Reaper:'],
    Archer: Emoji[':Archer:'],
    Bard: Emoji[':Bard:'],
    Machinist: Emoji[':Machinist:'],
    Dancer: Emoji[':Dancer:'],
    'Black Mage': Emoji[':Black Mage:'],
    Thaumaturge: Emoji[':Thaumaturge:'],
    Summoner: Emoji[':Summoner:'],
    'Red Mage': Emoji[':Red Mage:'],
    'Blue Mage (Limited Job)': Emoji[':Blue Mage (Limited Job):'],
    Carpenter: Emoji[':Carpenter:'],
    Blacksmith: Emoji[':Blacksmith:'],
    Armorer: Emoji[':Armorer:'],
    Goldsmith: Emoji[':Goldsmith:'],
    Leatherworker: Emoji[':Leatherworker:'],
    Weaver: Emoji[':Weaver:'],
    Alchemist: Emoji[':Alchemist:'],
    Culinarian: Emoji[':Culinarian:'],
    Miner: Emoji[':Miner:'],
    Botanist: Emoji[':Botanist:'],
    Fisher: Emoji[':Fisher:'],
};
export const run: SlashCommand['run'] = async (interaction: ChatInputCommandInteraction<'cached'>): Promise<void> => {
    switch (interaction.options.getSubcommand()) {
        case 'character': {
            const firstName = interaction.options.getString('firstname');
            const lastName = interaction.options.getString('lastname');
            const server = interaction.options.getString('server');

            const resolvedCharacter = await fetch(
                `https://xivapi.com/character/search?name=${firstName}+${lastName}&server=${server}`,
            ).then((x) => x.json());
            const id = resolvedCharacter.Results[0].ID;

            const character = (await fetch(`https://xivapi.com/character/${id}?data=FC`).then(async (x) => {
                return await x.json();
            })) as CharacterResponse;
            //console.log(character.Character.ClassJobs[0].UnlockedState.Name)

            const embed = new EmbedBuilder();

            embed.setTitle(`${character.Character.Name}, ${character.Character.Nameday}`);
            embed.setImage(`${character.Character.Portrait}`)
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
                            **Approx. Active Member:** ${character.FreeCompany.ActiveMemberCount ? character.FreeCompany.ActiveMemberCount : 'N/A'
                            }
                            **Estate:** ${character.FreeCompany.Estate.Plot ? character.FreeCompany.Estate.Plot : 'N/A'}
                            **Recruitment:** ${character.FreeCompany.Recruitment ? character.FreeCompany.Recruitment : 'N/A'
                            }
                        `,
                    },
                ]);
            }

            /*embed.setFooter({
                text: `${character.Character.ClassJobs[0]?.map((f:ClassJob) => f.UnlockedState?.Name).join(' ') ?? 'none'}`,
            });*/

            interaction.reply({ content: 'bingo!', embeds: [embed] });
        }
    }
};

declare module '@xivapi/angular-client' {
    interface Character {
        Lang?: string;
        DC: string;
    }
}
