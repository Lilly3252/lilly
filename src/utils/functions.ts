import guilds from "#database/models/guilds.js";
import users from "#database/models/users.js";
import { InteractionParam } from "@yuudachi/framework/types";
import { ChatInputCommandInteraction, Guild, GuildMember, PermissionResolvable, Role, RoleMention } from "discord.js";
import i18next from "i18next";
import { EmojifyOptions, guild } from "./types/index.js";
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
export function formatBytes(a: number) {
	if (a === 0) return "0 Bytes";
	const b = Math.floor(Math.log(a) / Math.log(1024));
	return `${parseFloat((a / Math.pow(1024, b)).toFixed(2))} ${["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"][b]}`;
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
export function trimRole(array: RoleMention[], limit = 10) {
	const sliced: Array<string> = array.slice(0, limit);
	if (array.length > limit) sliced.push(`${array.length - limit} more...`);
	if (!sliced.length) sliced.push("None.");

	return sliced;
}
