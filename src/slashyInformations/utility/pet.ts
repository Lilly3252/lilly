import { ApplicationCommandOptionType } from "discord.js";

export const PetCommand = {
	name: "pet",
	description: "Manage your virtual pet",
	options: [
		{
			type: ApplicationCommandOptionType.String,
			name: "action",
			description: "The action to perform (adopt, feed, play, status, removeItem, useItem, shop, buyItem, daily, train, battle, care, quest)",
			required: true,
			choices: [
				{ name: "adopt", value: "adopt" },
				{ name: "feed", value: "feed" },
				{ name: "play", value: "play" },
				{ name: "status", value: "status" },
				{ name: "removeItem", value: "removeItem" },
				{ name: "useItem", value: "useItem" },
				{ name: "shop", value: "shop" },
				{ name: "buyItem", value: "buyItem" },
				{ name: "daily", value: "daily" },
				{ name: "train", value: "train" },
				{ name: "battle", value: "battle" },
				{ name: "care", value: "care" },
				{ name: "quest", value: "quest" }
			]
		},
		{
			type: ApplicationCommandOptionType.String,
			name: "petname",
			description: "The name of your pet (required for adopt action)",
			required: false
		},
		{
			type: ApplicationCommandOptionType.String,
			name: "pettype",
			description: "The type of pet (e.g., dog, cat) (required for adopt action)",
			required: false,
			choices: [
				{ name: "Dog", value: "Dog" },
				{ name: "Cat", value: "Cat" },
				{ name: "Rabbit", value: "Rabbit" },
				{ name: "Bird", value: "Bird" },
				{ name: "Fish", value: "Fish" },
				{ name: "Hamster", value: "Hamster" },
				{ name: "Turtle", value: "Turtle" },
				{ name: "Guinea Pig", value: "Guinea Pig" },
				{ name: "Lizard", value: "Lizard" },
				{ name: "Snake", value: "Snake" },
				{ name: "Frog", value: "Frog" },
				{ name: "Parrot", value: "Parrot" },
				{ name: "Ferret", value: "Ferret" },
				{ name: "Hedgehog", value: "Hedgehog" },
				{ name: "Chinchilla", value: "Chinchilla" }
			]
		},
		{
			type: ApplicationCommandOptionType.String,
			name: "itemname",
			description: "The name of the item (required for removeItem, useItem, buyItem, care actions)",
			required: false
		},
		{
			type: ApplicationCommandOptionType.Integer,
			name: "quantity",
			description: "The quantity of the item (optional for removeItem actions)",
			required: false
		},
		{
			type: ApplicationCommandOptionType.String,
			name: "skill",
			description: "The skill to train your pet (required for train action)",
			required: false
		},
		{
			type: ApplicationCommandOptionType.String,
			name: "opponent",
			description: "The ID of the opponent (required for battle action)",
			required: false
		},
		{
			type: ApplicationCommandOptionType.String,
			name: "questname",
			description: "The name of the quest (required for quest action)",
			required: false
		}
	],
	default_member_permissions: "0"
} as const;
