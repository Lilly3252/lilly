/* eslint-disable @typescript-eslint/no-non-null-assertion */
import type { ChatInputCommandInteraction } from "discord.js";
import type { SlashCommand } from "../../structures/index.js";
import { PermissionsBitField, SlashCommandBuilder } from "discord.js";
import SYSTEM from "../../structures/messageSystem.json" assert {type: "json"};

export const slashy: SlashCommand["slashy"] = new SlashCommandBuilder()
    .setName("say")
    .setDescription("say something.")
    .addStringOption((option) =>
        option.setName("message").setDescription("message to say")
    )
    .addChannelOption((option) => option.setName("channel").setDescription("select a channel."))
    .setDefaultMemberPermissions(PermissionsBitField.Flags.ManageMessages)


export const run: SlashCommand["run"] = async (interaction: ChatInputCommandInteraction<"cached">): Promise<void> => {
    if (
        !interaction.guild.members.me?.permissions.has(PermissionsBitField.Flags.ManageMessages)
    ) {
        return void interaction.reply(
            { content: SYSTEM.ERROR.PERMISSIONS.BOT_PERM["MANAGE_MESSAGES"], ephemeral: true }
        );
    }
    const message = interaction.options.getString("message")!;
    const d = interaction.options.getChannel("channel")!;
    if (d?.isTextBased()) {
        d.send(message)
    } else {
        return void interaction.reply("i cant send messages in a channel that is not a text channel.")
    }
};