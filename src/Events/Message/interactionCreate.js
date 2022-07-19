const Event = require("../../Structures/Event");
const {InteractionType} = require("discord.js")
module.exports = class interactionCreate extends Event {
  async run(interaction) {
    if (interaction.user.bot || !interaction.type === InteractionType.ApplicationCommand || !interaction.guild)
      return;
    const command = this.client.commands.get(interaction.commandName);
    if (!command) return interaction.reply("Cannot find that command...");

    command.run(interaction);
  }
};
