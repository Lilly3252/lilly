const Event = require("../../Structures/Event");

module.exports = class interactionCreate extends Event {
  async run(interaction) {
    //console.log(interaction) // that works no need to check anymore
    if (interaction.user.bot || !interaction.isCommand() || !interaction.guild)
      return;
    const command = this.client.commands.get(interaction.commandName);
    //console.log(this.client.commands)
    //console.log(command)
    if (!command) return interaction.reply("Cannot find that command...");

    command.run(interaction);
  }
};
