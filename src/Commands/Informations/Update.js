const { MessageEmbed } = require("discord.js");
const Command = require("../../Structures/Command");
const emoji = require("../../Structures/JSONs/emoji.json")
module.exports = class extends Command {
    constructor(...args) {
      super(...args, {
        aliases: ["updates"],
        description:
          "Shows the current update.",
        category: "⁉️Informations",
        usage:"",
        options: [
          {
            type: undefined,
            name: undefined,
            description: undefined,
            required: false,
            choices: undefined,
            options: undefined
          }
        ]
      });
    }
  
    async run(message, args) {
      const embed = new MessageEmbed()
      .setTitle(`yo ${emoji[":blobyes:"]}`)
      .setDescription(`Description! ${emoji[":blobyes:"]}`)
      .addField(`this is a field ${emoji[":blobyes:"]}` , `this is the value lol ${emoji[":blobyes:"]}`)
      .setFooter(`this is a footer ${emoji[":blobyes:"]}`)
      
      message.channel.send(embed)
    }}