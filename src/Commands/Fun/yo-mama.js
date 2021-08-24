const Command = require('../../Structures/Command');
const jokes = require('../../Structures/JSONs/yo-mama.json');

module.exports = class extends Command {
	constructor(...args) {
	  super(...args, {
		aliases: ["yo-mama"],
		description: "Mommy Insults",
		category: "💃Fun",
		usage: "",
		nsfw: true
	  });
	}
	async run(msg) {
		return msg.channel.send(jokes[Math.floor(Math.random() * jokes.length)]);
	}
};
