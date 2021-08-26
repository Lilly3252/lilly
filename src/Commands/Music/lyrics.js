const Command = require("../../Structures/Command"),
  { MessageEmbed } = require("discord.js"),
  lyricsFinder = require("lyrics-finder");
module.exports = class extends Command {
  constructor(...a) {
    super(...a, {
      
      category: "\uD83C\uDFA7Music",
      description: "Get the lyric of the current song.",
      
    });
  }
  async run(a) {
    const b = a.client.queue.get(a.guild.id);
    if (!b)
      return a.channel.send("There is nothing playing.").catch(console.error);
    let c = null;
    try {
      (c = await lyricsFinder(b.songs[0].title, "")),
        c || (c = `No lyrics found for ${b.songs[0].title}.`);
    } catch (a) {
      c = `No lyrics found for ${b.songs[0].title}.`;
    }
    const d = new MessageEmbed()
      .setTitle(`${b.songs[0].title} — Lyrics`)
      .setDescription(c)
      .setColor("#F8AA2A")
      .setTimestamp();
    return (
      2048 <= d.description.length &&
        (d.description = `${d.description.substr(0, 2045)}...`),
      a.channel.send(d).catch(console.error)
    );
  }
};
