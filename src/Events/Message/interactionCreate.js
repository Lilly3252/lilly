const Event = require("../../Structures/Event");

module.exports = class interactionCreate extends Event {
  async run(interaction, message) {
    if (!interaction.isCommand()) return;

    //console.log(interaction);
    console.log(
      `${interaction.commandName} command was used by ${interaction.user.username} in ${interaction.guildId} , in channel : ${interaction.channelId} `
    );
    if (!this.client.application?.owner) await this.client.application?.fetch();

    {
      const commands = [...this.client.commands.values()].map((command) => ({
        name: command.name,
        description: command.description?.trim(), //  (command.description.substr(0, 97) + command.description.length > 97 ? '...' : '') : 'No description!',
        options: command.options ?? [],
      }));

      await this.client.application.commands.set(commands);

      const i = this.client.commands.get(commands);
      
        i.run(interaction);
      }
    }
  }
;
