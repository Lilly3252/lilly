const { SlashCommandBuilder } = require("@discordjs/builders");
const roasts = require("../../Structures/JSONs/roast.json");

module.exports = {
	data: new SlashCommandBuilder()
		.setName("roast")
		.setDescription("roast someone.")
		.addUserOption((option) => option.setName("target").setDescription("Select a user").setRequired(true)),
	async run(interaction) {
		const member = interaction.options.getMember("target");
		if(member){return interaction.reply(`${member.username}, ${roasts[Math.floor(Math.random() * roasts.length)]}`);}
		
	}
};
