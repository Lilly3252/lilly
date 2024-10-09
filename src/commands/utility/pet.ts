import { PetCommand } from "#slashyInformations/utility/pet.js";
import { Command } from "@yuudachi/framework";
import { ArgsParam, CommandMethod, InteractionParam, LocaleParam } from "@yuudachi/framework/types";
import { adopt } from "./subCommands/pet/adopt.js";
import { Acare } from "./subCommands/pet/autocompleteSub/care.js";
import { Afeed } from "./subCommands/pet/autocompleteSub/feed.js";
import { Aplay } from "./subCommands/pet/autocompleteSub/play.js";
import { battle } from "./subCommands/pet/battle.js";
import { buy } from "./subCommands/pet/buy.js";
import { care } from "./subCommands/pet/care.js";
import { daily } from "./subCommands/pet/daily.js";
import { feed } from "./subCommands/pet/feed.js";
import { play } from "./subCommands/pet/play.js";
import { quest } from "./subCommands/pet/quest.js";
import { petstatus } from "./subCommands/pet/status.js";
import { train } from "./subCommands/pet/train.js";

export default class extends Command<typeof PetCommand> {
	public override async autocomplete(interaction: InteractionParam<CommandMethod.Autocomplete>, args: ArgsParam<typeof PetCommand>, locale: LocaleParam): Promise<void> {
		const interactions = interaction.options.getSubcommand();
		switch (interactions) {
			case "play":
				await Aplay(interaction, args.play, locale);
				break;
			case "feed":
				await Afeed(interaction, args.feed, locale);
				break;
			case "care":
				await Acare(interaction, args.care, locale);
				break;
		}
	}

	public override async chatInput(interaction: InteractionParam, args: ArgsParam<typeof PetCommand>, locale: LocaleParam): Promise<void> {
		const action = interaction.options.getSubcommand();
		switch (action) {
			case "adopt":
				await adopt(interaction, args.adopt, locale);
				break;

			case "feed":
				await feed(interaction, args.feed, locale);
				break;

			case "play":
				await play(interaction, args.play, locale);
				break;

			case "status":
				await petstatus(interaction, args.status, locale);
				break;

			case "buy": // that one aint sure of ... last time it was looking for subCommandGroups ... need to test
				await buy(interaction, args.buy, locale);
				break;

			case "daily":
				await daily(interaction, args.daily, locale);
				break;

			case "train":
				await train(interaction, args.train, locale);
				break;

			case "battle":
				await battle(interaction, args.battle, locale);
				break;

			case "care":
				await care(interaction, args.care, locale);
				break;

			case "quest":
				await quest(interaction, args.quest, locale);
				break;

			default:
				await interaction.reply("Invalid action.");
				break;
		}
	}
}
