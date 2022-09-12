import { PermissionsBitField, SlashCommandBuilder } from "discord.js";
import { prisma } from '../../index.js';
export const slashy = new SlashCommandBuilder()
    .setName("settings-tags").setDescription("Settings for tags.")
    .addStringOption((option) => option.setName("actions").setDescription("Choose a action").setRequired(true)
    .addChoices({ name: "Create", value: "create" }, { name: "Delete", value: "delete" }, { name: "Modify", value: "modify" }, { name: "ListAll", value: "listall" }).setRequired(true))
    .addStringOption((option) => option.setName("name").setDescription("Name for Tag").setRequired(true))
    .addStringOption((option) => option.setName("message").setDescription("message").setRequired(true))
    .setDefaultMemberPermissions(PermissionsBitField.Flags.Administrator);
export const run = async (interaction) => {
    const choices = interaction.options.getString("actions");
    const name = interaction.options.getString("name");
    const message = interaction.options.getString("message");
    const guild_db = prisma.tags;
    switch (choices) {
        case "create":
            {
                await guild_db.create({
                    data: {
                        "guildID": interaction.guild.id,
                        "name": name,
                        "description": message,
                        "username": interaction.user.username
                    }
                });
                interaction.reply(`Successfully created a tag with ${name}`);
            }
            break;
        case "delete":
            {
                await guild_db.delete({ where: { name: name } });
                interaction.reply(`Successfully deleted a tag with ${name}`);
            }
            break;
        case "modify":
            {
                await guild_db.update({
                    where: { name: name },
                    data: {
                        "name": name,
                        "description": message
                    }
                });
                interaction.reply(`Successfully modified a tag with ${name}`);
            }
            break;
        case "listall":
            {
                const maptag = guild_db.findMany({ select: { name: true } });
                console.log(maptag);
                interaction.reply(`there is a list of all tags.`);
            }
            break;
    }
};
//# sourceMappingURL=setTag.js.map