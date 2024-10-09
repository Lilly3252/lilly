import user from "#database/models/users.js";
import { PetCommand } from "#slashyInformations/index.js";
import { availablePets } from "#utils/shop/availablePets.js";
import { ArgsParam, InteractionParam, LocaleParam } from "@yuudachi/framework/types";
export async function adopt(interaction: InteractionParam, args: ArgsParam<typeof PetCommand>["adopt"], locale: LocaleParam): Promise<void> {
	const userID = interaction.user.id;
	const petName = args.petname;
	const petType = args.pettype;

	if (!petName || !petType) {
		await interaction.reply("Please provide both a pet name and pet type.");
		return;
	}

	const selectedPet = availablePets.find((pet) => pet.petType.toLowerCase() === petType.toLowerCase());
	if (!selectedPet) {
		await interaction.reply("Invalid pet type. Please choose a valid pet type.");
		return;
	}

	const existingUser = await user.findOne({ userID, guildID: interaction.guildId });
	if (existingUser?.pet?.petName) {
		await interaction.reply("You already have a pet.");
		return;
	}

	await user.findOneAndUpdate(
		{ userID, guildID: interaction.guildId },
		{
			pet: {
				petName,
				petType,
				hunger: selectedPet.defaultHunger,
				happiness: selectedPet.defaultHappiness,
				health: selectedPet.defaultHealth,
				lastFed: new Date(),
				lastPlayed: new Date(),
				skills: []
			}
		},
		{ upsert: true, new: true }
	);
	await interaction.reply(`You have adopted a ${petType} named ${petName}!`);
}
