const { MessageEmbed } = require("discord.js");
const { eco } = require("../../../Structures/Managers");
const Command = require("../../../Structures/Command");

module.exports = class extends (
  Command
) {
  constructor(...args) {
    super(...args, {
      aliases: ["give"],
      description: "Give money to someone.",
      category: "💰Economy",
      usage: "",
    });
  }
  async run(message,args) {
    let userID = args[0];
    if(!userID) message.channel.send("an error occurred! please try again")
    const money = Math.floor(Math.random() * 200) + 1
    let add = await eco.addMoney(userID, false, money);
    let mentionedMemberMoney = await eco.fetchMoney(userID,false)
    
    message.reply(`Thank you for your donation! ${userID} has now ${mentionedMemberMoney}`)
  }}