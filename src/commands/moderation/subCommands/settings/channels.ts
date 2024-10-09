import guilds from "#database/models/guilds.js";
import { SettingCommand } from "#slashyInformations/index.js";
import { updateChannelSetting } from "#utils/functions.js";
import { ArgsParam, InteractionParam, LocaleParam } from "@yuudachi/framework/types";

export async function channel(interaction: InteractionParam, args: ArgsParam<typeof SettingCommand>["channels"], locale: LocaleParam): Promise<void> {
	const guildSettings = await guilds.findOne({ guildID: interaction.guild.id });
	const chan = interaction.options.getChannel("channel");
	const channels = interaction.options.getString("channels");
	await interaction.deferReply({ ephemeral: args.hide ?? true });
	switch (channels) {
		case "welcomechannel":
			if (chan.isTextBased()) {
				await updateChannelSetting(interaction, guildSettings, chan, "welcomeChannelID", chan?.id ?? null, "command.config.events.channel_set", "command.config.events.channel_removed", locale);
			}

			break;
		case "modlog":
			if (chan.isTextBased()) {
				await updateChannelSetting(interaction, guildSettings, chan, "logChannelID", chan?.id ?? null, "command.config.events.channel_set", "command.config.events.channel_removed", locale);
			}
			break;
	}
}
