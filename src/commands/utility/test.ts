import { TestCommand } from "#slashyInformations/utility/test.js";

import { Command, createModal } from "@yuudachi/framework";
import type { ArgsParam, InteractionParam, LocaleParam } from "@yuudachi/framework/types";
import { APIActionRowComponent, APIModalActionRowComponent, ComponentType, TextInputStyle } from "discord.js";
import i18next from "i18next";

export default class extends Command<typeof TestCommand> {
	public override async chatInput(interaction: InteractionParam, args: ArgsParam<typeof TestCommand>, locale: LocaleParam): Promise<void> {
		const nameInput: APIActionRowComponent<APIModalActionRowComponent> = {
			type: ComponentType.ActionRow,
			components: [
				{
					type: ComponentType.TextInput,
					label: i18next.t("modal.character_create.nameInput.label", { lng: locale }),
					custom_id: "nameInput",
					style: TextInputStyle.Short,
					required: true
				}
			]
		};
		const hobbiesInput: APIActionRowComponent<APIModalActionRowComponent> = {
			type: ComponentType.ActionRow,
			components: [
				{
					type: ComponentType.TextInput,
					label: i18next.t("modal.character_create.hobbiesInput.label", { lng: locale }),
					custom_id: "hobbiesInput",
					style: TextInputStyle.Paragraph
				}
			]
		};

		const modal = createModal({
			components: [nameInput, hobbiesInput],
			customId: "characterCreate",
			title: i18next.t("modal.character_create.title", { lng: locale })
		});

		await interaction.showModal(modal);
	}
}
