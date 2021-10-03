const Command = require("../../Structures/Command");
module.exports = class extends Command {
  constructor(...a) {
    super(...a, {
      
      category: "\uD83C\uDFA7Music",
      description: "Set the volume to the volume desired ( blocked at 10 )",
      usage: "<number>",
      options: [
          {
            type: "NUMBER",
            name: "volume",
            description: "Set the volume to the volume desired ( blocked at 10 )",
            required: true
          }
        ]
    });
  }
  async run(a, b) {
    const { channel: c } = a.member.voice;
    if (!c)
      return interaction.reply(
        "I'm sorry but you need to be in a voice channel to play music!"
      );
    const d = a.client.queue.get(a.guild.id);
    return d
      ? b[0]
        ? 10 < b[0]
          ? interaction.reply(
              `❌ Nuh no ! my maximum is 10 , don't try to go higher`
            )
          : ((d.volume = b[0]),
            d.connection.dispatcher.setVolumeLogarithmic(b[0] / 5),
            interaction.reply(`I set the volume to: **${b[0]}**`))
        : interaction.reply(`The current volume is: **${d.volume}**`)
      : interaction.reply("There is nothing playing.");
  }
};
