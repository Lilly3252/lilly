import { PermissionsBitField, SlashCommandBuilder } from "discord.js";
//import SYSTEM from "../../structures/messageSystem.json";
//import Guild from "../../database/guild";
//import * as Embed from "../../structures/messageEmbeds.js";
export const slashy = new SlashCommandBuilder()
    .setName("unmute")
    .setDescription("unmute a member.")
    .addMentionableOption((option) => option.setName("member").setDescription("Mention someone")
    .setRequired(true))
    .setDefaultMemberPermissions(PermissionsBitField.Flags.MuteMembers);
export const run = async (interaction) => {
    await interaction.reply({ content: "This command is not finished yet.", ephemeral: true });
};
//# sourceMappingURL=unmute.js.map