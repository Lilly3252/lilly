const Command = require('../../Structures/Command');
const puns = require('../../Structures/JSONs/pun.json');

module.exports = class extends Command {
	constructor(...args) {
	  super(...args, {
		aliases: ["pun"],
		description: "pun time!",
		category: "💃Fun",
		usage: ""
	  });
	}
	async run(msg) {
		return msg.channel.send(puns[Math.floor(Math.random() * puns.length)]);
	}
};
