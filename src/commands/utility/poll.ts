import type { PollCommand } from "#slashyInformations/index.js";
import { PollBuilder } from "#utils/builders/pollBuilder.js";
import { Command } from "@yuudachi/framework";
import type { ArgsParam, InteractionParam, LocaleParam } from "@yuudachi/framework/types";

export default class extends Command<typeof PollCommand> {
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	public override async chatInput(interaction: InteractionParam, args: ArgsParam<typeof PollCommand>, locale: LocaleParam): Promise<void> {
		const answers: string[] = [];
		for (let answerOption = 1; answerOption <= 10; answerOption++) {
			const answer = args[`answer${answerOption}`];
			if (answer) {
				answers.push(answer);
			}
		}
		const poll = new PollBuilder().setQuestion(args.question).setAnswers(answers).setDuration(args.duration).build();
		await interaction.reply({ poll: poll });
	}
}
