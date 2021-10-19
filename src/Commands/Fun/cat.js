const { SlashCommandBuilder } = require("@discordjs/builders");
const cat = require("../../Structures/JSONs/cat-fact.json");
module.exports = {
	data: new SlashCommandBuilder().setName("cat").setDescription("tells you a cat fact."),
	async run(interaction) {
		return interaction.reply(cat[Math.floor(Math.random() * cat.length)]);
	}
};
