const Command = require('../../Structures/Command');
const compliments = require('../../Structures/JSONs/compliment.json');
module.exports = class extends Command {
	constructor(...args) {
	  super(...args, {
		
		description: "Want a compliment?",
		category: "💃Fun",
		usage: "",
		
	  });
	}
	async run(msg) {
		return msg.channel.send(compliments[Math.floor(Math.random() * compliments.length)]);
	}
};
