const Event = require("../../Structures/Event");


module.exports = class interactionCreate extends Event {
  async run(interaction) {
    
    if (!interaction.isCommand()) return;
    
    //console.log(interaction)
    console.log(`${interaction.commandName} command was used by ${interaction.user.username} in ${interaction.guildId} , in channel : ${interaction.channelId} `)
  }
};
