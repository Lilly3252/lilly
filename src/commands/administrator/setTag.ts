/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-unused-vars */
import type { ChatInputCommandInteraction } from "discord.js";
import type { SlashCommand } from "../../structures/@types/index.js";
import { PermissionsBitField, SlashCommandBuilder } from "discord.js";


export const slashy: SlashCommand["slashy"] = new SlashCommandBuilder()
    .setName("settings-tags").setDescription("Settings for tags.")
    .addStringOption((option) => option.setName("actions").setDescription("Choose a action").setRequired(true)
        .addChoices({ name: "Create", value: "create" }, { name: "Delete", value: "delete" }, { name: "Modify", value: "modify" }, { name: "ListAll", value: "listall" }).setRequired(true))
    .addStringOption((option) => option.setName("name").setDescription("Name for Tag").setRequired(true))
    .addStringOption((option) => option.setName("message").setDescription("message").setRequired(true))
    .setDefaultMemberPermissions(PermissionsBitField.Flags.Administrator)


export const run: SlashCommand["run"] = async (interaction: ChatInputCommandInteraction<"cached">): Promise<void> => {
    const choices = interaction.options.getString("actions")!
    const name = interaction.options.getString("name")!;
//    const message = interaction.options.getString("message")!;
   
    switch (choices) {
        case "create": {

        }
            break;
        case "delete": {
          
        }
            break;
        case "modify": {
        
}

            break;
        case "listall": {
//           
        }
            break;
    }
}
