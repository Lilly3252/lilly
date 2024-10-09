import guilds from "#database/models/guilds.js";
import { SettingCommand } from "#slashyInformations/index.js";
import { settingEmbed } from "#utils/index.js";
import { ArgsParam, InteractionParam, LocaleParam } from "@yuudachi/framework/types";

export async function show(interaction: InteractionParam, args: ArgsParam<typeof SettingCommand>["show"], locale: LocaleParam): Promise<void> {
	const guildSettings = await guilds.findOne({ guildID: interaction.guild.id });
	await interaction.deferReply({ ephemeral: args.hide ?? true });
	await interaction.editReply({ embeds: [settingEmbed(interaction, guildSettings, locale)] });
}
