const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
data : new SlashCommandBuilder()
        .setName('delete-reminder')
        .setDescription('delete a reminder.')
  ,
  async run(interaction) {
	  interaction.reply("this command is not complete , try again later!")
    // * make this work
   /* const exists = await interaction.client.timers.exists(
      message.channel.id,
      message.author.id
    );
    if (!exists)
      return message.reply("🕰️ You do not have a timer set in this channel.");
    await interaction.client.timers.deleteTimer(message.channel.id, message.author.id);
    return interaction.reply("🕰️ Your timer has been deleted.");
   */  }
};
