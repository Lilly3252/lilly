const Command = require('../../Structures/Command');
const dog = require('../../Structures/JSONs/dog-fact.json');
module.exports = class extends Command {
	constructor(...args) {
	  super(...args, {
		aliases: ["dog"],
		description: "Want a dog fact?",
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
		return msg.channel.send(dog[Math.floor(Math.random() * dog.length)]);
	}
};
