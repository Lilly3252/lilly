import { InfoCommand } from "#slashyInformations/index.js";
import { roleInfo } from "#utils/index.js";
import { ArgsParam, InteractionParam, LocaleParam } from "@yuudachi/framework/types";

export async function role(interaction: InteractionParam, args: ArgsParam<typeof InfoCommand>, locale: LocaleParam): Promise<void> {
	await interaction.deferReply({ ephemeral: args.role.hide ?? true });
	const role = interaction.options.getRole("role");

	interaction.editReply({ embeds: [roleInfo(args.role, role, locale)] });
}
