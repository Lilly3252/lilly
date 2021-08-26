
const { stripIndents } = require('common-tags');
const answers = require('../../Structures/JSONs/8-ball.json');
const Command = require("../../Structures/Command");


module.exports = class extends Command {
  constructor(...args) {
    super(...args, {
      aliases: ["8ball"],
      description: "ask me a question, i will answer",
	  category: "💃Fun",
      usage: "<Question>",
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
  async run(message , args ){
	  const question = args.slice().join(" ")
		return message.channel.send(stripIndents`
			_${question}_
			🎱 ${answers[Math.floor(Math.random() * answers.length)]} 🎱
		`);
	}
};
