const Command = require("../../../Structures/Command");
const { snakeGame } = require("../../../Structures/Managers");

module.exports = class extends Command {
  constructor(...args) {
    super(...args, {
      aliases: ["snake"],
      description: "snnnaaaaaakkkee",
      category: "🎲Games",
      usage: ``,
    });
  }
  async run(message) {
    snakeGame.newGame(message);
  }
};
