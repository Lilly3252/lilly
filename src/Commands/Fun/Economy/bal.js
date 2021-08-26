const { eco } = require("../../../Structures/Managers");

const Command = require("../../../Structures/Command");

module.exports = class extends (
  Command
) {
  constructor(...args) {
    super(...args, {
      description: "Shows the balance you have",
      category: "💰Economy",
      usage: "",
    });
  }
  async run(message) {
    let money = await eco.fetchMoney(message.author.id);
    return message.channel.send(`${message.author} has ${money} coins.`);
  }
};
