import user from "#database/models/users.js";
import { PetCommand } from "#slashyInformations/index.js";
import { ArgsParam, InteractionParam, LocaleParam } from "@yuudachi/framework/types";
export async function train(interaction: InteractionParam, args: ArgsParam<typeof PetCommand>["train"], locale: LocaleParam): Promise<void> {
	const userID = interaction.user.id;
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
}
