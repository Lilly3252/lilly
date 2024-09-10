import { BlacklistCommand } from "#slashyInformations/index.js";
import { addUserBlacklist, permission } from "#utils/index.js";

import user from "#database/models/users.js";
import { Command } from "@yuudachi/framework";
import type { ArgsParam, InteractionParam, LocaleParam } from "@yuudachi/framework/types";
import i18next from "i18next";

export default class extends Command<typeof BlacklistCommand> {
	public override async chatInput(interaction: InteractionParam, args: ArgsParam<typeof BlacklistCommand>, locale: LocaleParam): Promise<void> {
		if (!(await permission(interaction, "ManageGuild"))) {
			return;
		}

		const member = args.target.member ?? interaction.options.getMember("target");
		const users = await user.findOne({ userID: member.id });

		if (users?.blacklisted) {
			await interaction.editReply({
				content: i18next.t("command.mod.blacklist.already_blacklisted", { lng: locale })
			});
			return;
		}

		try {
			await addUserBlacklist(member);
			await interaction.editReply({
				content: i18next.t("command.mod.blacklist.added", { lng: locale })
			});
		} catch (error) {
			console.error("Failed to blacklist member:", error);
			await interaction.editReply({
				content: i18next.t("command.common.errors.generic", { lng: locale })
			});
		}
	}
}
