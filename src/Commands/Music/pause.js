const Command = require("../../Structures/Command");
module.exports = class extends Command {
  constructor(...a) {
    super(...a, {
      aliases: ["pause"],
      category: "\uD83C\uDFA7Music",
      description: "Pause the music.",
    });
  }
  async run(a) {
    const b = a.client.queue.get(a.guild.id);
    return b && b.playing
      ? ((b.playing = !1),
        b.connection.dispatcher.pause(),
        a.channel.send("\u23F8 Paused the music for you!"))
      : a.channel.send("There is nothing playing.");
  }
};
