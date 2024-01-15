import { ApplicationCommandOptionType } from "discord-api-types/v10";

export const InfoCommand = {
	name: "info",
	description: "informations.",
	description_localizations: {
		fr: "informations."
	},
	options: [
		{
			type: ApplicationCommandOptionType.Boolean,
			name: "hide",
			name_localizations: {
				fr: "masquer"
			},
			description: "Hides the output",
			description_localizations: {
				fr: "Masque(cacher) le résultat"
			}
		}
	],
	default_member_permissions: "0"
} as const;
