import { PermissionsBitField, SlashCommandBuilder } from "discord.js";
import SYSTEM from "../../structures/messageSystem.json";
export const slashy = new SlashCommandBuilder()
    .setName("unban").setDescription("unban a member.")
    .addStringOption((option) => option.setName("id").setDescription("put a id").setRequired(true))
    .addStringOption((option) => option.setName("reason").setDescription("reason to unban").setRequired(true))
    .setDefaultMemberPermissions(PermissionsBitField.Flags.BanMembers);
export const run = async (interaction) => {
    if (!interaction.guild.members.me?.permissions.has(PermissionsBitField.Flags.BanMembers)) {
        return void interaction.reply({ content: SYSTEM.ERROR.PERMISSIONS.BOT_PERM["BAN_MEMBERS"], ephemeral: true });
    }
    const banned_person = interaction.options.getString("id");
    if (isNaN(+banned_person))
        return void interaction.reply({ content: SYSTEM.ERROR.ADMIN.NO_USER_ID, ephemeral: true });
    const d = interaction.options.getString("reason");
    interaction.guild.bans.fetch().then(async (guildban) => {
        if (guildban.size == 0)
            return interaction.reply({ content: SYSTEM.ERROR.ADMIN.NO_USER_BANNED, ephemeral: true });
        const findBanned = guildban.find((a) => a.user.id == banned_person);
        return findBanned
            ? void (await interaction.guild.members.unban(findBanned.user, d)
                .catch((a) => console.log(a)),
                interaction.reply({ content: `**${findBanned.user}** has been unban`, ephemeral: true }))
            : interaction.reply({ content: "this user is not banned", ephemeral: true });
    });
};
//# sourceMappingURL=unban.js.map