const { eco } = require("../../../Structures/Managers");

const Command = require("../../../Structures/Command");

module.exports = class extends (
  Command
) {
  constructor(...args) {
    super(...args, {
      aliases: ["bal"],
      description: "Shows the balance you have",
      category: "💰Economy",
      usage: "",
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
  async run(message) {
    let money = await eco.fetchMoney(message.author.id);
    return message.channel.send(`${message.author} has ${money} coins.`);
  }
};
