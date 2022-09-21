/* eslint-disable @typescript-eslint/no-unused-vars */
import type { ChatInputCommandInteraction } from "discord.js";
import type { SlashCommand } from "../../structures/index.js";
import { PermissionsBitField, SlashCommandBuilder } from "discord.js";
//import SYSTEM from "../../structures/messageSystem.json" assert {type: "json"};
//import Guild from "../../database/guild";
//import * as Embed from "../../structures/messageEmbeds.js";
export const slashy: SlashCommand["slashy"] = new SlashCommandBuilder()
    .setName("unmute")
    .setDescription("unmute a member.")
    .addMentionableOption((option) =>
        option.setName("member").setDescription("Mention someone")
            .setRequired(true))
    .setDefaultMemberPermissions(PermissionsBitField.Flags.MuteMembers)


export const run: SlashCommand["run"] = async (interaction: ChatInputCommandInteraction<"cached">): Promise<void> => {
    await interaction.reply({ content: "This command is not finished yet.", ephemeral: true })
};