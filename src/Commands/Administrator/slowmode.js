const Command = require("../../Structures/Command"),
  { MessageEmbed } = require("discord.js");
module.exports = class extends Command {
  constructor(...a) {
    super(...a, {
      
      description:
        "Place a slowmode to a channel.In seconds",
      category: "\uD83D\uDD14Administrator",
      usage: `<number(seconds)>`,
      userPerms: ["ADMINISTRATOR"],
      options: [
          {
            type: "NUMBER",
            name: "seconds",
            description: "seconds needed to slowmode",
            required: true
          }
        ]
    });
  }
  async run(a, b) {
    return isNaN(b[0])
      ? interaction.reply("That is not a number!")
      : void (await a.channel
          .setRateLimitPerUser(b[0])
          .then(() => {
            interaction.reply(
              new MessageEmbed({
                title: `Set the slow mode to ${b[0]} seconds`,
              })
            );
          })
          .catch((a) => console.log(a)));
  }
};
