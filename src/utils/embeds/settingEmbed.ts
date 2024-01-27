import { emojify, isEnabled } from "#utils/index.js";
import { guild } from "#utils/types/database.js";
import { truncateEmbed } from "@yuudachi/framework";
import { InteractionParam, LocaleParam } from "@yuudachi/framework/types";
import { APIEmbed, APIEmbedField } from "discord.js";
import i18next from "i18next";

export function settingEmbed(interaction: InteractionParam, guild_db: guild, locale: LocaleParam) {
	const settings = guild_db.guildSettings[0];
	const description: APIEmbedField = {
		name: i18next.t("log.setting_log.channel_title", { lng: locale }),
		value: i18next.t("log.setting_log.channel_description", {
			welcome_channel: guild_db.welcomeChannelID ?? i18next.t("log.setting_log.no_info", { lng: locale }),
			log_channel: guild_db.logChannelID ?? i18next.t("log.setting_log.no_info", { lng: locale }),
			anti_raid_enabled: isEnabled(settings.antiRaid),
			audit_log_enabled: isEnabled(guild_db.auditLogEvent)
		})
	};
	const embed: APIEmbed = {
		author: {
			name: `${interaction.guild.name} Server settings`,
			icon_url: interaction.guild.iconURL()
		},
		fields: [description]
	};
	if (guild_db.auditLogEvent) {
		const eventDescription: APIEmbedField = {
			name: i18next.t("log.setting_log.event_title", { lng: locale }),
			value: i18next.t("log.setting_log.event_description", {
				bot: emojify(settings.botUpdate).padStart(15, "\u3000"),
				role: emojify(settings.roleUpdate),
				guild: emojify(settings.guildUpdate),
				emoji: emojify(settings.emojiUpdate),
				thread: emojify(settings.threadUpdate),
				message: emojify(settings.messageUpdate),
				webhooks: emojify(settings.webhookUpdate),
				stage: emojify(settings.stageInstanceUpdate),
				lng: locale
			}),
			inline: true
		};
		const eventDescription2: APIEmbedField = {
			name: `\u200b`,
			value: i18next.t("log.setting_log.event_description2", {
				sticker: emojify(settings.stickerUpdate),
				channel: emojify(settings.channelUpdate),
				invitations: emojify(settings.inviteUpdate),
				integration: emojify(settings.integrationUpdate),
				guild_member: emojify(settings.memberUpdate),
				auto_moderation: emojify(settings.autoModeration),
				scheduled: emojify(settings.guildScheduledUpdate),
				cmd_perm: emojify(settings.commandPermission),
				lng: locale
			}),
			inline: true
		};
		embed.fields = [description, eventDescription, eventDescription2];
	}

	return truncateEmbed(embed);
}
