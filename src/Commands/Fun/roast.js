const { SlashCommandBuilder } = require('@discordjs/builders');
const roasts = require('../../Structures/JSONs/roast.json');

module.exports = {
data : new SlashCommandBuilder()
        .setName('roast')
        .setDescription('roast someone.')
		.addMentionableOption(option => option.setName('member').setDescription('Mention a member to roast'))
	,
	async run(interaction) {
		const member = msg.mentions.members.first() ;  
		return msg.channel.send(`${member.user.username}, ${roasts[Math.floor(Math.random() * roasts.length)]}`);
	}
};
