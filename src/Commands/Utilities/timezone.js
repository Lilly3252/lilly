const { SlashCommandBuilder } = require("@discordjs/builders");
const emoji = require("../../Structures/JSONs/emoji.json");
const { MessageAttachment, MessageEmbed } = require("discord.js");
const Embeds = require("./../../Structures/messageEmbeds")
module.exports = {
  data: new SlashCommandBuilder()
    .setName("timezone")
    .setDescription("get a specific timezone.")
    .addStringOption((option) => option.setName("timezone").setDescription("Select a timezone.")
      .addChoices([
        ["Universal", "UTC"], ["European Central", "ECT"], ["Eastern European/Egypt Standard", "EET"], ["Eastern African", "EAT"], ["Middle East", "MET"],
        ["Near East", "NET"], ["Pakistan", "PLT"], ["India", "IST"], ["Bangladesh", "BST"], ["Vietnam", "VST"],
        ["China", "CTT"], ["Japan", "JST"], ["Australia Central", "ACT"], ["Australia Eastern", "AET"], ["Singapore", "SST"],
        ["New Zealand", "NST"], ["Midway", "MIT"], ["Hawaii", "HST"], ["Alaska", "AST"], ["Pacific", "PST"],
        ["Phoenix/Mountain", "PNT"], ["Central", "CST"], ["Eastern/Indiana", "EST"], ["Puerto Rico/US Virgin Islands", "PRT"], ["Argentina/brazil", "AGT"],
      ])),

  async run(interaction) {
    const timezone = interaction.options.getString("timezone")

    const str = new Date().toLocaleString('en-US', { timeZone: `${timezone}` });

    interaction.reply(`${str}`)
  },
};
