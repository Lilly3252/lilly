import user from "#database/models/users.js";
import { PetCommand } from "#slashyInformations/utility/pet.js";
import { availablePets } from "#utils/shop/availablePets.js";
import { foodItems } from "#utils/shop/food.js";
import { medicineItems } from "#utils/shop/medecine.js";
import { toyItems } from "#utils/shop/toys.js";

import { Command } from "@yuudachi/framework";
import { ArgsParam, InteractionParam, LocaleParam } from "@yuudachi/framework/types";
import { injectable } from "tsyringe";

const shopItems = [...foodItems, ...medicineItems, ...toyItems];

@injectable()
export default class extends Command<typeof PetCommand> {
	public override async chatInput(interaction: InteractionParam, args: ArgsParam<typeof PetCommand>, locale: LocaleParam): Promise<void> {
		const action = args.action;
		const userID = interaction.user.id;

		switch (action) {
			case "adopt":
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
				break;

			case "feed":
				const foodItemName = args.itemname;
				const userToFeed = await user.findOne({ userID, guildID: interaction.guildId });
				if (!userToFeed?.pet?.petName) {
					await interaction.reply("You do not have a pet.");
					return;
				}

				const foodItem = foodItems.find((food) => food.itemName === foodItemName);
				if (!foodItem) {
					await interaction.reply("Invalid food item.");
					return;
				}

				userToFeed.pet.hunger = Math.min(userToFeed.pet.hunger + foodItem.happinessBenefit, 100);
				userToFeed.pet.health = Math.min(userToFeed.pet.health + foodItem.healthBenefit, 100);
				await userToFeed.save();
				await interaction.reply(`You have fed your pet ${foodItemName}. Hunger is now ${userToFeed.pet.hunger} and health is now ${userToFeed.pet.health}.`);
				break;
			case "play":
				const userToPlay = await user.findOne({ userID, guildID: interaction.guildId });
				if (!userToPlay?.pet?.petName) {
					await interaction.reply("You do not have a pet to play with.");
					return;
				}

				userToPlay.pet.happiness = Math.min(userToPlay.pet.happiness + 20, 100);
				userToPlay.pet.experience += 10;
				await this.checkLevelUp(userToPlay, interaction);
				userToPlay.pet.lastPlayed = new Date();
				await userToPlay.save();
				await interaction.reply(`You have played with ${userToPlay.pet.petName}. Happiness is now ${userToPlay.pet.happiness}.`);
				break;

			case "status":
				const userStatus = await user.findOne({ userID, guildID: interaction.guildId });
				if (!userStatus?.pet?.petName) {
					await interaction.reply("You do not have a pet.");
					return;
				}

				await interaction.reply(`Pet Name: ${userStatus.pet.petName}\nType: ${userStatus.pet.petType}\nHunger: ${userStatus.pet.hunger}\nHappiness: ${userStatus.pet.happiness}`);
				break;

			case "removeItem":
				const itemToRemove = args.itemname;
				const quantityToRemove = args.quantity || 1;

				if (!itemToRemove) {
					await interaction.reply("Please provide an item name.");
					return;
				}

				const userToRemoveItem = await user.findOne({ userID, guildID: interaction.guildId });
				if (!userToRemoveItem?.pet?.petName) {
					await interaction.reply("You do not have a pet.");
					return;
				}

				const itemIndex = userToRemoveItem.pet.inventory.findIndex((item) => item.itemName === itemToRemove);
				if (itemIndex === -1) {
					await interaction.reply("Item not found in inventory.");
					return;
				}

				userToRemoveItem.pet.inventory[itemIndex].quantity -= quantityToRemove;
				if (userToRemoveItem.pet.inventory[itemIndex].quantity <= 0) {
					userToRemoveItem.pet.inventory.splice(itemIndex, 1);
				}

				await userToRemoveItem.save();
				await interaction.reply(`Removed ${quantityToRemove} ${itemToRemove}(s) from your pet's inventory.`);
				break;

			case "useItem":
				const itemToUse = args.itemname;

				if (!itemToUse) {
					await interaction.reply("Please provide an item name.");
					return;
				}

				const userToUseItem = await user.findOne({ userID, guildID: interaction.guildId });
				if (!userToUseItem?.pet?.petName) {
					await interaction.reply("You do not have a pet.");
					return;
				}

				const itemToUseIndex = userToUseItem.pet.inventory.findIndex((item) => item.itemName === itemToUse);
				if (itemToUseIndex === -1) {
					await interaction.reply("Item not found in inventory.");
					return;
				}

				// Example effect: Increase happiness by 10
				userToUseItem.pet.happiness = Math.min(userToUseItem.pet.happiness + 10, 100);
				userToUseItem.pet.inventory[itemToUseIndex].quantity -= 1;
				if (userToUseItem.pet.inventory[itemToUseIndex].quantity <= 0) {
					userToUseItem.pet.inventory.splice(itemToUseIndex, 1);
				}

				await userToUseItem.save();
				await interaction.reply(`Used ${itemToUse}. Happiness is now ${userToUseItem.pet.happiness}.`);
				break;
			case "shop":
				const shopList = shopItems.map((item) => `${item.itemName}: ${item.price} coins`).join("\n");
				await interaction.reply(`Available items:\n${shopList}`);
				break;

			case "buyItem":
				const itemNameToBuy = args.itemname;
				const itemToBuy = shopItems.find((item) => item.itemName === itemNameToBuy);

				if (!itemToBuy) {
					await interaction.reply("Item not found in shop.");
					return;
				}

				const userToBuyItem = await user.findOne({ userID, guildID: interaction.guildId });
				if (!userToBuyItem) {
					await interaction.reply("User not found.");
					return;
				}

				if (userToBuyItem.coins < itemToBuy.price) {
					await interaction.reply("You do not have enough coins to buy this item.");
					return;
				}

				userToBuyItem.coins -= itemToBuy.price;
				const existingItemToBuy = userToBuyItem.pet.inventory.find((item) => item.itemName === itemNameToBuy);
				if (existingItemToBuy) {
					existingItemToBuy.quantity += 1;
				} else {
					userToBuyItem.pet.inventory.push({ itemName: itemNameToBuy, quantity: 1 });
				}

				await userToBuyItem.save();
				await interaction.reply(`You have bought a ${itemNameToBuy}. This item is added to your pet's inventory.`);
				break;
			case "daily":
				const userToClaimDaily = await user.findOne({ userID, guildID: interaction.guildId });
				if (!userToClaimDaily) {
					await interaction.reply("User not found.");
					return;
				}

				const now = new Date();
				const lastDaily = userToClaimDaily.lastDaily ? new Date(userToClaimDaily.lastDaily) : null;
				const oneDay = 24 * 60 * 60 * 1000;

				if (lastDaily && now.getTime() - lastDaily.getTime() < oneDay) {
					await interaction.reply("You have already claimed your daily reward. Please try again later.");
					return;
				}

				const dailyReward = 50;
				userToClaimDaily.coins += dailyReward;
				userToClaimDaily.lastDaily = now;
				await userToClaimDaily.save();

				await interaction.reply(`You have claimed your daily reward of ${dailyReward} coins!`);
				break;
			case "train":
				const skill = args.skill;
				const userToTrain = await user.findOne({ userID, guildID: interaction.guildId });
				if (!userToTrain?.pet?.petName) {
					await interaction.reply("You do not have a pet.");
					return;
				}

				userToTrain.pet.skills = userToTrain.pet.skills || [];
				if (!userToTrain.pet.skills.includes(skill)) {
					userToTrain.pet.skills.push(skill);
					await userToTrain.save();
					await interaction.reply(`Your pet has learned the skill: ${skill}!`);
				} else {
					await interaction.reply("Your pet already knows this skill.");
				}
				break;

			case "battle":
				const opponentID = args.opponent;
				const userToBattle = await user.findOne({ userID, guildID: interaction.guildId });
				const opponent = await user.findOne({ userID: opponentID, guildID: interaction.guildId });

				if (!userToBattle?.pet?.petName || !opponent?.pet?.petName) {
					await interaction.reply("Both users must have a pet to battle.");
					return;
				}
				const userPetPower = userToBattle.pet.level + userToBattle.pet.skills.length;
				const opponentPetPower = opponent.pet.level + opponent.pet.skills.length;

				if (userPetPower > opponentPetPower) {
					userToBattle.pet.health = Math.max(userToBattle.pet.health - 10, 0);
					opponent.pet.health = Math.max(opponent.pet.health - 20, 0);
					await userToBattle.save();
					await opponent.save();
					await interaction.reply(`Your pet ${userToBattle.pet.petName} won the battle against ${opponent.pet.petName}!`);
				} else if (userPetPower < opponentPetPower) {
					userToBattle.pet.health = Math.max(userToBattle.pet.health - 20, 0);
					opponent.pet.health = Math.max(opponent.pet.health - 10, 0);
					await userToBattle.save();
					await opponent.save();
					await interaction.reply(`Your pet ${userToBattle.pet.petName} lost the battle against ${opponent.pet.petName}.`);
				} else {
					userToBattle.pet.health = Math.max(userToBattle.pet.health - 15, 0);
					opponent.pet.health = Math.max(opponent.pet.health - 15, 0);
					await userToBattle.save();
					await opponent.save();
					await interaction.reply(`It's a tie between ${userToBattle.pet.petName} and ${opponent.pet.petName}!`);
				}
				break;

			case "care":
				const itemName = args.itemname;
				const userToCare = await user.findOne({ userID, guildID: interaction.guildId });
				if (!userToCare?.pet?.petName) {
					await interaction.reply("You do not have a pet.");
					return;
				}

				const item = medicineItems.find((med) => med.itemName === itemName);
				if (!item) {
					await interaction.reply("Invalid item name.");
					return;
				}

				userToCare.pet.health = Math.min(userToCare.pet.health + item.healthBenefit, 100);
				await userToCare.save();
				await interaction.reply(`You have used ${itemName}. Health is now ${userToCare.pet.health}.`);
				break;
			case "quest":
				const questName = args.questname;
				const userToQuest = await user.findOne({ userID, guildID: interaction.guildId });
				if (!userToQuest?.pet?.petName) {
					await interaction.reply("You do not have a pet.");
					return;
				}

				userToQuest.quests = userToQuest.quests || [];
				const quest = userToQuest.quests.find((q) => q.questName === questName);
				if (quest) {
					if (quest.completed) {
						await interaction.reply("You have already completed this quest.");
					} else {
						quest.completed = true;
						await userToQuest.save();
						await interaction.reply(`You have completed the quest: ${questName}!`);
					}
				} else {
					userToQuest.quests.push({ questName, completed: true });
					await userToQuest.save();
					await interaction.reply(`You have started and completed the quest: ${questName}!`);
				}
				break;
			default:
				await interaction.reply("Invalid action.");
				break;
		}
	}
	private async checkLevelUp(userToCheck: InstanceType<typeof user>, interaction: InteractionParam): Promise<void> {
		const xpToNextLevel = userToCheck.pet.level * 100;
		if (userToCheck.pet.experience >= xpToNextLevel) {
			userToCheck.pet.level += 1;
			userToCheck.pet.experience = 0;
			await userToCheck.save();
			await interaction.followUp(`Congratulations! Your pet has leveled up to level ${userToCheck.pet.level}!`);
		}
	}
}
