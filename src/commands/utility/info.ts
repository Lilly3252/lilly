import users from "#database/models/users.js";
import { InfoCommand } from "#slashyInformations/index.js";
import { botInfo, channelInfo, roleInfo, userInfo } from "#utils/index.js";

import { Command } from "@yuudachi/framework";
import type { ArgsParam, InteractionParam, LocaleParam } from "@yuudachi/framework/types";
import { BaseGuildTextChannel } from "discord.js";

export default class extends Command<typeof InfoCommand> {
	public override async chatInput(
		interaction: InteractionParam,
		args: ArgsParam<typeof InfoCommand>,
		locale: LocaleParam
	): Promise<void> {
		const subCommand = interaction.options.getSubcommand();

		switch (subCommand) {
			case "user": {
				await interaction.deferReply({ ephemeral: args.user.hide ?? true });
				const member = interaction.options.getMember("target");
				const blacklist = await users.findOne({
					userID: interaction.user.id
				});
				try {
					if (member) {
						await interaction.editReply({ embeds: [userInfo(args, member, blacklist, locale)] });
					} else {
						const user = interaction.options.getUser("target");
						interaction.editReply({ embeds: [userInfo(args, user, blacklist, locale)] });
					}
				} catch (error) {
					console.log(error);
					interaction.editReply({ content: "something's wrong" });
				}
				break;
			}
			case "channel": {
				const channel = interaction.options.getChannel("channel") as BaseGuildTextChannel;
				await interaction.reply({
					embeds: [channelInfo(channel, locale)]
				});
				break;
			}
			case "role": {
				const role = interaction.options.getRole("role");

				interaction.reply({ embeds: [roleInfo(args, role, locale)] });
				break;
			}
			case "bot": {
				const application = await interaction.client.application.fetch();
				await interaction.reply({
					embeds: [botInfo(application, interaction, locale)]
				});
				break;
			}
		}
	}
}
