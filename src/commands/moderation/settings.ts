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
		const channels = args.channels.channels;
		const choice = args.audit_log.choice;
		const chan = args.channels.channel;
		const guildSettings = await guilds.findOne({
			guildID: interaction.guild.id
		});
		if (!guildSettings) {
			await createSettings(interaction);
			await interaction.reply({
				content:
					"Hey turns out you had no settings , it has now been saved in our database, you can re-run that command now!",
				ephemeral: true
			});
			return;
		}
		switch (Object.keys(args)[0]) {
			case "show": {
				await interaction.deferReply({ ephemeral: args.show.hide ?? true });
				if (!(await permission(interaction, "ManageGuild"))) {
					return;
				}
				await interaction.editReply({ embeds: [settingEmbed(interaction, guildSettings, locale)] });
				break;
			}
			case "audit_log": {
				await interaction.deferReply({ ephemeral: args.audit_log.hide ?? true });
				if (!(await permission(interaction, "ManageGuild"))) {
					return;
				}
				if (choice) {
					guildSettings.updateOne({ auditLogEvent: true }).then(() =>
						interaction.editReply({
							content: `✅ Audit log is now enabled`
						})
					);
				} else {
					await guildSettings.updateOne({ auditLogEvent: false }).then(() =>
						interaction.editReply({
							content: `✅ Audit log is now disabled`
						})
					);
				}

				break;
			}
			case "channels": {
				await interaction.deferReply({ ephemeral: args.channels.hide ?? true });
				if (!(await permission(interaction, "ManageGuild"))) {
					return;
				}
				switch (channels) {
					case "welcomechannel":
						{
							if (chan?.isTextBased()) {
								await guildSettings.updateOne({ welcomeChannelID: chan.id }).then(() =>
									interaction.editReply({
										content: `✅ Welcome Channel has been set to ${chan}`
									})
								);
							} else {
								await guildSettings.updateOne({ welcomeChannelID: null });
								interaction.editReply({
									content: `✅ Welcome Channel has been removed`
								});
							}
						}
						break;
					case "modlog":
						{
							if (chan?.isTextBased()) {
								await guildSettings.updateOne({ logChannelID: chan.id }).then(() =>
									interaction.editReply({
										content: `✅ ModLog Channel has been set to ${chan}`
									})
								);
								return;
							} else {
								await guildSettings.updateOne({ logChannelID: null });
								interaction.editReply({
									content: `✅ ModLog Channel has been removed`
								});
							}
						}
						break;
				}
				break;
			}
			case "events": {
				await interaction.deferReply({ ephemeral: args.events.hide ?? true });
				if (!(await permission(interaction, "ManageGuild"))) {
					return;
				}
				guildSettings.updateOne({ auditLogEvent: true });
				break;
			}
			default:
				break;
		}
	}
}
