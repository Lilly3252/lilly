const Command = require("../../Structures/Command");

module.exports = class extends Command {
  constructor(...args) {
    super(...args, {
      
      category: "🎧Music",
      description:"shuffle the music.",
      usage:"",
      
    });
  }

  // eslint-disable-next-line no-unused-vars
  async run(message, args) {}}