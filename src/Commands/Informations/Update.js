const { MessageEmbed } = require("discord.js");
const Command = require("../../Structures/Command");
const emoji = require("../../Structures/JSONs/emoji.json")
module.exports = class extends Command {
    constructor(...args) {
      super(...args, {
        
        description:
          "Shows the current update.",
        category: "⁉️Informations",
        usage:"",
        
      });
    }
  
    async run(message, args) {
      const embed = new MessageEmbed()
      .setTitle(`yo ${emoji[":blobyes:"]}`)
      .setDescription(`Description! ${emoji[":blobyes:"]}`)
      .addField(`this is a field ${emoji[":blobyes:"]}` , `this is the value lol ${emoji[":blobyes:"]}`)
      .setFooter(`this is a footer ${emoji[":blobyes:"]}`)
      
      interaction.reply(embed)
    }}