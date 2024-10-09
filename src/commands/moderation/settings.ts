import guilds from "#database/models/guilds.js";
import { SettingCommand } from "#slashyInformations/index.js";
import { createSettings, permission } from "#utils/index.js";
import { Command } from "@yuudachi/framework";
import type { ArgsParam, InteractionParam, LocaleParam } from "@yuudachi/framework/types";
import i18next from "i18next";
import { auditLogs } from "./subCommands/settings/auditLogs.js";
import { channel } from "./subCommands/settings/channels.js";
import { event } from "./subCommands/settings/events.js";
import { roles } from "./subCommands/settings/roles.js";
import { show } from "./subCommands/settings/show.js";

export default class extends Command<typeof SettingCommand> {
	public override async chatInput(interaction: InteractionParam, args: ArgsParam<typeof SettingCommand>, locale: LocaleParam): Promise<void> {
		const subCommands = interaction.options.getSubcommand();
		const guildSettings = await guilds.findOne({ guildID: interaction.guild.id });

		if (!(await permission(interaction, "ManageGuild"))) {
			return;
		}

		if (!guildSettings) {
			await createSettings(interaction);
			await interaction.reply({
				content: i18next.t("command.config.common.errors.no_settings", { lng: locale }),
				ephemeral: true
			});
			return;
		}

		try {
			switch (subCommands) {
				case "show":
					await show(interaction, args.show, locale);
					break;
				case "audit_log":
					await auditLogs(interaction, args.audit_log, locale);
					break;
				case "channels":
					await channel(interaction, args.channels, locale);
					break;
				case "events":
					await event(interaction, args.events, locale);
					break;
				case "restriction-roles":
					await roles(interaction, args.restriction_roles, locale);
					break;
				default:
					break;
			}
		} catch (error) {
			console.error(error);
			interaction.reply({
				content: "An error occurred while updating the settings.",
				ephemeral: true
			});
		}
	}
}
