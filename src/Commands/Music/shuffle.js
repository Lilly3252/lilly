const Command = require("../../Structures/Command");

module.exports = class extends Command {
  constructor(...args) {
    super(...args, {
      aliases: ["shuffle"],
      category: "🎧Music",
      description:"shuffle the music.",
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

  // eslint-disable-next-line no-unused-vars
  async run(message, args) {}}