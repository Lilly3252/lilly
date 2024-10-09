import user from "#database/models/users.js";
import { PetCommand } from "#slashyInformations/index.js";
import { ArgsParam, InteractionParam, LocaleParam } from "@yuudachi/framework/types";
export async function daily(interaction: InteractionParam, args: ArgsParam<typeof PetCommand>["daily"], locale: LocaleParam): Promise<void> {
	const userID = interaction.user.id;
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
}
