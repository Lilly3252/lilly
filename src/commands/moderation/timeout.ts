import { TimeoutCommand } from "#slashyInformations/index.js";
import { permission } from "#utils/index.js";

import { Command } from "@yuudachi/framework";
import type { ArgsParam, InteractionParam, LocaleParam } from "@yuudachi/framework/types";
import i18next from "i18next";

export default class extends Command<typeof TimeoutCommand> {
	public override async chatInput(
		interaction: InteractionParam,
		args: ArgsParam<typeof TimeoutCommand>,
		locale: LocaleParam
	): Promise<void> {
		await interaction.deferReply({ ephemeral: args.hide ?? true });
		if (!(await permission(interaction, "ModerateMembers"))) {
			return;
		}

		interaction.editReply("nope");
	}
}
