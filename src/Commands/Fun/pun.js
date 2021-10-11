const { SlashCommandBuilder } = require('@discordjs/builders');
const puns = require('../../Structures/JSONs/pun.json');

module.exports = {
data : new SlashCommandBuilder()
        .setName('pun')
        .setDescription('say a punny thing.')
	,
	async run(interaction) {
		return msg.channel.send(puns[Math.floor(Math.random() * puns.length)]);
	}
};
