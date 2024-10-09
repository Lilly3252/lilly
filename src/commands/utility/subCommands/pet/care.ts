import user from "#database/models/users.js";
import { PetCommand } from "#slashyInformations/index.js";
import { MedicineItem, medicineItems } from "#utils/shop/medecine.js";
import { ArgsParam, InteractionParam, LocaleParam } from "@yuudachi/framework/types";
export async function care(interaction: InteractionParam, args: ArgsParam<typeof PetCommand>["care"], locale: LocaleParam): Promise<void> {
	const itemName = args.itemname;
	const userID = interaction.user.id;
	const userToCare = await user.findOne({ userID, guildID: interaction.guildId });
	if (!userToCare?.pet?.petName) {
		await interaction.reply("You do not have a pet.");
		return;
	}

	const item: MedicineItem = medicineItems.find((med) => med.itemName === itemName);

	if (itemName === userToCare.pet.inventory.medicine[0].itemName) {
		userToCare.pet.health = Math.min(userToCare.pet.health + item.healthBenefit, 100);
		await userToCare.save();
		await interaction.reply(`You have used ${itemName}. Health is now ${userToCare.pet.health}.`);
	}
}
