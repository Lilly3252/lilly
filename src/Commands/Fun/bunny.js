const Command = require('../../Structures/Command');
const bunny = require('../../Structures/JSONs/bunny-fact.json');
module.exports = class extends Command {
	constructor(...args) {
	  super(...args, {
		aliases: ["bunny"],
		description: "Want a bunny fact?",
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
		return msg.channel.send(bunny[Math.floor(Math.random() * bunny.length)]);
	}
};
