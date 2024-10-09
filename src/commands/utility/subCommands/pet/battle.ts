import user from "#database/models/users.js";
import { PetCommand } from "#slashyInformations/index.js";
import { ArgsParam, InteractionParam, LocaleParam } from "@yuudachi/framework/types";
export async function battle(interaction: InteractionParam, args: ArgsParam<typeof PetCommand>["battle"], locale: LocaleParam): Promise<void> {
	const userID = interaction.user.id;
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
}
