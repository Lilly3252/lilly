const Command = require('../../Structures/Command');
const bunny = require('../../Structures/JSONs/bunny-fact.json');
module.exports = class extends Command {
	constructor(...args) {
	  super(...args, {
		
		description: "Want a bunny fact?",
		category: "💃Fun",
		usage: "",
		
	  });
	}
	async run(msg) {
		return msg.channel.send(bunny[Math.floor(Math.random() * bunny.length)]);
	}
};
