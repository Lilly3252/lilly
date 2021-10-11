
const { stripIndents } = require('common-tags');
const answers = require('../../Structures/JSONs/8-ball.json');
const { SlashCommandBuilder } = require('@discordjs/builders');


module.exports = {
data : new SlashCommandBuilder()
        .setName('8-balls')
        .setDescription('ask a question , Lilly will answer you.')
        .addStringOption(option => option.setName('question').setDescription('question to ask.'))
  ,
  async run(interaction,  args){
	  const question = args.slice().join(" ")
		return interaction.reply(stripIndents`
			_${question}_
			🎱 ${answers[Math.floor(Math.random() * answers.length)]} 🎱
		`);
	}
};
