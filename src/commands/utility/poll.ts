import type { PollCommand } from "#slashyInformations/index.js";
import { injectable } from "tsyringe";
import { Command } from "@yuudachi/framework";
import type { ArgsParam, InteractionParam, LocaleParam } from "@yuudachi/framework/types";

import { PollAnswerData, PollQuestionMedia } from "discord.js";

@injectable()
export default class extends Command<typeof PollCommand> {
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	public override async chatInput(interaction: InteractionParam, args: ArgsParam<typeof PollCommand>, locale: LocaleParam): Promise<void> {
		const a1 = args.answer1;
		const a2 = args.answer2;
		const a3 = args.answer3;
		const a4 = args.answer4;
		const a5 = args.answer5;
		const a6 = args.answer6;
		const a7 = args.answer7;
		const a8 = args.answer8;
		const a9 = args.answer9;
		const a10 = args.answer10;
		const duration = args.duration;
		if (duration < 1) {
			await interaction.reply("you need a duration number between 1 and 168");
			return;
		} else if (duration > 168) {
			await interaction.reply("Duration's number is too high , it needs to be between 1 and 168");
			return;
		}
		const question: PollQuestionMedia = {
			text: args.question
		};
		const answers = [] as unknown as PollAnswerData[];
		if (a1) {
			answers.push({ text: a1 });
		}
		if (a2) {
			answers.push({ text: a2 });
		}
		if (a3) {
			answers.push({ text: a3 });
		}
		if (a4) {
			answers.push({ text: a4 });
		}
		if (a5) {
			answers.push({ text: a5 });
		}
		if (a6) {
			answers.push({ text: a6 });
		}
		if (a7) {
			answers.push({ text: a7 });
		}
		if (a8) {
			answers.push({ text: a8 });
		}
		if (a9) {
			answers.push({ text: a9 });
		}
		if (a10) {
			answers.push({ text: a10 });
		}

		await interaction.reply({
			poll: {
				question: question,
				answers: answers,
				duration: duration,
				allowMultiselect: false
			}
		});
	}
}
