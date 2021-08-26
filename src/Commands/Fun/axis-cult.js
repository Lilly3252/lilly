const Command = require('../../Structures/Command');
const teachings = require('../../Structures/JSONs/axis-cult.json');

module.exports = class extends Command {
	constructor(...args) {
	  super(...args, {
		aliases: ["axis-cult"],
		description: "well...",
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
		return msg.channel.send(teachings[Math.floor(Math.random() * teachings.length)]);
	}
};
