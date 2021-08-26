const { MessageEmbed } = require("discord.js");
const { eco } = require("../../../Structures/Managers");
const Command = require("../../../Structures/Command");

module.exports = class extends (
  Command
) {
  constructor(...args) {
    super(...args, {
      
      description: "Work",
      category: "💰Economy",
      usage: "",
      
    });
  }
  async run(message) {
    const money = Math.floor(Math.random() * 200) + 1
    let add = await eco.addMoney(message.author.id, false, money);

    message.reply()
  }}