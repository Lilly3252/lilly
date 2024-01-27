import { ApplicationCommandOptionType } from "discord-api-types/v10";

export const InfoCommand = {
	name: "info",
	description: "informations.",
	description_localizations: {
		fr: "informations."
	},
	options: [
		{
			type: ApplicationCommandOptionType.User,
			name: "target",
			name_localizations: {
				fr: "target"
			},
			description: "get the member you want information from.",
			description_localizations: {
				fr: "Afficher le membre don vous voulez l'information."
			}
		},
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
