const Command = require('../../Structures/Command');
const teachings = require('../../Structures/JSONs/axis-cult.json');

module.exports = class extends Command {
	constructor(...args) {
	  super(...args, {
		aliases: ["axis-cult"],
		description: "well...",
		category: "💃Fun",
		usage: ""
	  });
	}
	async run(msg) {
		return msg.channel.send(teachings[Math.floor(Math.random() * teachings.length)]);
	}
};
