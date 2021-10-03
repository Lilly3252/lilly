const { MessageEmbed } = require('discord.js');
const Command = require('../../Structures/Command');

//*ALMOST DONE ! NEEDS COMMAND SPECIFICATION REQUIREMENT
//* Exemple: /help [COMMAND]
module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
			description: 'Displays all the commands in the bot',
			category: '📝Utilities',
			usage: '[command]',
			options: [
				{
				  type: 3,
				  name: 'command',
				  description: 'Command to know.',
				  required: false
				}
			  ]
		});
	}
	async run(interaction ,command) {
		const embed = new MessageEmbed()
			.setColor('BLUE')
			.setAuthor(`${interaction.guild.name} Help Menu`, interaction.guild.iconURL({ dynamic: true }))
			.setThumbnail(this.client.user.displayAvatarURL())
			.setFooter(`Requested by ${interaction.member.user.username}`, interaction.member.user.displayAvatarURL({ dynamic: true }))
			.setTimestamp();

		if (command) {
			const cmd = this.client.commands.get(command) || this.client.commands.get(this.client.name.get(command));

			if (!cmd) return interaction.reply(`Invalid Command named. \`${command}\``);

			embed.setAuthor(`${this.client.utils.capitalise(cmd.name)} Command Help`, this.client.user.displayAvatarURL());
			embed.setDescription([
				`**❯ name:** ${cmd.name.length ? cmd.name.map(alias => `\`${alias}\``).join(' ') : 'No name'}`,
				`**❯ Description:** ${cmd.description}`,
				`**❯ Category:** ${cmd.category}`,
				`**❯ Usage:** ${cmd.usage}`
			].join("\n"));

			return interaction.reply({embeds: [embed]});
		} else {
			embed.setDescription([
				`These are the available commands for ${interaction.guild.name}`,
				`The bot's prefix is: Slash Commands!`,
				`Command Parameters: \`<>\` is strict & \`[]\` is optional`
			].join("\n"));
			let categories;
			if (!this.client.owners.includes(interaction.member.id)) {
				categories = this.client.utils.removeDuplicates(this.client.commands.filter(cmd => cmd.category !== 'Owner').map(cmd => cmd.category));
			} else {
				categories = this.client.utils.removeDuplicates(this.client.commands.map(cmd => cmd.category));
			}

			for (const category of categories) {
				embed.addField(`**${this.client.utils.capitalise(category)}**`, this.client.commands.filter(cmd =>
					cmd.category === category).map(cmd => `\`${cmd.name}\``).join(' '));
			}
			return interaction.reply({embeds: [embed]});
		}
	}

};
