import "reflect-metadata";
/* eslint-disable @typescript-eslint/no-unused-vars */
import type { TestCommand } from "#slashyInformations/index.js";
import { Command } from "@yuudachi/framework";
import type { ArgsParam, InteractionParam, LocaleParam } from "@yuudachi/framework/types";
import { injectable } from "tsyringe";

@injectable()
export default class extends Command<typeof TestCommand> {
	public override async chatInput(interaction: InteractionParam, args: ArgsParam<typeof TestCommand>, locale: LocaleParam): Promise<void> {
		console.log(interaction);
		interaction.reply("Yo!");
	}
}
