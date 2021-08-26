const Command = require("../../Structures/Command")
const { Util } = require("discord.js")
  //const ytdl = require("ytdl-core");
module.exports = class extends Command {
  constructor(...a) {
    super(...a, {
      
      category: "\uD83C\uDFA7Music",
      description: "Play music using a youtube link",
      usage: "<link>",
      botPerms: ["CONNECT", "SPEAK"],
      
    });
  }
  async run(a, b) {
    /*const { channel: c } = a.member.voice;
    console.log(c)
    if (!c)
      return a.channel.send(
        "\u274C I'm sorry but you need to be in a voice channel to play music!"
      );
    const d = await ytdl.validateURL(b[0]);
    if (!d)
      return a.channel.send(
        `❌ Nuh No! i can't search by words , please enter a proper youtube link. `
      );
    const e = a.client.queue.get(a.guild.id),
      f = await ytdl.getInfo(b[0].replace(/<(.+)>/g, "$1")),
      g = {
        id: f.videoDetails.videoId,
        title: Util.escapeMarkdown(f.videoDetails.title),
        url: f.videoDetails.video_url,
      };
    if (e)
      return (
        e.songs.push(g),
        a.channel.send(`✅ **${g.title}** has been added to the queue!`)
      );
    const h = {
      textChannel: a.channel,
      voiceChannel: c,
      connection: null,
      songs: [],
      volume: 2,
      playing: !0,
      loop: !1,
    };
    a.client.queue.set(a.guild.id, h), h.songs.push(g);
    const i = async (b) => {
      const c = a.client.queue.get(a.guild.id);
      if (!b)
        return c.voiceChannel.leave(), void a.client.queue.delete(a.guild.id);
      const d = c.connection
        .play(ytdl(b.url))
        .on("finish", () => {
          c.songs.shift(), i(c.songs[0]);
        })
        .on("error", (a) => console.error(a));
      d.setVolumeLogarithmic(c.volume / 5),
        c.textChannel.send(`🎶 Start playing: **${b.title}**`);
    };
    try {
      const a = await c.join();
      (h.connection = a), i(h.songs[0]);
    } catch (b) {
      return (
        console.error(`I could not join the voice channel: ${b}`),
        a.client.queue.delete(a.guild.id),
        await c.leave(),
        a.channel.send(`I could not join the voice channel: ${b}`)
      );
    }
  */}
};
