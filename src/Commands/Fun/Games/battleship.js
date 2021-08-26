const { BattleShip } = require("../../../Structures/Managers");

const Command = require("../../../Structures/Command");


module.exports = class extends Command {
  constructor(...args) {
    super(...args, {
      
      description: "create a game of battleship ",
      category: "🎲Games",
      usage: "<MentionMember>",
      options: [
          {
            type: "MENTIONABLE",
            name: "member",
            description: "Select someone to play with.",
            required: true
          }
        ]
    });
  }
  async run(message){
   await BattleShip.createGame(message);
  };
};