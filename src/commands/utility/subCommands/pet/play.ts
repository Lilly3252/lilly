import user from "#database/models/users.js";
import { PetCommand } from "#slashyInformations/index.js";
import { checkLevelUp } from "#utils/index.js";
import { ArgsParam, InteractionParam, LocaleParam } from "@yuudachi/framework/types";
export async function play(interaction: InteractionParam, args: ArgsParam<typeof PetCommand>["play"], locale: LocaleParam): Promise<void> {
	const userID = interaction.user.id;
	const items = args.itemname;
	const userToPlay = await user.findOne({ userID, guildID: interaction.guildId });
	if (!userToPlay?.pet?.petName) {
		await interaction.reply("You do not have a pet to play with.");
		return;
	}
	const toy = userToPlay.pet.inventory.toys.find((toy) => toy.itemName === items);
	if (toy.itemName === userToPlay.pet.inventory.toys[0].itemName) {
		userToPlay.pet.happiness = Math.min(userToPlay.pet.happiness + 20, 100);
		userToPlay.pet.experience += 10;
		await checkLevelUp(userToPlay, interaction);
		userToPlay.pet.lastPlayed = new Date();
		await userToPlay.save();
		await interaction.reply(`You have played with ${userToPlay.pet.petName}. Happiness is now ${userToPlay.pet.happiness}.`);
	}
}
