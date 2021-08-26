const Command = require('../../Structures/Command');
const compliments = require('../../Structures/JSONs/compliment.json');
module.exports = class extends Command {
	constructor(...args) {
	  super(...args, {
		aliases: ["compliment"],
		description: "Want a compliment?",
		category: "💃Fun",
		usage: "",
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
	async run(msg) {
		return msg.channel.send(compliments[Math.floor(Math.random() * compliments.length)]);
	}
};
