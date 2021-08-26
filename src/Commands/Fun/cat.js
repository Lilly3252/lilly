const Command = require('../../Structures/Command');
const cat = require('../../Structures/JSONs/cat-fact.json');
module.exports = class extends Command {
	constructor(...args) {
	  super(...args, {
		
		description: "Want a cat fact?",
		category: "💃Fun",
		usage: "",
		
	  });
	}
	async run(msg) {
		return msg.channel.send(cat[Math.floor(Math.random() * cat.length)]);
	}
};
