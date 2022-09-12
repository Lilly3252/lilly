import { PermissionsBitField, SlashCommandBuilder } from "discord.js";
import SYSTEM from "../../structures/messageSystem.json";
export const slashy = new SlashCommandBuilder()
    .setName("lock")
    .setDescription("Lock a channel")
    .addBooleanOption((option) => option
    .setName("choice")
    .setDescription("Select a boolean")
    .setRequired(true))
    .setDefaultMemberPermissions(PermissionsBitField.Flags.ManageChannels);
export const run = async (interaction) => {
    if (!interaction.guild.members.me?.permissions.has(PermissionsBitField.Flags.ManageChannels)) {
        return void interaction.reply({ content: SYSTEM.ERROR.PERMISSIONS.BOT_PERM["MANAGE_CHANNELS"], ephemeral: true });
    }
    const role = interaction.guild.roles.everyone;
    const lockChoice = interaction.options.getBoolean("choice");
    if (lockChoice === true) {
        role.permissions.remove("SendMessages");
        return void interaction.reply("This channel has been successfully locked for moderation purposes");
    }
    else {
        role.permissions.add("SendMessages");
    }
    return void interaction.reply("This channel has been unlocked!");
};
//# sourceMappingURL=lock.js.map