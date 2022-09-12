import { PermissionsBitField, SlashCommandBuilder } from "discord.js";
import SYSTEM from "../../structures/messageSystem.json";
export const slashy = new SlashCommandBuilder()
    .setName("slowmode")
    .setDescription("slowmode a channel.")
    .addChannelOption((option) => option.setName("channel").setDescription("channel name")
    .setRequired(true))
    .addNumberOption((option) => option.setName("number").setDescription("Enter a number").setRequired(true))
    .setDefaultMemberPermissions(PermissionsBitField.Flags.ManageChannels);
export const run = async (interaction) => {
    if (!interaction.guild.members.me?.permissions.has(PermissionsBitField.Flags.ManageChannels)) {
        return void interaction.reply({ content: SYSTEM.ERROR.PERMISSIONS.BOT_PERM["MANAGE_CHANNELS"], ephemeral: true });
    }
    const channel = interaction.options.getChannel("channel");
    const time = interaction.options.getNumber("number");
    if (isNaN(time)) {
        interaction.reply("That is not a number!");
    }
    else {
        if (channel.isTextBased()) {
            await channel.setRateLimitPerUser(time).then(() => {
                interaction.reply(`Set the slow mode to ${time} seconds`), { ephemeral: true };
            })
                .catch((a) => console.log(a));
        }
    }
};
//# sourceMappingURL=slowmode.js.map