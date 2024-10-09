import user from "#database/models/users.js";
import { PetCommand } from "#slashyInformations/index.js";
import { ArgsParam, LocaleParam } from "@yuudachi/framework/types";
import { AutocompleteInteraction } from "discord.js";

export async function Acare(interaction: AutocompleteInteraction<"cached">, args: ArgsParam<typeof PetCommand>["care"], locale: LocaleParam): Promise<void> {
	const careuserID = interaction.user.id;
	const careguildID = interaction.guildId;
	const userTocaree = await user.findOne({ userID: careuserID, guildID: careguildID });
	const careinventory = userTocaree.pet.inventory.food;

	await interaction.respond(careinventory.map((t) => ({ name: t.itemName.toString(), value: t.itemName.toString() })));
}
