import { LocaleParam } from "@yuudachi/framework/types";
import { ChatInputCommandInteraction, PermissionResolvable } from "discord.js";
import i18next from "i18next";

export function permission(interaction: ChatInputCommandInteraction<"cached">, permission: PermissionResolvable) {
	let locale: LocaleParam;
	const perms = interaction.guild.members.me.permissions.has(permission);
	if (!perms) {
		interaction.editReply({
			content: i18next.t("command.common.errors.permission_not_found", { permission: `${permission}`, lng: locale })
		});
		return perms;
	}
	return perms;
}
