const { SlashCommandBuilder } = require('@discordjs/builders');
const jokes = require('../../Structures/JSONs/yo-mama.json');

module.exports = {
data : new SlashCommandBuilder()
        .setName('yo-mama')
        .setDescription('tells you a yo-mama insult.')
	,
	async run(interaction) {
		return msg.channel.send(jokes[Math.floor(Math.random() * jokes.length)]);
	}
};
