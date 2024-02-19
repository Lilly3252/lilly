import { TestCommand } from "#slashyInformations/moderation/test.js";

import { Command } from "@yuudachi/framework";
import type { ArgsParam, InteractionParam, LocaleParam } from "@yuudachi/framework/types";

export default class extends Command<typeof TestCommand> {
	public override async chatInput(
		interaction: InteractionParam,
		args: ArgsParam<typeof TestCommand>,
		locale: LocaleParam
	): Promise<void> {
		const member = interaction.member;
		if (member.voice) {
			console.log(member.voice);
			interaction.reply("in a voice chan!");
		} else {
			interaction.reply("eh , cant see that");
		}
	}
}
