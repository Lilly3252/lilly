const Command = require("../../Structures/Command");
const Guild = require("../../Database/models/Guild");
module.exports = class extends (
  Command
) {
  constructor(...args) {
    super(...args, {
      aliases: ["WelcomeMessage"],
      category: "🔔Administrator",
      description: "Set your welcome message for new people when they join",
      usage: "<message>",
      userPerms: ["ADMINISTRATOR"],
    });
  }

  // eslint-disable-next-line no-unused-vars
  async run(message, args) {
    const settings = await Guild.findOne({
        guildID: message.guild.id,
      });
      message.channel.send(`this is your welcome message ${settings.PersonalizedWelcomeMessage}`)
    }
}