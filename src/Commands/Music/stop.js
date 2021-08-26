const Command = require("../../Structures/Command");
module.exports = class extends Command {
  constructor(...a) {
    super(...a, {
      aliases: ["stop"],
      category: "\uD83C\uDFA7Music",
      description: "Stop the music.",
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
    const { channel: b } = a.member.voice;
    if (!b)
      return a.channel.send(
        "I'm sorry but you need to be in a voice channel to play music!"
      );
    const c = a.client.queue.get(a.guild.id);
    return c
      ? void ((c.songs = []),
        c.connection.dispatcher.end("Stop command has been used!"))
      : a.channel.send("There is nothing playing that I could stop for you.");
  }
};
