import user from "#database/models/users.js";
import { PetCommand } from "#slashyInformations/index.js";
import { FoodItem, foodItems } from "#utils/shop/food.js";
import { ArgsParam, InteractionParam, LocaleParam } from "@yuudachi/framework/types";
export async function feed(interaction: InteractionParam, args: ArgsParam<typeof PetCommand>["feed"], locale: LocaleParam): Promise<void> {
	const userID = interaction.user.id;
	const fooditem = args.itemname;
	const userToFeed = await user.findOne({ userID, guildID: interaction.guildId });
	if (!userToFeed?.pet?.petName) {
		await interaction.reply("You do not have a pet.");
		return;
	}
	const foodItem: FoodItem = foodItems.find((food) => food.itemName === foodItem.itemName);
	if (fooditem === userToFeed.pet.inventory.food[0].itemName) {
		userToFeed.pet.hunger = Math.min(userToFeed.pet.hunger + foodItem.hungerBenefit, 100);
		userToFeed.pet.health = Math.min(userToFeed.pet.health + foodItem.healthBenefit, 100);
		await userToFeed.save();
		await interaction.reply(`You have fed your pet ${foodItem}. Hunger is now ${userToFeed.pet.hunger} and health is now ${userToFeed.pet.health}.`);
	}
}
