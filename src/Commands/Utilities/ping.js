const Command = require('../../Structures/Command');
const {CommandInteraction} = require("discord.js") 

module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
			description: 'This provides the ping of the bot',
			category: '📝Utilities',
		});
	}

	async run(interaction) {
		
		const msg = await interaction.reply({ content : 'Pinging...'} , {fetchReply: true} );
		
		//const latency = msg.createdTimestamp - message.createdTimestamp;
		const choices = ['Is this really my ping?', 'Is this okay? I can\'t look!', 'I hope it isn\'t bad!'];
		const response = choices[Math.floor(Math.random() * choices.length)];

		 interaction.editReply({ content: `${response} , API Latency: \`${Math.round(this.client.ws.ping)}ms\``, ephemeral: false });
	}

};

//- Bot Latency: \`${latency}ms\`
