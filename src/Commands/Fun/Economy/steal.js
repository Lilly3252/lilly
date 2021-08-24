const { MessageEmbed } = require("discord.js");
const { eco } = require("../../../Structures/Managers");
const Command = require("../../../Structures/Command");

module.exports = class extends (
  Command
) {
  constructor(...args) {
    super(...args, {
      aliases: ["Steal"],
      description: "Steal a random amount of money , on someone else",
      category: "💰Economy",
      usage: "",
    });
  }
  async run(message) {
    const mentionedMember = message.mentions.members.first();
    const money = Math.floor(Math.random() * 200) + 1
    let add = await eco.addMoney(message.author.id, false, money);

    message.reply()
  }}