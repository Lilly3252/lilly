const { BattleShip } = require("../../../Structures/Managers");

const Command = require("../../../Structures/Command");


module.exports = class extends Command {
  constructor(...args) {
    super(...args, {
      aliases: ["battleship"],
      description: "create a game of battleship ",
      category: "🎲Games",
      usage: "<MentionMember>",
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
  async run(message){
   await BattleShip.createGame(message);
  };
};