const Command = require('../../Structures/Command');
const facts = require('../../Structures/JSONs/fact-core.json');

module.exports = class extends Command {
	constructor(...args) {
	  super(...args, {
		aliases: ["fact-core"],
		description: "fact-core",
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
		return msg.channel.send(facts[Math.floor(Math.random() * facts.length)]);
	}
};
