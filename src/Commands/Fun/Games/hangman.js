const Command = require("../../../Structures/Command");
const hangman = require('discord-hangman');

module.exports = class extends Command {
  constructor(...args) {
    super(...args, {
      
      description: "Hangman mini game ",
      category: "🎲Games",
      usage: ``
    });
  }
  async run(message) {
      message.channel.send("WATCHOUT ! If you have MessageDelete event activated on your server. Every letter that is deleted will trigger the event. Be aware of Spamming.")
    hangman.create(message.channel, 'random', { displayWordOnGameOver: false }).then(data => {

        if(!data.game) return; // If the game is cancelled or no one joins it
    
        if (data.game.status === 'won') {
            if (data.selector) message.channel.send(`Congratulations, you found the word! ${data.selector.username}... You should provide a more complicated word next time!`); // data.selector is the user who chose the word (only in custom game mode)
    
            else message.channel.send('Congratulations you found the word!');
        }
        else if (data.game.status === 'lost') {
            if (data.selector) message.channel.send(`${data.selector.username} Beat you all! The word was ${data.game.word}.`);
            
            else message.channel.send(`You lost! The word was ${data.game.word}.`);
        }
        else {
            message.channel.send('15 minutes have passed! The game is over.'); // If no one answers for 15 minutes
        }
    
    });
  }
};