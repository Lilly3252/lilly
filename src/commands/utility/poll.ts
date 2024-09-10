import type { PollCommand } from "#slashyInformations/index.js";
import { Command } from "@yuudachi/framework";
import type { ArgsParam, InteractionParam, LocaleParam } from "@yuudachi/framework/types";
import { injectable } from "tsyringe";

import { POLL_MAX_DURATION, POLL_MIN_DURATION } from "#utils/constant.js";
import { PollAnswerData, PollQuestionMedia } from "discord.js";
import i18next from "i18next";

@injectable()
export default class extends Command<typeof PollCommand> {
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	public override async chatInput(interaction: InteractionParam, args: ArgsParam<typeof PollCommand>, locale: LocaleParam): Promise<void> {
		const { question, duration } = args;

		if (duration < POLL_MIN_DURATION || duration > POLL_MAX_DURATION) {
			await interaction.reply({
				content: i18next.t("command.utility.poll.durationError", { lng: locale, min: POLL_MIN_DURATION, max: POLL_MAX_DURATION }),
				ephemeral: true
			});
			return;
		}

		const pollQuestion: PollQuestionMedia = {
			text: question
		};

		const answers: PollAnswerData[] = [];
		for (let answerOption = 1; answerOption <= 10; answerOption++) {
			if (args[`answer${answerOption}`]) {
				answers.push({ text: args[`answer${answerOption}`], emoji: null });
			}
		}
		await interaction.reply({
			content: i18next.t("command.utility.poll.pollCreated", { lng: locale }),
			components: [
				{
					type: 1,
					components: [
						{
							type: 2,
							label: i18next.t("command.utility.poll.voteNow", { lng: locale }),
							style: 1,
							custom_id: "vote"
						}
					]
				}
			],
			ephemeral: true
		});
	}
}
