import { ApplicationCommandOptionType } from 'discord-api-types/v10';

export const SettingCommand = {
	name: "settings",
	description: "Show or add settings.",
	description_localizations: {
		fr: "Montrer ou ajouter des paramètres de guilde.",
	},
	options: [
		{
			name: "hide",
			name_localizations: {
				fr: "masquer",
			},
			description: "Hides the output",
			description_localizations: {
				fr: "Masque(cacher) le résultat",
			},
			type: ApplicationCommandOptionType.Boolean,
		},
	],
	default_member_permissions: "0",
} as const;