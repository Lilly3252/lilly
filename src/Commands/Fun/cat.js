const Command = require('../../Structures/Command');
const cat = require('../../Structures/JSONs/cat-fact.json');
module.exports = class extends Command {
	constructor(...args) {
	  super(...args, {
		aliases: ["cat"],
		description: "Want a cat fact?",
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
		return msg.channel.send(cat[Math.floor(Math.random() * cat.length)]);
	}
};
