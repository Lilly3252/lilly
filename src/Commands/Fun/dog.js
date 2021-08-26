const Command = require('../../Structures/Command');
const dog = require('../../Structures/JSONs/dog-fact.json');
module.exports = class extends Command {
	constructor(...args) {
	  super(...args, {
		
		description: "Want a dog fact?",
		category: "💃Fun",
		usage: "",
		
	  });
	}
	async run(msg) {
		return msg.channel.send(dog[Math.floor(Math.random() * dog.length)]);
	}
};
