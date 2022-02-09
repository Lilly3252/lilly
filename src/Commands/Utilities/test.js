const { SlashCommandBuilder } = require("@discordjs/builders");
const emoji = require("../../Structures/JSONs/emoji.json");
const { MessageAttachment, MessageEmbed } = require("discord.js");
const Embeds = require("./../../Structures/messageEmbeds")
module.exports = {
  data: new SlashCommandBuilder()
    .setName("test")
    .setDescription("test embeds."),

  async run(interaction) {
    //const attachment = new MessageAttachment('src/Images/person-my-girl-wants-be-flash-halloween-thebedaz-zledunicorn.jpeg', 'flash.jpeg');
    //interaction.reply({ embeds: [Embeds(interaction)], files: [attachment] });
    

  },
};

