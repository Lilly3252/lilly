import user from "#database/models/users.js";
import { PetCommand } from "#slashyInformations/index.js";
import { ArgsParam, LocaleParam } from "@yuudachi/framework/types";
import { AutocompleteInteraction } from "discord.js";
export async function Aplay(interaction: AutocompleteInteraction<"cached">, args: ArgsParam<typeof PetCommand>["play"], locale: LocaleParam): Promise<void> {
	const userID = interaction.user.id;
	const guildID = interaction.guildId;
	const userToPlay = await user.findOne({ userID, guildID });
	const inventory = userToPlay.pet.inventory.toys;

	await interaction.respond(inventory.map((t) => ({ name: t.itemName.toString(), value: t.itemName.toString() })));
}
