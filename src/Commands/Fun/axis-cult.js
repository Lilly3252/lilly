const { SlashCommandBuilder } = require('@discordjs/builders');
const teachings = require('../../Structures/JSONs/axis-cult.json');

module.exports = {
data : new SlashCommandBuilder()
        .setName('axis-cult')
        .setDescription('no description needed i think.')
	,
	async run(interaction) {
		return msg.channel.send(teachings[Math.floor(Math.random() * teachings.length)]);
	}
};
