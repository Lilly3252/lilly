import { UnbanCommand } from "#slashyInformations/index.js";
import { permission } from "#utils/index.js";

import { Command } from "@yuudachi/framework";
import type { ArgsParam, InteractionParam, LocaleParam } from "@yuudachi/framework/types";
import i18next from "i18next";

export default class extends Command<typeof UnbanCommand> {
	public override async chatInput(interaction: InteractionParam, args: ArgsParam<typeof UnbanCommand>, locale: LocaleParam): Promise<void> {
		await interaction.deferReply({ ephemeral: args.hide ?? true });
		if (!(await permission(interaction, "BanMembers"))) {
			return;
		}

		const id = args.id ?? interaction.options.getString("id");
		const reason = args.reason ?? "No reason provided";

		await interaction.guild.members.unban(id);
		if (!id || Number.isNaN(id)) {
			await interaction.editReply({
				content: i18next.t("command.mod.unban.errors.no_ids", {
					lng: locale
				})
			});
			return;
		}
		await interaction.guild.bans.fetch().then(async (guildban) => {
			const findbanned = guildban.find((banned) => banned.user.id === id);

			if (guildban.size == 0) {
				await interaction.editReply({
					content: i18next.t("command.mod.unban.errors.no_banned", {
						lng: locale
					})
				});
				return;
			}

			if (!findbanned) {
				await interaction.editReply({
					content: i18next.t("command.mod.unban.errors.no_ban", {
						user: `${id}`,
						lng: locale
					})
				});
				return;
			} else {
				await interaction.guild.members.unban(findbanned.user, reason);
				await interaction.editReply({
					content: i18next.t("command.mod.unban.success", {
						user: `${id}`,
						lng: locale
					})
				});
			}
		});
	}
}
