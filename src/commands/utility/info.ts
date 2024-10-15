import { InfoCommand } from "#slashyInformations/index.js";
import users from "#database/models/users.js";
import { Command } from "@yuudachi/framework";
import type { ArgsParam, InteractionParam, LocaleParam } from "@yuudachi/framework/types";
//import { bot } from "./subCommands/info/bot.js";
//import { channel } from "./subCommands/info/channels.js";
//import { role } from "./subCommands/info/role.js";
//import { server } from "./subCommands/info/server.js";
//import { user } from "./subCommands/info/user.js";
import { botInfo, channelInfo, roleInfo, userInfo } from "#utils/index.js";
import { BaseGuildTextChannel } from "discord.js";
import { serverInfo } from "#utils/embeds/infoServer.js";

export default class extends Command<typeof InfoCommand> {
	public override async chatInput(interaction: InteractionParam, args: ArgsParam<typeof InfoCommand>, locale: LocaleParam): Promise<void> {
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
						await interaction.editReply({ embeds: [userInfo(args.user, member, blacklist, locale)] });
					} else {
						const user = interaction.options.getUser("target");
						console.log(user.flags.toArray());
						await interaction.editReply({ embeds: [userInfo(args.user, user, blacklist, locale)] });
					}
				} catch (error) {
					console.log(error);
					interaction.editReply({ content: "something's wrong" });
				}
				break;
			}
			case "channel": {
				await interaction.deferReply({ ephemeral: args.channel.hide ?? true });
				const channel = interaction.options.getChannel("channel") as BaseGuildTextChannel;
				await interaction.editReply({
					embeds: [channelInfo(channel, locale)]
				});
				break;
			}
			case "role": {
				await interaction.deferReply({ ephemeral: args.role.hide ?? true });
				const role = interaction.options.getRole("role");

				interaction.editReply({ embeds: [roleInfo(args.role, role, locale)] });
				break;
			}
			case "bot": {
				await interaction.deferReply({ ephemeral: args.bot.hide ?? true });
				const application = await interaction.client.application.fetch();
				await interaction.editReply({
					embeds: [botInfo(application, interaction, args, locale)]
				});
				break;
			}
			case "server": {
				await interaction.deferReply({ ephemeral: args.server.hide ?? true });
				const role = interaction.guild.roles.cache.sort((c, a) => a.position - c.position).map((a) => a.toString());
				const member = interaction.guild.members.cache;
				const owner = await interaction.guild.fetchOwner();
				const channels = interaction.guild.channels.cache;
				const emoji = interaction.guild.emojis.cache;
				await interaction.editReply({
					embeds: [serverInfo(args, interaction, role, owner, member, emoji, channels, locale)]
				});
				break;
			}
		}
	}
}
