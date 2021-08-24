const Command = require("../../Structures/Command");
module.exports = class extends Command {
  constructor(...a) {
    super(...a, {
      aliases: ["skip"],
      category: "\uD83C\uDFA7Music",
      description: "Skip the song for you.",
      usage: "",
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
      ? void c.connection.dispatcher.end("Skip command has been used!")
      : a.channel.send("There is nothing playing that I could skip for you.");
  }
};
