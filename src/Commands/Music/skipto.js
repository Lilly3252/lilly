const Command = require("../../Structures/Command");
module.exports = class extends Command {
  constructor(...a) {
    super(...a, {
      
      category: "\uD83C\uDFA7Music",
      description: "Skipping the queue to the number desired.",
      usage: "<number>",
      
    });
  }
  async run(a, b) {
    if (!b.length || isNaN(b[0]))
      return a
        .reply("I need a number to be able to skip to the song..")
        .catch(console.error);
    const c = a.client.queue.get(a.guild.id);
    if (!c) return a.channel.send("There is no queue.").catch(console.error);
    if (
      (function (a) {
        const { channelID: b } = a.voice,
          c = a.guild.voice.channelID;
        return (
          b === c ||
          void a
            .send("You need to join the voice channel first!")
            .catch(console.error)
        );
      })(a.member)
    ) {
      if (b[0] > c.songs.length)
        return a
          .reply(`The queue is only ${c.songs.length} songs long!`)
          .catch(console.error);
      if (((c.playing = !0), c.loop))
        for (let a = 0; a < b[0] - 2; a++) c.songs.push(c.songs.shift());
      else c.songs = c.songs.slice(b[0] - 2);
      c.connection.dispatcher.end(),
        c.textChannel
          .send(`${a.author} ⏭ skipped ${b[0] - 1} songs`)
          .catch(console.error);
    }
  }
};
