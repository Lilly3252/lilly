const { SlashCommandBuilder } = require("@discordjs/builders");
const emoji = require("../../Structures/JSONs/emoji.json");
const { MessageAttachment, MessageEmbed } = require("discord.js");
const Embeds = require("./../../Structures/messageEmbeds")
module.exports = {
  data: new SlashCommandBuilder()
    .setName("timezone")
    .setDescription("get a specific timezone.")
    .addStringOption((option) => option.setName("timezone").setDescription("Select a timezone.")
      .addChoices({name:"Universal",value: "UTC"}, {name:"European Central",value: "ECT"}, {name:"Eastern European/Egypt Standard",value: "EET"}, {name:"Eastern African",value: "EAT"}, {name:"Middle East", value:"MET"},
        {name:"Near East",value: "NET"}, {name:"Pakistan", value:"PLT"}, {name:"India", value:"IST"}, {name:"Bangladesh",value: "BST"}, {name:"Vietnam",value: "VST"},
        {name:"China", value:"CTT"}, {name:"Japan",value: "JST"}, {name:"Australia Central",value: "ACT"}, {name:"Australia Eastern",value: "AET"}, {name:"Singapore",value: "SST"},
        {name:"New Zealand",value: "NST"}, {name:"Midway",value: "MIT"}, {name:"Hawaii",value: "HST"}, {name:"Alaska",value: "AST"}, {name:"Pacific", value:"PST"},
        {name:"Phoenix/Mountain",value: "PNT"}, {name:"Central", value:"CST"}, {name:"Eastern/Indiana",value: "EST"}, {name:"Puerto Rico/US Virgin Islands", value:"PRT"}, {name:"Argentina/brazil",value: "AGT"}
      )),

  async run(interaction) {
    const timezone = interaction.options.getString("timezone")

    const str = new Date().toLocaleString('en-US', { timeZone: `${timezone}` });

    interaction.reply(`${str}`)
  },
};
