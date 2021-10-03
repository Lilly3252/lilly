const { MessageEmbed } = require("discord.js");
const { eco } = require("../../../Structures/Managers");
const Command = require("../../../Structures/Command");

module.exports = class extends (
  Command
) {
  constructor(...args) {
    super(...args, {
      description:
        "Gamble , win something",
      category: "💰Economy",
      usage: "",
    });
  }
  async run(message, args) {
    const mo = Number(args);
    console.log(typeof mo)
    const userMoney = eco.fetchMoney(message.author.id,false)
    if (!mo) return interaction.reply("I need a number!");
    if (isNaN(mo)) return interaction.reply("I need a number!");
    const money = Math.floor(Math.random() * 2000) + 1;

    if(mo > userMoney) interaction.reply("hey ! you can't gamble more money that you actually have in your bank!")
    if (mo > money) {
      await eco.addMoney(message.author.id, false, mo);
      interaction.reply(`You won ${mo}! i had ${money}, you now have ${userMoney}`);
    }
    if (mo < money) {
      await eco.subtractMoney(message.author.id, false, mo);
      interaction.reply(`You lose ${mo}! i had ${money}, you now have ${userMoney}`);
    }
  }
};
