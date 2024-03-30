import { ApplicationCommandOptionType } from "discord-api-types/v10";

export const UnbanCommand = {
	name: "unban",
	description: "unban a user.",
	description_localizations: {
		fr: "revoker un ban.",
		"es-ES": "Desbanea a un usuario."
	},
	options: [
		{
			type: ApplicationCommandOptionType.String,
			name: "id",
			name_localizations: {
				fr: "id",
				"es-ES": "id"
			},
			description: "put a id",
			description_localizations: {
				fr: "Inscrire un id",
				"es-ES": "id del usuario"
			},
			required: true
		},
		{
			type: ApplicationCommandOptionType.String,
			name: "reason",
			name_localizations: {
				fr: "raison",
				"es-ES": "razón"
			},
			description: "reason for revoking the ban",
			description_localizations: {
				fr: "raison pour revoker le ban",
				"es-ES": "Razón para desbanear a este usuario"
			}
		},
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
