const { SlashCommandBuilder } = require("@discordjs/builders"),
	{ MessageEmbed } = require("discord.js"),
	moment = require("moment"),
	filterLevels = {
		DISABLED: "Off",
		MEMBERS_WITHOUT_ROLES: "No Role",
		ALL_MEMBERS: "Everyone"
	},
	verificationLevels = {
		NONE: "None",
		LOW: "Low",
		MEDIUM: "Medium",
		HIGH: "(\u256F\xB0\u25A1\xB0\uFF09\u256F\uFE35 \u253B\u2501\u253B",
		VERY_HIGH: "\u253B\u2501\u253B \uFF90\u30FD(\u0CA0\u76CA\u0CA0)\u30CE\u5F61\u253B\u2501\u253B"
	},
	regions = {
		"brazil": "Brazil",
		"europe": "Europe",
		"hongkong": "Hong Kong",
		"india": "India",
		"japan": "Japan",
		"russia": "Russia",
		"singapore": "Singapore",
		"southafrica": "South Africa",
		"sydney": "Sydney",
		"us-central": "US Central",
		"us-east": "US East",
		"us-west": "US West",
		"us-south": "US South"
	};
module.exports = {
	data: new SlashCommandBuilder().setName("serverinfo").setDescription("Information of the server."),
	async run(interaction) {
		
		const b = interaction.guild.roles.cache.sort((c, a) => a.position - c.position).map((a) => a.toString()),
			member = interaction.guild.members.cache,
			d = interaction.guild.channels.cache,
			e = interaction.guild.emojis.cache,
			f = new MessageEmbed()
				.setDescription(`**Guild information for __${interaction.guild.name}__**`)
				.setColor("BLUE")
				.setThumbnail(interaction.guild.iconURL({ dynamic: true }))
				.addField(
					"General",
					[
						`**❯ Name:** ${interaction.guild.name}`,
						`**❯ ID:** ${interaction.guild.id}`,
						`**❯ OwnerID:** ${interaction.guild.ownerId}`,
						`**❯ Boost Tier:** ${interaction.guild.premiumTier ? `Tier ${interaction.guild.premiumTier}` : "None"}`,
						`**❯ Explicit Filter:** ${filterLevels[interaction.guild.explicitContentFilter]}`,
						`**❯ Verification Level:** ${verificationLevels[interaction.guild.verificationLevel]}`,
						`**❯ Time Created:** ${moment(interaction.guild.createdTimestamp).format("LT")} ${moment(
							interaction.guild.createdTimestamp
						).format("LL")} ${moment(interaction.guild.createdTimestamp).fromNow()}`,
						"\u200B"
					].join("\n")
				)
				.addField("Statistics", [
					`**❯ Role Count:** ${b.length}`,
					`**❯ Emoji Count:** ${e.size}`,
					`**❯ Regular Emoji Count:** ${e.filter((a) => !a.animated).size}`,
					`**❯ Animated Emoji Count:** ${e.filter((a) => a.animated).size}`,
					`**❯ Member Count:** ${interaction.guild.memberCount}`,
					`**❯ Humans:** ${member.filter((a) => !a.user.bot).size}`,
					`**❯ Bots:** ${member.filter((a) => a.user.bot).size}`,
					`**❯ Text Channels:** ${d.filter((channel) => "GUILD_TEXT" === channel.type).size}`,
					`**❯ Voice Channels:** ${d.filter((channel) => "GUILD_VOICE" === channel.type).size}`,
					`**❯ Stage Channels:** ${d.filter((channel) => "GUILD_STAGE_VOICE" === channel.type).size}`,
					`**❯ Boost Count:** ${interaction.guild.premiumSubscriptionCount || "0"}`,
					"\u200B"
				].join("\n"))
				.addField(
					"Presence",
					[
						`**❯ Online:** ${member.filter((guildmember) => "online" === guildmember.presence?.status).size}`,
						`**❯ Idle:** ${member.filter((guildmember) => "idle" === guildmember.presence?.status).size}`,
						`**❯ Do Not Disturb:** ${member.filter((guildmember) => "dnd" === guildmember.presence?.status).size}`,
						`**❯ Offline:** ${member.filter((guildmember) => null === guildmember.presence).size}`,
						"\u200B"
					].join("\n")
				)
				.addField(
					`Roles [${b.length - 1}]`,
					[10 > b.length ? b.join(", ") : 10 < b.length ? interaction.client.utils.trimArray(b) : "None"].join("\n")
				)
				
				.setTimestamp();
		interaction.reply({ embeds: [f] });
	}
};
