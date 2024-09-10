import { TimeoutCommand } from "#slashyInformations/index.js";
import { permission } from "#utils/index.js";

import { Command } from "@yuudachi/framework";
import type { ArgsParam, InteractionParam, LocaleParam } from "@yuudachi/framework/types";
import i18next from "i18next";

export default class extends Command<typeof TimeoutCommand> {
	public override async chatInput(interaction: InteractionParam, args: ArgsParam<typeof TimeoutCommand>, locale: LocaleParam): Promise<void> {
		await interaction.deferReply({ ephemeral: args.hide ?? true });

		if (!(await permission(interaction, "ModerateMembers"))) {
			await interaction.editReply({
				content: i18next.t("command.common.errors.no_permission", { lng: locale })
			});
			return;
		}

		const member = args.target.member;
		const duration = args.duration;
		const reason = args.reason ?? i18next.t("command.mod.timeout.no_reason", { lng: locale });

		if (!member?.moderatable) {
			await interaction.editReply({
				content: i18next.t("command.mod.timeout.not_moderatable", { lng: locale })
			});
			return;
		}

		try {
			await member.timeout(duration, reason);
			await interaction.editReply({
				content: i18next.t("command.mod.timeout.success", {
					user: `${member}`,
					duration: `${duration}`,
					lng: locale
				})
			});
		} catch (error) {
			console.error("Failed to timeout member:", error);
			await interaction.editReply({
				content: i18next.t("command.common.errors.generic", { lng: locale })
			});
		}
	}
}
