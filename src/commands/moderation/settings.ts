import guilds from "#database/models/guilds.js";
import type { SettingCommand } from "#slashyInformations/index.js";
import { createSettings, permission, updateChannelSetting, updateEventSetting, updateRoleSetting, updateSafeRoles } from "#utils/index.js";
import { Command } from "@yuudachi/framework";
import type { ArgsParam, InteractionParam, LocaleParam } from "@yuudachi/framework/types";
import i18next from "i18next";
import { show } from "./sub/settings/show.js";

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
					const choice = interaction.options.getBoolean("choice");
					const logSettings = await guilds.findOne({ guildID: interaction.guild.id });
					await interaction.deferReply({ ephemeral: args.audit_log.hide ?? true });
					await logSettings.updateOne({ auditLogEvent: choice });
					interaction.editReply({
						content: i18next.t(choice ? "command.config.events.enabled" : "command.config.events.disabled", {
							event: "Audit logs",
							lng: locale
						})
					});
					break;
				case "channels":
					const channelSettings = await guilds.findOne({ guildID: interaction.guild.id });
					const chan = interaction.options.getChannel("channel");
					const channels = interaction.options.getString("channels");
					await interaction.deferReply({ ephemeral: args.channels.hide ?? true });
					switch (channels) {
						case "welcomechannel":
							if (chan.isTextBased()) {
								await updateChannelSetting(
									interaction,
									channelSettings,
									chan,
									"welcomeChannelID",
									chan?.id ?? null,
									"command.config.events.channel_set",
									"command.config.events.channel_removed",
									locale
								);
							}

							break;
						case "modlog":
							if (chan.isTextBased()) {
								await updateChannelSetting(interaction, channelSettings, chan, "logChannelID", chan?.id ?? null, "command.config.events.channel_set", "command.config.events.channel_removed", locale);
							}
							break;
					}
					break;
				case "events":
					const eventSettings = await guilds.findOne({ guildID: interaction.guild.id });
					await interaction.deferReply({ ephemeral: args.events.hide ?? true });
					const events = args.events;
					const eventKeys = [
						"antiRaid",
						"botUpdate",
						"roleUpdate",
						"threadUpdate",
						"guildUpdate",
						"emojiUpdate",
						"memberUpdate",
						"inviteUpdate",
						"messageUpdate",
						"channelUpdate",
						"stickerUpdate",
						"webhookUpdate",
						"autoModeration",
						"integrationUpdate",
						"commandPermission",
						"stageInstanceUpdate",
						"guildScheduledUpdate"
					];

					for (const event of events.events) {
						if (eventKeys.includes(event)) {
							await updateEventSetting(interaction, eventSettings, event, choice, locale);
						}
					}
					break;
				case "restriction_roles":
					const restrictionSettings = await guilds.findOne({ guildID: interaction.guild.id });
					const role = interaction.options.getRole("role_id");
					await interaction.deferReply({ ephemeral: args.restriction_roles.hide ?? true });
					await interaction.deferReply({ ephemeral: args.restriction_roles.hide ?? true });
					const roles = args["restriction-roles"].role;
					const roleKeys = ["restrictEmbedRole", "restrictPollRole", "restrictReactionRole", "restrictVoiceRole", "restrictSlashRole"];

					for (const roleKey of roleKeys) {
						if (roles === roleKey.replace("restrict", "").toLowerCase()) {
							await updateRoleSetting(interaction, restrictionSettings, role, roleKey, role?.id ?? null, "command.config.events.channel_set", "command.config.events.channel_removed", locale);
						}
					}

					if (roles === "safe") {
						await updateSafeRoles(interaction, restrictionSettings, role?.id ?? "", choice, locale);
					}
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
