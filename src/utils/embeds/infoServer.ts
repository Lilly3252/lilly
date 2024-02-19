const info: APIEmbedField = {
	name: "General",
	value: [
		`**❯ Name:** ${interaction.guild.name}`,
		`**❯ ID:** ${interaction.guild.id}`,
		`**❯ Owner:** ${owner.user.tag} (${owner.id})`,
		`**❯ Boost Tier:** ${interaction.guild.premiumTier ? `Tier ${interaction.guild.premiumTier}` : "None"}`,
		`**❯ Explicit Filter:** ${GuildExplicitContentFilter[interaction.guild.explicitContentFilter]}`,
		`**❯ Verification Level:** ${GuildVerificationLevel[interaction.guild.verificationLevel]}`,
		`**❯ Time Created:** ${server_create}`,
		"\u200B"
	].join("\n")
};
const statistic: APIEmbedField = {
	name: "statistic",
	value: [
		`**❯ Role Count:** ${b.length}`,
		`**❯ Emoji Count:** ${e.cache.size}`,
		`**❯ Regular Emoji Count:** ${e.cache.filter((a: Emoji) => !a.animated).size}`,
		`**❯ Animated Emoji Count:** ${e.cache.filter((a: Emoji) => a.animated as true).size}`,
		`**❯ Member Count:** ${interaction.guild.memberCount}`,
		`**❯ Humans:** ${member.cache.filter((a: GuildMember) => !a.user.bot).size}`,
		`**❯ Bots:** ${member.cache.filter((a: GuildMember) => a.user.bot).size}`,
		`**❯ Text Channels:** ${d.cache.filter((channel: Channel) => channel.type === ChannelType.GuildText).size}`,
		`**❯ Voice Channels:** ${d.cache.filter((channel: Channel) => channel.type === ChannelType.GuildVoice).size}`,
		`**❯ Stage Channels:** ${d.cache.filter((channel: Channel) => channel.type === ChannelType.GuildStageVoice).size}`,
		`**❯ Boost Count:** ${interaction.guild.premiumSubscriptionCount || "0"}`,
		"\u200B"
	].join("\n")
};
const presence: APIEmbedField = {
	name: "Presence",
	value: [
		`**❯ Online:** ${
			member.cache.filter((guildmember: GuildMember) => guildmember.presence?.status === "online").size
		}`,
		`**❯ Idle:** ${member.cache.filter((guildmember: GuildMember) => guildmember.presence?.status === "idle").size}`,
		`**❯ Do Not Disturb:** ${
			member.cache.filter((guildmember: GuildMember) => guildmember.presence?.status === "dnd").size
		}`,
		`**❯ Offline:** ${
			member.cache.filter((guildmember: GuildMember) => guildmember.presence?.status === "offline").size
		}`,
		`**❯ No presence detected:** ${
			member.cache.filter((guildmember: GuildMember) => guildmember.presence === null).size
		}`,
		"\u200B"
	].join("\n")
};
const role: APIEmbedField = {
	name: `Roles [${b.length - 1}]`,
	value: [b.length < 10 ? b.join(", ") : b.length > 10 ? interaction.client.utils.trimArray(b) : "None"].join("\n")
};
