import { PermissionsBitField, SlashCommandBuilder } from "discord.js";
import SYSTEM from "../../structures/messageSystem.json";
export const slashy = new SlashCommandBuilder()
    .setName("purge").setDescription("purge messages in a channel")
    .addNumberOption((option) => option.setName("number").setDescription("number of messages from 1-99").setRequired(true))
    .setDefaultMemberPermissions(PermissionsBitField.Flags.ManageMessages);
export const run = async (interaction) => {
    if (!interaction.guild.members.me?.permissions.has(PermissionsBitField.Flags.ManageMessages)) {
        return void interaction.reply({ content: SYSTEM.ERROR.PERMISSIONS.BOT_PERM["MANAGE_MESSAGES"], ephemeral: true });
    }
    const count = interaction.options.getNumber("number");
    if (count > 100)
        return void interaction.reply({ content: SYSTEM.ERROR.ADMIN.VALID_AMOUNT, ephemeral: true });
    try {
        await interaction.channel?.bulkDelete(count).then(() => {
            interaction.reply(`Deleted ${count} messages.`);
        });
    }
    catch {
        return void interaction.reply({ content: SYSTEM.ERROR.ADMIN.MESSAGE_DELETED, ephemeral: true });
    }
};
//# sourceMappingURL=purge.js.map