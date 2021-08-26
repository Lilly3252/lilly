const Command = require("../../Structures/Command");
module.exports = class extends Command {
  constructor(...a) {
    super(...a, {
      aliases: ["resume"],
      category: "\uD83C\uDFA7Music",
      description: "Resume the music.",
      usage: "",
      options: [
          {
            type: undefined,
            name: undefined,
            description: undefined,
            required: false,
            choices: undefined,
            options: undefined
          }
        ]
    });
  }
  async run(a) {
    const b = a.client.queue.get(a.guild.id);
    return b && !b.playing
      ? ((b.playing = !0),
        b.connection.dispatcher.resume(),
        a.channel.send("\u25B6 Resumed the music for you!"))
      : a.channel.send("There is nothing playing.");
  }
};
