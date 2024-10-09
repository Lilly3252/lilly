import user from "#database/models/users.js";
import { PetCommand } from "#slashyInformations/index.js";
import { foodItems } from "#utils/shop/food.js";
import { medicineItems } from "#utils/shop/medecine.js";
import { toyItems } from "#utils/shop/toys.js";
import { ArgsParam, InteractionParam, LocaleParam } from "@yuudachi/framework/types";
const shopItems = [...foodItems, ...medicineItems, ...toyItems];
export async function buy(interaction: InteractionParam, args: ArgsParam<typeof PetCommand>["buy"], locale: LocaleParam): Promise<void> {
	const action = interaction.options.getSubcommand();
	const userID = interaction.user.id;
	switch (action) {
		case "food":
			const quantityFood = args.food.quantity;
			const fooditemNameToBuy = args.food.itemname;
			const fooditemToBuy = shopItems.find((item) => item.itemName === fooditemNameToBuy);

			if (!fooditemToBuy) {
				await interaction.reply("Item not found in shop.");
				return;
			}

			const fooduserToBuyItem = await user.findOne({ userID, guildID: interaction.guildId });
			if (!fooduserToBuyItem) {
				await interaction.reply("User not found.");
				return;
			}

			if (fooduserToBuyItem.coins < fooditemToBuy.price) {
				await interaction.reply("You do not have enough coins to buy this item.");
				return;
			}

			fooduserToBuyItem.coins -= fooditemToBuy.price;
			const foodexistingItemToBuy = fooduserToBuyItem.pet.inventory.food.find((item) => item.itemName === fooditemNameToBuy);
			if (foodexistingItemToBuy) {
				foodexistingItemToBuy.quantity += 1;
			} else {
				fooduserToBuyItem.pet.inventory.food.push({ itemName: fooditemNameToBuy, quantity: quantityFood });
			}

			await fooduserToBuyItem.save();
			await interaction.reply(`You have bought a ${fooditemNameToBuy}. This item is added to your pet's inventory.`);
			break;
		case "medecine":
			const quantityMed = args.medicine.quantity;
			const meditemNameToBuy = args.medicine.itemname;
			const meditemToBuy = shopItems.find((item) => item.itemName === meditemNameToBuy);

			if (!meditemToBuy) {
				await interaction.reply("Item not found in shop.");
				return;
			}

			const meduserToBuyItem = await user.findOne({ userID, guildID: interaction.guildId });
			if (!meduserToBuyItem) {
				await interaction.reply("User not found.");
				return;
			}

			if (meduserToBuyItem.coins < meditemToBuy.price) {
				await interaction.reply("You do not have enough coins to buy this item.");
				return;
			}

			meduserToBuyItem.coins -= meditemToBuy.price;
			const medexistingItemToBuy = meduserToBuyItem.pet.inventory.medicine.find((item) => item.itemName === meditemNameToBuy);
			if (medexistingItemToBuy) {
				medexistingItemToBuy.quantity += 1;
			} else {
				meduserToBuyItem.pet.inventory.medicine.push({ itemName: meditemNameToBuy, quantity: quantityMed });
			}

			await meduserToBuyItem.save();
			await interaction.reply(`You have bought a ${meditemNameToBuy}. This item is added to your pet's inventory.`);
			break;
		case "toy":
			const quantityToy = args.toy.quantity;
			const toyitemNameToBuy = args.toy.itemname;
			const toyitemToBuy = shopItems.find((item) => item.itemName === toyitemNameToBuy);

			if (!toyitemToBuy) {
				await interaction.reply("Item not found in shop.");
				return;
			}

			const toyuserToBuyItem = await user.findOne({ userID, guildID: interaction.guildId });
			if (!toyuserToBuyItem) {
				await interaction.reply("User not found.");
				return;
			}

			if (toyuserToBuyItem.coins < toyitemToBuy.price) {
				await interaction.reply("You do not have enough coins to buy this item.");
				return;
			}

			toyuserToBuyItem.coins -= toyitemToBuy.price;
			const existingItemToBuy = toyuserToBuyItem.pet.inventory.toys.find((item) => item.itemName === toyitemNameToBuy);
			if (existingItemToBuy) {
				existingItemToBuy.quantity += 1;
			} else {
				toyuserToBuyItem.pet.inventory.toys.push({ itemName: toyitemNameToBuy, quantity: quantityToy });
			}

			await toyuserToBuyItem.save();
			await interaction.reply(`You have bought a ${toyitemNameToBuy}. This item is added to your pet's inventory.`);
			break;
	}
}
