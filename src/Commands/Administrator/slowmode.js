const Command = require("../../Structures/Command"),
  { MessageEmbed } = require("discord.js");
module.exports = class extends Command {
  constructor(...a) {
    super(...a, {
      aliases: ["slowmode"],
      description:
        "Place a slowmode to a channel.In seconds",
      category: "\uD83D\uDD14Administrator",
      usage: `<number(seconds)>`,
      userPerms: ["ADMINISTRATOR"],
    });
  }
  async run(a, b) {
    return isNaN(b[0])
      ? a.channel.send("That is not a number!")
      : void (await a.channel
          .setRateLimitPerUser(b[0])
          .then(() => {
            a.channel.send(
              new MessageEmbed({
                title: `Set the slow mode to ${b[0]} seconds`,
              })
            );
          })
          .catch((a) => console.log(a)));
  }
};
