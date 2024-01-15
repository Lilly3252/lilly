import { SettingCommand } from "#slashyInformations/index.js";
import { permission } from "#utils/index.js";
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
		if (!permission(interaction, "Administrator")) {
			return;
		}
		const guildSettings = await guilds.findOne({
			guildID: interaction.guild.id
		});
		if (!guildSettings) {
			await guilds
				.create({
					guildID: interaction.guild.id,
					name: interaction.guild.name,
					auditLogEvent: false,
					logChannelID: null,
					welcomeChannelID: null,
					guildSettings: [
						{
							antiRaid: false,
							botUpdate: false,
							roleUpdate: false,
							guildUpdate: false,
							emojiUpdate: false,
							inviteUpdate: false,
							threadUpdate: false,
							memberUpdate: false,
							messageUpdate: false,
							channelUpdate: false,
							stickerUpdate: false,
							webhookUpdate: false,
							autoModeration: false,
							integrationUpdate: false,
							commandPermission: false,
							stageInstanceUpdate: false,
							guildScheduledUpdate: false
						}
					]
				})
				.then((guild) => guild.save);
			await interaction.editReply({
				content:
					"Hey turned out you had no settings , it has now been saved in our database, you can re-run that command now!"
			});
			return;
		}
		const settings = guildSettings.guildSettings;
		console.log(settings.map((key, value) => `${key}: ${value}`.replaceAll(",", "")));
		interaction.editReply("nope");
	}
}
