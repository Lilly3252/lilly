import { RestrictCommand } from "#slashyInformations/index.js";
import { permission } from "#utils/index.js";

import { Command } from "@yuudachi/framework";
import type { ArgsParam, InteractionParam, LocaleParam } from "@yuudachi/framework/types";
import i18next from "i18next";

export default class extends Command<typeof RestrictCommand> {
	public override async chatInput(
		interaction: InteractionParam,
		args: ArgsParam<typeof RestrictCommand>,
		locale: LocaleParam
	): Promise<void> {
		await interaction.deferReply({ ephemeral: args.hide ?? true });
		const member = args.target.member;
		const reason = args.reason;
		const restriction = args.restriction;
		if (!(await permission(interaction, "ManageGuild"))) {
			return;
		}

		if (!member.moderatable) {
			await interaction.editReply({
				content: i18next.t("", { lng: locale })
			});
			return;
		}

		switch (restriction) {
			case "embed": {
				break;
			}
			case "reaction": {
				break;
			}
			case "slash": {
				break;
			}
			case "voice": {
				break;
			}
		}
	}
}
