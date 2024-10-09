import { InfoCommand } from "#slashyInformations/index.js";
import { serverInfo } from "#utils/embeds/infoServer.js";
import { ArgsParam, InteractionParam, LocaleParam } from "@yuudachi/framework/types";

export async function server(interaction: InteractionParam, args: ArgsParam<typeof InfoCommand>, locale: LocaleParam): Promise<void> {
	await interaction.deferReply({ ephemeral: args.server.hide ?? true });
	const role = interaction.guild.roles.cache.sort((c, a) => a.position - c.position).map((a) => a.toString());
	const member = interaction.guild.members.cache;
	const owner = await interaction.guild.fetchOwner();
	const channels = interaction.guild.channels.cache;
	const emoji = interaction.guild.emojis.cache;
	await interaction.editReply({
		embeds: [serverInfo(args, interaction, role, owner, member, emoji, channels, locale)]
	});
}
