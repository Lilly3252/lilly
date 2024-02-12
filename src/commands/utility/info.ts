import { InfoCommand } from "#slashyInformations/index.js";
import { userInfo } from "#utils/index.js";

import { Command } from "@yuudachi/framework";
import type { ArgsParam, InteractionParam, LocaleParam } from "@yuudachi/framework/types";

export default class extends Command<typeof InfoCommand> {
	public override async chatInput(
		interaction: InteractionParam,
		args: ArgsParam<typeof InfoCommand>,
		locale: LocaleParam
	): Promise<void> {
		await interaction.deferReply({ ephemeral: args.hide ?? true });
		const member = interaction.options.getMember("target");

		try {
			if (member) {
				await interaction.editReply({ embeds: [userInfo(member, locale)] });
			} else {
				const user = interaction.options.getUser("target");
				interaction.editReply({ embeds: [userInfo(user, locale)] });
			}
		} catch (error) {
			console.log(error);
			interaction.editReply({ content: "something's wrong" });
		}
	}
}
