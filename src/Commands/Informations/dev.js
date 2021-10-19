const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
	data: new SlashCommandBuilder().setName("dev").setDescription("developer server for lilly."),
	async run(interaction) {
		interaction.reply(
			"https://discord.gg/HMupQGUYZq , Come and have fun! ALL updates for Lilly is there. Come check it out!"
		);
	}
};
