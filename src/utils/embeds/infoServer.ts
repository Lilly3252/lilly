import { InfoCommand } from "#slashyInformations/index.js";
import { trimRole } from "#utils/functions.js";
import { truncateEmbed } from "@yuudachi/framework";
import { ArgsParam, InteractionParam } from "@yuudachi/framework/types";
import { APIEmbed, APIEmbedField, Channel, ChannelType, Collection, GuildEmoji, GuildExplicitContentFilter, GuildMember, GuildVerificationLevel, RoleMention, TimestampStyles, time } from "discord.js";
import i18next from "i18next";

export function serverInfo(
	args: ArgsParam<typeof InfoCommand>,
	interaction: InteractionParam,
	role: RoleMention[],
	owner: GuildMember,
	members: Collection<string, GuildMember>,
	emojis: Collection<string, GuildEmoji>,
	channels: Collection<string, Channel>,
	locale: string
) {
	const info: APIEmbedField = {
		name: "General",
		value: i18next.t("info.server.info", {
			name: interaction.guild.name,
			id: interaction.guild.id,
			owner: `${owner.user.tag} (${owner.id})`,
			booster_tier: interaction.guild.premiumTier ? `Tier ${interaction.guild.premiumTier}` : "None",
			explicit_filter: GuildExplicitContentFilter[interaction.guild.explicitContentFilter].replace(/([a-z])([A-Z])/g, "$1 $2"),
			verification_level: GuildVerificationLevel[interaction.guild.verificationLevel],
			created_at: time(interaction.guild.createdAt, TimestampStyles.RelativeTime),
			lng: locale
		})
	};
	const embed: APIEmbed = {
		author: {
			name: `Bot Information`
		},
		thumbnail: { url: interaction.guild.iconURL() },
		fields: [info]
	};
	if (args.server.verbose) {
		const statistic: APIEmbedField = {
			name: "Statistic",
			value: i18next.t("info.server.stats", {
				role_count: role.length,
				emoji_count: emojis.size,
				regular_emoji: emojis.filter((emoji) => !emoji.animated).size,
				animated_emoji: emojis.filter((emoji) => emoji.animated).size,
				member_count: interaction.guild.memberCount,
				humans: members.filter((member) => !member.user.bot).size,
				bots: members.filter((member) => member.user.bot).size,
				txt_chan: channels.filter((channel) => channel.type === ChannelType.GuildText).size,
				voice_chan: channels.filter((channel) => channel.type === ChannelType.GuildVoice).size,
				stage_chan: channels.filter((channel) => channel.type === ChannelType.GuildStageVoice).size,
				boost_count: interaction.guild.premiumSubscriptionCount || "0",
				lng: locale
			})
		};
		const presence: APIEmbedField = {
			name: "Presence",
			value: i18next.t("info.server.presence", {
				online: members.filter((member) => member.presence?.status === "online").size,
				idle: members.filter((member) => member.presence?.status === "idle").size,
				dnd: members.filter((member) => member.presence?.status === "dnd").size,
				offline: members.filter((member) => member.presence?.status === "offline").size,
				no_presence: members.filter((member) => member.presence === null).size,
				lng: locale
			})
		};
		const mappedRoles = interaction.guild.roles.cache.filter((role) => role.id !== interaction.guild.id).map((role) => role.toString());
		const roles: APIEmbedField = {
			name: `Roles [${role.length - 1}]`,
			value: trimRole(mappedRoles).join(", ")
		};
		embed.fields = [info, statistic, presence, roles];
	}

	return truncateEmbed(embed);
}
