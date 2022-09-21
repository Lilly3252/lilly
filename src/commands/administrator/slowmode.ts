/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import type { ChatInputCommandInteraction } from "discord.js";
import type { SlashCommand } from "../../structures/index.js";
import { PermissionsBitField, SlashCommandBuilder } from "discord.js";
import SYSTEM from "../../structures/messageSystem.json" assert {type: "json"};

export const slashy: SlashCommand["slashy"] = new SlashCommandBuilder()
    .setName("slowmode")
    .setDescription("slowmode a channel.")
    .addChannelOption((option) =>
        option.setName("channel").setDescription("channel name")
            .setRequired(true))
    .addNumberOption((option) =>
        option.setName("number").setDescription("Enter a number").setRequired(true)
    )
    .setDefaultMemberPermissions(PermissionsBitField.Flags.ManageChannels)


export const run: SlashCommand["run"] = async (interaction: ChatInputCommandInteraction<"cached">): Promise<void> => {
    if (!interaction.guild.members.me?.permissions.has(PermissionsBitField.Flags.ManageChannels)) {
        return void interaction.reply({ content: SYSTEM.ERROR.PERMISSIONS.BOT_PERM["MANAGE_CHANNELS"], ephemeral: true });
    }
    const channel = interaction.options.getChannel("channel")!;
    const time = interaction.options.getNumber("number")!;
    if (isNaN(time)) { interaction.reply("That is not a number!") }
    else {
        if (channel.isTextBased()) {
            await channel.setRateLimitPerUser(time).then(() => {
                interaction.reply(`Set the slow mode to ${time} seconds`), { ephemeral: true };
            })
                .catch((a: any) => console.log(a));
        }
    }
};