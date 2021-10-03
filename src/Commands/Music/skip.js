const Command = require("../../Structures/Command");
module.exports = class extends Command {
  constructor(...a) {
    super(...a, {
      
      category: "\uD83C\uDFA7Music",
      description: "Skip the song for you.",
      usage: "",
      
    });
  }
  async run(a) {
    const { channel: b } = a.member.voice;
    if (!b)
      return interaction.reply(
        "I'm sorry but you need to be in a voice channel to play music!"
      );
    const c = a.client.queue.get(a.guild.id);
    return c
      ? void c.connection.dispatcher.end("Skip command has been used!")
      : interaction.reply("There is nothing playing that I could skip for you.");
  }
};
