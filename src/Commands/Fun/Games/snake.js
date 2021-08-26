const Command = require("../../../Structures/Command");
const { snakeGame } = require("../../../Structures/Managers");

module.exports = class extends Command {
  constructor(...args) {
    super(...args, {
      aliases: ["snake"],
      description: "snnnaaaaaakkkee",
      category: "🎲Games",
      usage: ``,
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
  async run(message) {
    snakeGame.newGame(message);
  }
};
