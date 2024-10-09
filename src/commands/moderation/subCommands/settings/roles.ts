import guilds from "#database/models/guilds.js";
import { SettingCommand } from "#slashyInformations/index.js";
import { updateRoleSetting, updateSafeRoles } from "#utils/functions.js";
import { ArgsParam, InteractionParam, LocaleParam } from "@yuudachi/framework/types";

export async function roles(interaction: InteractionParam, args: ArgsParam<typeof SettingCommand>["restriction_roles"], locale: LocaleParam): Promise<void> {
	const choice = interaction.options.getBoolean("choice");
	const guildSettings = await guilds.findOne({ guildID: interaction.guild.id });
	const role = interaction.options.getRole("role_id");
	await interaction.deferReply({ ephemeral: args.hide ?? true });
	await interaction.deferReply({ ephemeral: args.hide ?? true });
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
}
