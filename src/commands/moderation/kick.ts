import { KickCommand } from "#slashyInformations/index.js";
import { permission } from "#utils/index.js";

import { Command } from "@yuudachi/framework";
import type { ArgsParam, InteractionParam, LocaleParam } from "@yuudachi/framework/types";
import i18next from "i18next";

export default class extends Command<typeof KickCommand> {
	public override async chatInput(
		interaction: InteractionParam,
		args: ArgsParam<typeof KickCommand>,
		locale: LocaleParam
	): Promise<void> {
		await interaction.deferReply({ ephemeral: args.hide ?? true });
		if (!permission(interaction, "KickMembers")) {
			return;
		}

		const member = args.target.member;
		const reason = args.reason ?? "No reason provided";

		if (member.kickable) {
			try {
				await member.kick(reason);
				await interaction.editReply({
					content: i18next.t("command.mod.kick.success", {
						user: `${member}`,
						lng: locale
					})
				});
			} catch {
				await interaction.editReply({
					content: i18next.t("command.common.errors.generic", {
						lng: locale
					})
				});
			}
		}
	}
}
