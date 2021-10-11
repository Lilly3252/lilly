const { SlashCommandBuilder } = require('@discordjs/builders');
const dog = require('../../Structures/JSONs/dog-fact.json');
module.exports = {
data : new SlashCommandBuilder()
        .setName('dog')
        .setDescription('tells you a dog fact.')
	,
	async run(interaction) {
		return msg.channel.send(dog[Math.floor(Math.random() * dog.length)]);
	}
};
