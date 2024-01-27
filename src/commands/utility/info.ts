import { InfoCommand } from "#slashyInformations/index.js";
import { userInfo } from "#utils/embeds/infoRole.js";

import { Command } from "@yuudachi/framework";
import type { ArgsParam, InteractionParam, LocaleParam } from "@yuudachi/framework/types";

export default class extends Command<typeof InfoCommand> {
	public override async chatInput(
		interaction: InteractionParam,
		args: ArgsParam<typeof InfoCommand>,
		locale: LocaleParam
	): Promise<void> {
		await interaction.deferReply({ ephemeral: args.hide ?? true });
		const member = interaction.options.getMember("target");
		interaction.editReply({ embeds: [userInfo(member, locale)] }).then((message) => {
			console.log(message.id);
		});

		/*
		const roles = interaction.guild.roles.fetch();
		const roles_in_a_map = (await roles).map((roles: Role) => {
			return `\nRole name:${roles.name} Role id: ${roles.id} \npeople in it: ${roles.members.map(
				(members: GuildMember) => {
					return `\n${members.id}`;
				}
			)}`;
		});
		interaction.editReply({ content: roles_in_a_map.toString() });
	*/
	}
}
