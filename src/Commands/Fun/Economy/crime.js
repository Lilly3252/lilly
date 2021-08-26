const { MessageEmbed } = require("discord.js");
const { eco } = require("../../../Structures/Managers");
const Command = require("../../../Structures/Command");

module.exports = class extends (
  Command
) {
  constructor(...args) {
    super(...args, {
      description: "Do some illegal stuff , gain money from it",
      category: "💰Economy",
      usage: "",
    });
  }
  async run(message) {
    const work = [
      "prostitution",
      "selling drugs",
      "human trafficking",
      "hacking the government",
      "stealing data",
      "bootlegging",
    ]
    const illegalwork = work[Math.floor(Math.random() * work.length)];
    const money = Math.floor(Math.random() * 400) + 1
    let add = await eco.addMoney(message.author.id, false, money);
    if (add.cooldown)
      return message.reply(
        `You already worked today. Come back after ${add.time.days} days, ${add.time.hours} hours, ${add.time.minutes} minutes & ${add.time.seconds} seconds.`
      );

      return message.reply(
        `you got ${money} from ${illegalwork} and now you have ${add} coins.`
      );
  }}