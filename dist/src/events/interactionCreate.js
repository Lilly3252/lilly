export const name = 'interactionCreate';
export const once = false;
export const run = async (interaction) => {
    if (interaction.isChatInputCommand() || interaction.isContextMenuCommand()) {
        return void handleCommand(interaction);
    }
    if (interaction.isAutocomplete()) {
        return void handleAutocomplete(interaction);
    }
    if (interaction.isModalSubmit()) {
        return void handleModal(interaction);
    }
    if (interaction.isButton()) {
        console.log(interaction);
    }
};
const handleCommand = async (interaction) => {
    try {
        if (interaction.isChatInputCommand()) {
            const command = interaction.client.commands.get(interaction.commandName);
            if (command) {
                await command.run(interaction);
            }
        }
        if (interaction.isContextMenuCommand()) {
            const command = interaction.client.commands.get(interaction.commandName);
            if (command) {
                await command.run(interaction);
            }
        }
    }
    catch (err) {
        return void interaction.reply("Cannot find that command...");
    }
};
const handleAutocomplete = async (interaction) => {
    try {
        const command = interaction.client.commands.get(interaction.commandName);
        if (command) {
            await command.run(interaction);
        }
    }
    catch (err) {
        return interaction.respond([]);
    }
};
const handleModal = async (interaction) => {
    try {
        const modal = interaction.client.modals.get(interaction.customId);
        if (modal) {
            await modal.run(interaction);
        }
    }
    catch (err) {
        return void interaction.reply("Cannot find that modal...");
    }
};
//# sourceMappingURL=interactionCreate.js.map