const Command = require("../../Structures/Command");
const moment = require("moment");
const { shorten } = require("../../Structures/Util");

module.exports = class extends Command {
  constructor(...args) {
    super(...args, {
      aliases: ["remind"],
      description: "Displays all the commands in the bot",
      category: "📝Utilities",
      usage: "[command] + thing to remember",
      args: [
        {
          key: "time",
          prompt: "What do you want me to remind you about, and in how long?",
          type: "sherlock",
        },
      ],
    });
  }

  async run(message, { time }) {
	message.channel.send("this command is not complete , try again later!") 
  // * make this work  
    /*const exists = await this.client.timers.exists(
      message.channel.id,
      message.author.id
    );
    if (exists)
      return message.reply(
        "🕰️ Only one reminder can be set per channel per user."
      );
    const timeMs = time.startDate.getTime() - Date.now();
    if (timeMs > 0x7fffffff)
      return message.reply(
        "🕰️ Reminders have a maximum length of ~24.84 days."
      );
    const display = moment().add(timeMs, "ms").fromNow();
    const title = time.eventTitle ? shorten(time.eventTitle, 500) : "something";
    await this.client.timers.setTimer(
      message.channel.id,
      timeMs,
      message.author.id,
      title
    );
    return message.channel.send(
      `🕰️ Okay, I will remind you **"${title}"** ${display}.`
    );
	*/}
};
