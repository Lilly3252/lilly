const Command = require("../../Structures/Command");

module.exports = class extends Command {
  constructor(...args) {
    super(...args, {
      
      description: "Displays the link to get updates for Lilly",
      category: `⁉️Informations`,
      usage: "[command]",
      
    });
  }

  async run(message) {
message.channel.send("https://discord.gg/HMupQGUYZq , Come and have fun! ALL updates for Lilly is there. Come check it out!")}
};
