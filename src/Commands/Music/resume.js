const Command = require("../../Structures/Command");
module.exports = class extends Command {
  constructor(...a) {
    super(...a, {
      
      category: "\uD83C\uDFA7Music",
      description: "Resume the music.",
      usage: "",
      
    });
  }
  async run(a) {
    const b = a.client.queue.get(a.guild.id);
    return b && !b.playing
      ? ((b.playing = !0),
        b.connection.dispatcher.resume(),
        interaction.reply("\u25B6 Resumed the music for you!"))
      : interaction.reply("There is nothing playing.");
  }
};
