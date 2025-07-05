import users from "#database/models/users.js";
import { InfoCommand } from "#slashyInformations/index.js";
import { userInfo } from "#utils/index.js";
import { ArgsParam, InteractionParam } from "@yuudachi/framework/types";
import { MessageFlags } from "discord.js";

export async function user(interaction: InteractionParam, args: ArgsParam<typeof InfoCommand>["user"]): Promise<void> {
	const member = interaction.options.getMember("target");
	const blacklist = await users.findOne({ userID: interaction.user.id });
	try {
		if (member) {
			await interaction.editReply({ components: [await userInfo(args, member, blacklist!, interaction.locale)] , flags:MessageFlags.IsComponentsV2});
		} else {
			const user = interaction.options.getUser("target");
			await interaction.editReply({ components: [await userInfo(args, user!, blacklist!, interaction.locale)],flags:MessageFlags.IsComponentsV2 });
		}
	} catch (error) {
		console.log(error);
		interaction.editReply({ content: "something's wrong" });
	}
}
