const Command = require("../../Structures/Command");
module.exports = class extends Command {
  constructor(...a) {
    super(...a, {
      aliases: ["voicekick"],
      category: "\uD83C\uDFA7Music",
      description: `kicking a member or the bot from the voice channel.`,
      usage: "@mention",
      userPerms: ["ADMINISTRATOR"],
      botPerms: ["MOVE_MEMBERS"],
    });
  }
  async run(a) {
    const b = a.mentions.members.first();
    return b
      ? b.voiceChannel
        ? void (b.voice.setChannel(null), a.react("\uD83D\uDC4C"))
        : a.reply("That user/bot isn't in a voice channel.")
      : a.reply("Well ... Okay? but who??");
  }
};
