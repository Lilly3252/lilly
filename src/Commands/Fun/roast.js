const Command = require('../../Structures/Command');
const roasts = require('../../Structures/JSONs/roast.json');

module.exports = class extends Command {
	constructor(...args) {
	  super(...args, {
		
		description: "roast someone",
		category: "💃Fun",
		usage: "<mention>",
		options: [
          {
            type: "MENTIONABLE",
            name: "member",
            description: "who?",
            required: true,
            
          }
        ]
	  });
	}
	async run(msg) {
		const member = msg.mentions.members.first() ;  
		return msg.channel.send(`${member.user.username}, ${roasts[Math.floor(Math.random() * roasts.length)]}`);
	}
};
