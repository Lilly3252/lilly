import guilds from "#database/models/guilds.js";
import { InteractionParam } from "@yuudachi/framework/types";
import { Guild, PermissionResolvable } from "discord.js";
import i18next from "i18next";
let locale: string;

export async function permission(interaction: InteractionParam, permission: PermissionResolvable) {
	const perms = interaction.guild.members.me.permissions.has(permission);
	if (!perms) {
		await interaction.editReply({
			content: i18next.t("command.common.errors.permission_not_found", { perm: `${permission}`, lng: locale })
		});
		return perms;
	}
	return perms;
}
export async function createSettings(interaction: InteractionParam, guild?: Guild | undefined) {
	await guilds
		.create({
			guildID: interaction.guild.id ?? guild.id,
			name: interaction.guild.name ?? guild.name,
			auditLogEvent: false,
			logChannelID: null,
			welcomeChannelID: null,
			guildSettings: [
				{
					antiRaid: false,
					botUpdate: false,
					roleUpdate: false,
					guildUpdate: false,
					emojiUpdate: false,
					inviteUpdate: false,
					threadUpdate: false,
					memberUpdate: false,
					messageUpdate: false,
					channelUpdate: false,
					stickerUpdate: false,
					webhookUpdate: false,
					autoModeration: false,
					integrationUpdate: false,
					commandPermission: false,
					stageInstanceUpdate: false,
					guildScheduledUpdate: false
				}
			]
		})
		.then((guild) => guild.save);
	// need to turn interaction.editReply() multi language with i18n.
	return createSettings;
}
export function isEnabled(name: boolean) {
	return name ? "Enabled" : "Disabled";
}
export function emojify(mode: boolean) {
	return mode ? "✅" : "❌";
}
