import { InfoCommand } from "#slashyInformations/index.js";
import { channelInfo } from "#utils/index.js";
import { ArgsParam, InteractionParam } from "@yuudachi/framework/types";
import { BaseGuildTextChannel, MessageFlags } from "discord.js";

export async function channel(interaction: InteractionParam,args: ArgsParam<typeof InfoCommand>): Promise<void> {
	const channel = interaction.options.getChannel("channel") as BaseGuildTextChannel;
	await interaction.editReply({ components: [await channelInfo(channel, interaction.locale)],flags:MessageFlags.IsComponentsV2 });
}
