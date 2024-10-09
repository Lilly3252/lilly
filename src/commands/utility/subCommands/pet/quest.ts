import user from "#database/models/users.js";
import { PetCommand } from "#slashyInformations/index.js";
import { quests } from "#utils/quests.js";
import { ArgsParam, InteractionParam, LocaleParam } from "@yuudachi/framework/types";
export async function quest(interaction: InteractionParam, args: ArgsParam<typeof PetCommand>["quest"], locale: LocaleParam): Promise<void> {
	const userID = interaction.user.id;
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
}
