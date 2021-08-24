const Command = require('../../Structures/Command');
const jokes = require('../../Structures/JSONs/joke.json');
module.exports = class extends Command {
	constructor(...args) {
	  super(...args, {
		aliases: ["joke"],
		description: "Want a joke?",
		category: "💃Fun",
		usage: ""
	  });
	}
	async run(msg) {
		return msg.channel.send(jokes[Math.floor(Math.random() * jokes.length)]);
	}
};
