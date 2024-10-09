import { InfoCommand } from "#slashyInformations/index.js";
import { botInfo } from "#utils/index.js";
import { ArgsParam, InteractionParam, LocaleParam } from "@yuudachi/framework/types";

export async function bot(interaction: InteractionParam, args: ArgsParam<typeof InfoCommand>, locale: LocaleParam): Promise<void> {
	await interaction.deferReply({ ephemeral: args.bot.hide ?? true });
	const application = await interaction.client.application.fetch();
	await interaction.editReply({
		embeds: [botInfo(application, interaction, args, locale)]
	});
}
