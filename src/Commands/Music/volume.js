const Command = require("../../Structures/Command");
module.exports = class extends Command {
  constructor(...a) {
    super(...a, {
      aliases: ["volume"],
      category: "\uD83C\uDFA7Music",
      description: "Set the volume to the volume desired ( blocked at 10 )",
      usage: "<number>",
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
  async run(a, b) {
    const { channel: c } = a.member.voice;
    if (!c)
      return a.channel.send(
        "I'm sorry but you need to be in a voice channel to play music!"
      );
    const d = a.client.queue.get(a.guild.id);
    return d
      ? b[0]
        ? 10 < b[0]
          ? a.channel.send(
              `❌ Nuh no ! my maximum is 10 , don't try to go higher`
            )
          : ((d.volume = b[0]),
            d.connection.dispatcher.setVolumeLogarithmic(b[0] / 5),
            a.channel.send(`I set the volume to: **${b[0]}**`))
        : a.channel.send(`The current volume is: **${d.volume}**`)
      : a.channel.send("There is nothing playing.");
  }
};
