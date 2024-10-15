import user from "#database/models/users.js";
import { PetCommand } from "#slashyInformations/utility/pet.js";
import { Command } from "@yuudachi/framework";
import { ArgsParam, CommandMethod, InteractionParam, LocaleParam } from "@yuudachi/framework/types";
//import { adopt } from "./subCommands/pet/adopt.js";
//import { Acare } from "./subCommands/pet/autocompleteSub/Acare.js";
//import { Afeed } from "./subCommands/pet/autocompleteSub/Afeed.js";
//import { Aplay } from "./subCommands/pet/autocompleteSub/Aplay.js";
import { availablePets } from "#utils/shop/availablePets.js";
import { FoodItem, foodItems } from "#utils/shop/food.js";
//import { battle } from "./subCommands/pet/battle.js";
//import { buy } from "./subCommands/pet/buy.js";
//import { care } from "./subCommands/pet/care.js";
//import { daily } from "./subCommands/pet/daily.js";
//import { play } from "./subCommands/pet/play.js";
//import { quest } from "./subCommands/pet/quest.js";
//import { petstatus } from "./subCommands/pet/status.js";
//import { train } from "./subCommands/pet/train.js";
import { checkLevelUp } from "#utils/index.js";
import { MedicineItem, medicineItems } from "#utils/shop/medecine.js";
import { toyItems } from "#utils/shop/toys.js";
import { quests } from "#utils/quests.js";

export default class extends Command<typeof PetCommand> {
	public override async autocomplete(interaction: InteractionParam<CommandMethod.Autocomplete>, args: ArgsParam<typeof PetCommand>, locale: LocaleParam): Promise<void> {
		const interactions = interaction.options.getSubcommand();
		switch (interactions) {
			case "play":
				const userID = interaction.user.id;
				const guildID = interaction.guildId;
				const userToPlay = await user.findOne({ userID, guildID });
				const inventory = userToPlay.pet.inventory.toys;

				await interaction.respond(inventory.map((t) => ({ name: t.itemName.toString(), value: t.itemName.toString() })));

				break;
			case "feed":
				const feeduserID = interaction.user.id;
				const feedguildID = interaction.guildId;
				const userTofeedd = await user.findOne({ userID: feeduserID, guildID: feedguildID });
				const feedinventory = userTofeedd.pet.inventory.food;

				await interaction.respond(feedinventory.map((t) => ({ name: t.itemName.toString(), value: t.itemName.toString() })));

				break;
			case "care":
				const careuserID = interaction.user.id;
				const careguildID = interaction.guildId;
				const userTocaree = await user.findOne({ userID: careuserID, guildID: careguildID });
				const careinventory = userTocaree.pet.inventory.food;

				await interaction.respond(careinventory.map((t) => ({ name: t.itemName.toString(), value: t.itemName.toString() })));

				break;
		}
	}

	public override async chatInput(interaction: InteractionParam, args: ArgsParam<typeof PetCommand>, locale: LocaleParam): Promise<void> {
		const action = interaction.options.getSubcommand();
		switch (action) {
			case "adopt":
				const userID = interaction.user.id;
				const petName = args.adopt.petname;
				const petType = args.adopt.pettype;

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
				const fooditem = args.feed.itemname;
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
				break;

			case "play":
				const items = args.play.itemname;
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
				break;

			case "status":
				const userStatus = await user.findOne({ userID, guildID: interaction.guildId });
				if (!userStatus?.pet?.petName) {
					await interaction.reply("You do not have a pet.");
					return;
				}

				await interaction.reply(`Pet Name: ${userStatus.pet.petName}\nType: ${userStatus.pet.petType}\nHunger: ${userStatus.pet.hunger}\nHappiness: ${userStatus.pet.happiness}`);

				break;

			case "buy": // that one aint sure of ... last time it was looking for subCommandGroups ... need to test
				const shopItems = [...foodItems, ...medicineItems, ...toyItems];
				const action = interaction.options.getSubcommand();
				switch (action) {
					case "food":
						const quantityFood = args.buy.food.quantity;
						const fooditemNameToBuy = args.buy.food.itemname;
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
						const quantityMed = args.buy.medicine.quantity;
						const meditemNameToBuy = args.buy.medicine.itemname;
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
						const quantityToy = args.buy.toy.quantity;
						const toyitemNameToBuy = args.buy.toy.itemname;
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
				const skill = args.train.skill;
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
				const opponentID = args.battle.opponent;
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
				const itemName = args.care.itemname;

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
				break;

			case "quest":
				const questName = args.quest.questname;
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
					} else if (quest.expiryDate && new Date() > quest.expiryDate) {
						await interaction.reply("This quest has expired.");
					} else {
						quest.progress += 10;
						if (quest.progress >= 100) {
							quest.completed = true;
							await userToQuest.save();
							console.log(`Quest reward: ${quest.reward}`);
							await interaction.reply(`You have completed the quest: ${questName} and earned ${quest.reward}!`);
						}
					}
				} else {
					const newQuest = quests.find((q) => q.questName === questName);
					if (newQuest) {
						const questToAdd = {
							questName: newQuest.questName,
							completed: newQuest.completed || false,
							progress: newQuest.progress || 0,
							reward: newQuest.reward || "",
							expiryDate: newQuest.expiryDate || new Date()
						};
						userToQuest.quests.push(questToAdd);
						await userToQuest.save();
						await interaction.reply(`You have started the quest: ${questName}!`);
					} else {
						await interaction.reply("This quest does not exist.");
					}
				}
				break;

			default:
				await interaction.reply("Invalid action.");
				break;
		}
	}
}
