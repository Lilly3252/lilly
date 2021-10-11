const { SlashCommandBuilder } = require('@discordjs/builders');
const compliments = require('../../Structures/JSONs/compliment.json');
module.exports = {
data : new SlashCommandBuilder()
        .setName('compliment')
        .setDescription('compliment someone.')
		.addMentionableOption(option => option.setName('member').setDescription('Mention a member to compliment'))
	,
	async run(interaction) {
		return msg.channel.send(compliments[Math.floor(Math.random() * compliments.length)]);
	}
};
