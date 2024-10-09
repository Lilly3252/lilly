import guilds from "#database/models/guilds.js";
import { SettingCommand } from "#slashyInformations/index.js";
import { ArgsParam, InteractionParam, LocaleParam } from "@yuudachi/framework/types";
import i18next from "i18next";

export async function auditLogs(interaction: InteractionParam, args: ArgsParam<typeof SettingCommand>["audit_log"], locale: LocaleParam): Promise<void> {
	const choice = interaction.options.getBoolean("choice");
	const guildSettings = await guilds.findOne({ guildID: interaction.guild.id });
	await interaction.deferReply({ ephemeral: args.hide ?? true });
	await guildSettings.updateOne({ auditLogEvent: choice });
	interaction.editReply({
		content: i18next.t(choice ? "command.config.events.enabled" : "command.config.events.disabled", {
			event: "Audit logs",
			lng: locale
		})
	});
}
