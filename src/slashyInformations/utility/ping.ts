import { ApplicationCommandOptionType } from "discord-api-types/v10";

export const PingCommand = {
	name: "ping",
	description: "check ping.",
	description_localizations: {
		fr: "Verification du ping.",
		"es-ES": "Chequea el ping"
	},
	options: [
		{
			type: ApplicationCommandOptionType.Boolean,
			name: "hide",
			name_localizations: {
				fr: "masquer",
				"es-ES": "ocultar"
			},
			description: "Hides the output",
			description_localizations: {
				fr: "Masque(cacher) le résultat",
				"es-ES": "No mostrar públicamente el resultado de esta acción."
			}
		}
	],
	default_member_permissions: "0"
} as const;
