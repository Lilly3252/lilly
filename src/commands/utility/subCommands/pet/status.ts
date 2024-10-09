import user from "#database/models/users.js";
import { PetCommand } from "#slashyInformations/index.js";
import { ArgsParam, InteractionParam, LocaleParam } from "@yuudachi/framework/types";
export async function petstatus(interaction: InteractionParam, args: ArgsParam<typeof PetCommand>["status"], locale: LocaleParam): Promise<void> {
	const userID = interaction.user.id;
	const userStatus = await user.findOne({ userID, guildID: interaction.guildId });
	if (!userStatus?.pet?.petName) {
		await interaction.reply("You do not have a pet.");
		return;
	}

	await interaction.reply(`Pet Name: ${userStatus.pet.petName}\nType: ${userStatus.pet.petType}\nHunger: ${userStatus.pet.hunger}\nHappiness: ${userStatus.pet.happiness}`);
}
