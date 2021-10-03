const { MessageEmbed } = require("discord.js");
const { eco } = require("../../../Structures/Managers");
const Command = require("../../../Structures/Command");

module.exports = class extends (
  Command
) {
  constructor(...args) {
    super(...args, {
      
      description: "Shows the leaderboard",
      category: "💰Economy",
      usage: "",
      
    });
  }
  async run(message) {
    let lb = await eco.leaderboard(false, 10);
    const embed = new MessageEmbed()
      .setAuthor("Leaderboard")
      .setColor("BLURPLE");
    lb.forEach((u) => {
      embed.addField(
        `${u.position}. ${message.client.users.cache.get(u.user).tag}`,
        `Money: ${u.money} 💸`
      );
    });
    return interaction.reply(embed);
  }
};
