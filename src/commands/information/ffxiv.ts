/* eslint-disable @typescript-eslint/no-unused-vars */
import { ChatInputCommandInteraction, EmbedBuilder } from "discord.js";
import type { SlashCommand } from "../../structures/index.js";
import { PermissionsBitField, SlashCommandBuilder } from "discord.js";
import Emoji from "../../structures/JSONs/emoji.json"assert {type: "json"};
import type { CharacterResponse, ClassJob, JSONdata } from "../../structures/types.js"
//import { Character } from '../../structures/types';

export const slashy: SlashCommand["slashy"] = new SlashCommandBuilder()
    .setName("ffxiv")
    .setDescription("FFXIV infos.")
    .setDefaultMemberPermissions(PermissionsBitField.Flags.ManageRoles)
    .addSubcommand((subcommand) =>
        subcommand
            .setName("character")
            .setDescription("Character information.")
            .addStringOption((option) =>
                option
                    .setName("firstname")
                    .setDescription("Whats the name of your character?")
                    .setRequired(true)
            )
            .addStringOption((option) =>
                option
                    .setName("lastname")
                    .setDescription("Whats the name of your character?")
                    .setRequired(true)
            )
            .addStringOption((option) =>
                option
                    .setName("server")
                    .setDescription("Whats the server of your character?")
                    .setRequired(true)
            )
    )
    .addSubcommand((subcommand) =>
        subcommand
            .setName("free-company")
            .setDescription("name of the free company to search")
            .addStringOption((option) =>
                option
                    .setName("namefc")
                    .setDescription("Whats the name of your character?")
                    .setRequired(true)
            )
            .addStringOption((option) =>
                option
                    .setName("serverfc")
                    .setDescription("Whats the server of your character?")
                    .setRequired(true)
            )
    )



const jobClassData = {
    Gladiator: Emoji[":Gladiator:"],
    Paladin: Emoji[":Paladin:"],
    Marauder: Emoji[":Marauder:"],
    Warrior: Emoji[":Warrior:"],
    "Dark Knight": Emoji[":Dark Knight:"],
    Gunbreaker: Emoji[":Gunbreaker:"],
    Conjurer: Emoji[":Conjurer:"],
    "White Mage": Emoji[":White Mage:"],
    Arcanist: Emoji[":Arcanist:"],
    Scholar: Emoji[":Scholar:"],
    Astrologian: Emoji[":Astrologian:"],
    Sage: Emoji[":Sage:"],
    Pugilist: Emoji[":Pugilist:"],
    Monk: Emoji[":Monk:"],
    Lancer: Emoji[":Lancer:"],
    Dragoon: Emoji[":Dragoon:"],
    Rogue: Emoji[":Rogue:"],
    Ninja: Emoji[":Ninja:"],
    Samurai: Emoji[":Samurai:"],
    Reaper: Emoji[":Reaper:"],
    Archer: Emoji[":Archer:"],
    Bard: Emoji[":Bard:"],
    Machinist: Emoji[":Machinist:"],
    Dancer: Emoji[":Dancer:"],
    "Black Mage": Emoji[":Black Mage:"],
    Thaumaturge: Emoji[":Thaumaturge:"],
    Summoner: Emoji[":Summoner:"],
    "Red Mage": Emoji[":Red Mage:"],
    "Blue Mage (Limited Job)": Emoji[":Blue Mage (Limited Job):"],
    Carpenter: Emoji[":Carpenter:"],
    Blacksmith: Emoji[":Blacksmith:"],
    Armorer: Emoji[":Armorer:"],
    Goldsmith: Emoji[":Goldsmith:"],
    Leatherworker: Emoji[":Leatherworker:"],
    Weaver: Emoji[":Weaver:"],
    Alchemist: Emoji[":Alchemist:"],
    Culinarian: Emoji[":Culinarian:"],
    Miner: Emoji[":Miner:"],
    Botanist: Emoji[":Botanist:"],
    Fisher: Emoji[":Fisher:"],
};
export const run: SlashCommand["run"] = async (interaction: ChatInputCommandInteraction<"cached">): Promise<void> => {
    if (interaction.options.getSubcommand() === "character") {
        console.log("Hello")

        const first_name = interaction.options.getString("firstname");
        const last_name = interaction.options.getString("lastname");
        const server = interaction.options.getString("server");

        const foo = await fetch(`https://xivapi.com/character/search?name=${first_name}+${last_name}&server=${server}`).then(x => x.json());
        console.log("foo passed")
        const id = foo.Results[0].ID;
        const Language = foo.Results[0].Lang
        const foo2 = await fetch(`https://xivapi.com/character/${id}?data=FC`).then(x => x.json()) as JSONdata
        console.log("foo 2 passed")
        console.log(JSON.stringify(foo2.Character) + "hello after fetch")
         //eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-non-null-assertion
        const classjobdata = foo2.Character.ClassJobs?.map((f: ClassJob) => f.UnlockedState!.Name)
        const classJobsName = jobClassData
        console.log("Hello BEFORE embed")
        const embedchar = new EmbedBuilder()
            .setTitle(`${foo2.Character.Name}, ${foo2.Character.Nameday}`)
            //.setImage(`${foo2.Character?.Portrait}`)
            .addFields([
                {
                    name: 'Information:', value: `
                    **Server:** ${foo2.Character.Server}, ${foo2.Character.DC}
                    **Language:** ${Language}
                    **Tribes:** ${foo2.Character.Tribe ? foo2.Character.Tribe : "No Tribes"}`
                },
                {
                    name: 'Free Company', value: `
                    **Free company name:** ${foo2.FreeCompany.Name ? foo2.FreeCompany.Name : "N/A"}
                    **Active:** ${foo2.FreeCompany.Active ? foo2.FreeCompany.Active : "N/A"} 
                    **Approx. Active Member:** ${foo2.FreeCompany.ActiveMemberCount ? foo2.FreeCompany.ActiveMemberCount : "N/A"}
                    **Estate:** ${foo2.FreeCompany.Estate.Plot ? foo2.FreeCompany.Estate.Plot : "N/A"}
                    **Recruitment:** ${foo2.FreeCompany.Recruitment ? foo2.FreeCompany.Recruitment : "N/A"}`
                }
            ])
            .setFooter({
                text: `${classjobdata.length
                    ? classjobdata.map((a: string) => classJobsName[a]).join(" ")
                    : "none"}`
            })
        console.log("Hello after embed")
        interaction.reply({content:"bingo!", embeds: [embedchar] })
        console.log("I guess that's where it breaks")
    }
}