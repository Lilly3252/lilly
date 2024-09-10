import guilds from "#database/models/guilds.js";
import { SettingCommand } from "#slashyInformations/index.js";
import { createSettings, permission, settingEmbed, updateChannelSetting, updateEventSetting, updateRoleSetting, updateSafeRoles } from "#utils/index.js";
import { Command } from "@yuudachi/framework";
import type { ArgsParam, InteractionParam, LocaleParam } from "@yuudachi/framework/types";
import i18next from "i18next";

export default class extends Command<typeof SettingCommand> {
	public override async chatInput(interaction: InteractionParam, args: ArgsParam<typeof SettingCommand>, locale: LocaleParam): Promise<void> {
		const subCommands = interaction.options.getSubcommand();
		const channels = interaction.options.getString("channels");
		const choice = interaction.options.getBoolean("choice");
		const chan = interaction.options.getChannel("channel");
		const role = interaction.options.getRole("role_id");
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
					await interaction.deferReply({ ephemeral: args.show.hide ?? true });
					await interaction.editReply({ embeds: [settingEmbed(interaction, guildSettings, locale)] });
					break;
				case "audit_log":
					await interaction.deferReply({ ephemeral: args.audit_log.hide ?? true });
					await guildSettings.updateOne({ auditLogEvent: choice });
					interaction.editReply({
						content: i18next.t(choice ? "command.config.events.enabled" : "command.config.events.disabled", {
							event: "Audit logs",
							lng: locale
						})
					});
					break;
				case "channels":
					await interaction.deferReply({ ephemeral: args.channels.hide ?? true });
					switch (channels) {
						case "welcomechannel":
							if (chan.isTextBased()) {
								await updateChannelSetting(
									interaction,
									guildSettings,
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
								await updateChannelSetting(interaction, guildSettings, chan, "logChannelID", chan?.id ?? null, "command.config.events.channel_set", "command.config.events.channel_removed", locale);
							}
							break;
					}
					break;
				case "events":
					await interaction.deferReply({ ephemeral: args.events.hide ?? true });
					const events = args.events.events;
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

					for (const event of events) {
						if (eventKeys.includes(event)) {
							await updateEventSetting(interaction, guildSettings, event, choice, locale);
						}
					}
					break;
				case "roles":
					await interaction.deferReply({ ephemeral: args["restriction-roles"].hide ?? true });
					const roles = args["restriction-roles"].role;
					const roleKeys = ["restrictEmbedRole", "restrictPollRole", "restrictReactionRole", "restrictVoiceRole", "restrictSlashRole"];

					for (const roleKey of roleKeys) {
						if (roles === roleKey.replace("restrict", "").toLowerCase()) {
							await updateRoleSetting(interaction, guildSettings, role, roleKey, role?.id ?? null, "command.config.events.channel_set", "command.config.events.channel_removed", locale);
						}
					}

					if (roles === "safe") {
						await updateSafeRoles(interaction, guildSettings, role?.id ?? "", choice, locale);
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
