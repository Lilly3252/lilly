import guilds from "#database/models/guilds.js";
import users from "#database/models/users.js";
import { InteractionParam } from "@yuudachi/framework/types";
import { ChatInputCommandInteraction, Guild, GuildMember, GuildTextBasedChannel, PermissionResolvable, Role, RoleMention } from "discord.js";
import i18next from "i18next";
import { guild } from "./types/database.js";
import { EmojifyOptions } from "./types/functiontypes.js";

let locale: string;

export async function permission(interaction: InteractionParam, permission: PermissionResolvable) {
	const perms = interaction.guild.members.me.permissions.has(permission);
	if (!perms && interaction.deferred) {
		await interaction.editReply({
			content: i18next.t("command.common.errors.permission_not_found", { perm: `${permission}`, lng: locale })
		});
		return perms;
	} else {
		if (!perms && !interaction.deferred)
			await interaction.reply({
				content: i18next.t("command.common.errors.permission_not_found", { perm: `${permission}`, lng: locale })
			});
	}
	return perms;
}

export async function createSettings(param: Guild | ChatInputCommandInteraction<"cached">) {
	const paramCondition = param instanceof ChatInputCommandInteraction;

	await guilds.create({
		guildID: paramCondition ? param.guild.id : param.id,
		name: paramCondition ? param.guild.name : param.name,
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
	});
	return createSettings;
}
export async function addUserBlacklist(member: GuildMember) {
	await users.create({
		guildID: member.guild.id,
		userID: member.id,
		blacklisted: true
	});
	return addUserBlacklist;
}

export function isEnabled(name: boolean) {
	return name ? "Enabled" : "Disabled";
}

export function emojify({ mode, padStart = true, separator, space = 0 }: EmojifyOptions) {
	const emoji = mode ? "✅" : "❌";

	return padStart ? emoji.padStart(space, separator) : emoji.padEnd(space, separator);
}

export function getRoles(target: GuildMember) {
	return target.roles.cache
		.sort((c, a) => a.position - c.position)
		.map((a) => a.toString())
		.slice(0, -1);
}
/**
 * Converts a number of bytes into a human-readable string with appropriate units.
 * @param bytes - The number of bytes to format.
 * @returns A string representing the formatted bytes.
 */
export function formatBytes(bytes: number): string {
	if (bytes === 0) return "0 Bytes";

	const units = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
	const exponent = Math.floor(Math.log(bytes) / Math.log(1024));
	const value = (bytes / Math.pow(1024, exponent)).toFixed(2);

	return `${value} ${units[exponent]}`;
}

export function blacklistable(member: GuildMember, guild_db: guild) {
	const settings = guild_db.safeRoles;
	if (member.roles.highest.position > member.guild.members.me.roles.highest.position) {
		return false;
	}
	if (member.roles.cache.find((role: Role) => role.id === settings.toString())) {
		return false;
	}
}
/**
 * Trims an array of role mentions to a specified limit and adds a summary if there are more roles.
 * @param roles - The array of role mentions to trim.
 * @param limit - The maximum number of roles to include in the trimmed array. Default is 10.
 * @returns An array of strings representing the trimmed roles and a summary if there are more roles.
 */
export function trimRole(roles: RoleMention[], limit = 10): string[] {
	const trimmedRoles = roles.slice(0, limit).map((role) => role.toString());

	if (roles.length > limit) {
		trimmedRoles.push(`${roles.length - limit} more...`);
	}

	if (trimmedRoles.length === 0) {
		trimmedRoles.push("None.");
	}

	return trimmedRoles;
}

export async function updateChannelSetting(
	interaction: ChatInputCommandInteraction<"cached">,
	guildSettings: any,
	chan: GuildTextBasedChannel | null,
	settingKey: string,
	channelId: string | null,
	successMessage: string,
	removeMessage: string,
	locale: string
) {
	if (channelId) {
		await guildSettings.updateOne({ [settingKey]: channelId });
		interaction.editReply({
			content: i18next.t(successMessage, {
				channel: settingKey,
				channel_id: chan,
				lng: locale
			})
		});
	} else {
		await guildSettings.updateOne({ [settingKey]: null });
		interaction.editReply({
			content: i18next.t(removeMessage, { lng: locale })
		});
	}
}

export async function updateEventSetting(interaction: ChatInputCommandInteraction<"cached">, guildSettings: any, eventKey: string, enabled: boolean, locale: string) {
	await guildSettings.updateOne({ [eventKey]: enabled });
	interaction.editReply({
		content: i18next.t(enabled ? "command.config.events.enabled" : "command.config.events.disabled", {
			event: eventKey,
			lng: locale
		})
	});
}

export async function updateRoleSetting(
	interaction: ChatInputCommandInteraction<"cached">,
	guildSettings: any,
	role: Role | null,
	settingKey: string,
	roleId: string | null,
	successMessage: string,
	removeMessage: string,
	locale: string
) {
	await guildSettings.updateOne({ [settingKey]: roleId });
	interaction.editReply({
		content: i18next.t(roleId ? successMessage : removeMessage, {
			role: settingKey,
			role_id: role,
			lng: locale
		})
	});
}

export async function updateSafeRoles(interaction: ChatInputCommandInteraction<"cached">, guildSettings: any, roleId: string, add: boolean, locale: string) {
	if (add) {
		await guildSettings.updateOne({ $addToSet: { safeRoles: roleId } });
	} else {
		await guildSettings.updateOne({ $pull: { safeRoles: roleId } });
	}
	interaction.editReply({
		content: i18next.t(add ? "command.config.events.enabled" : "command.config.events.disabled", {
			event: "Safe Role",
			lng: locale
		})
	});
}
import user from "#database/models/users.js";
export async function checkLevelUp(userToCheck: InstanceType<typeof user>, interaction: InteractionParam): Promise<void> {
	const xpToNextLevel = userToCheck.pet.level * 100;
	if (userToCheck.pet.experience >= xpToNextLevel) {
		userToCheck.pet.level += 1;
		userToCheck.pet.experience = 0;
		await userToCheck.save();
		await interaction.followUp(`Congratulations! Your pet has leveled up to level ${userToCheck.pet.level}!`);
	}
}
