import { SettingCommand } from "#slashyInformations/index.js";
import { createSettings, permission, settingEmbed } from "#utils/index.js";
import { Command } from "@yuudachi/framework";
import type { ArgsParam, InteractionParam, LocaleParam } from "@yuudachi/framework/types";
import guilds from "#database/models/guilds.js";

export default class extends Command<typeof SettingCommand> {
	public override async chatInput(
		interaction: InteractionParam,
		args: ArgsParam<typeof SettingCommand>,
		locale: LocaleParam
	): Promise<void> {
		await interaction.deferReply({ ephemeral: args.hide ?? true });
		if (!(await permission(interaction, "Administrator"))) {
			return;
		}
		const guildSettings = await guilds.findOne({
			guildID: interaction.guild.id
		});
		if (!guildSettings) {
			await createSettings(interaction);
			await interaction.editReply({
				content:
					"Hey turns out you had no settings , it has now been saved in our database, you can re-run that command now!"
			});
			return;
		}

		await interaction.editReply({ embeds: [settingEmbed(interaction, guildSettings, locale)] }); // only for the sake of not having a error.
	}
}
