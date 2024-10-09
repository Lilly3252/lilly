import user from "#database/models/users.js";
import { PetCommand } from "#slashyInformations/index.js";
import { ArgsParam, LocaleParam } from "@yuudachi/framework/types";
import { AutocompleteInteraction } from "discord.js";
export async function Afeed(interaction: AutocompleteInteraction<"cached">, args: ArgsParam<typeof PetCommand>["feed"], locale: LocaleParam): Promise<void> {
	const feeduserID = interaction.user.id;
	const feedguildID = interaction.guildId;
	const userTofeedd = await user.findOne({ userID: feeduserID, guildID: feedguildID });
	const feedinventory = userTofeedd.pet.inventory.food;

	await interaction.respond(feedinventory.map((t) => ({ name: t.itemName.toString(), value: t.itemName.toString() })));
}
