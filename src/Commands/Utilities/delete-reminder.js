const Command = require("../../Structures/Command");

module.exports = class extends Command {
  constructor(...args) {
    super(...args, {
      
      description: "delete a reminder",
      category: "📝Utilities",
      usage: "[command]",
      
    });
  }

  async run(message) {
	  message.channel.send("this command is not complete , try again later!")
    // * make this work
   /* const exists = await this.client.timers.exists(
      message.channel.id,
      message.author.id
    );
    if (!exists)
      return message.reply("🕰️ You do not have a timer set in this channel.");
    await this.client.timers.deleteTimer(message.channel.id, message.author.id);
    return message.channel.send("🕰️ Your timer has been deleted.");
   */  }
};
