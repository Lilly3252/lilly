import { ApplicationCommandOptionType } from "discord-api-types/v10";

export const LockCommand = {
	name: "lock",
	description: "lock a channel",
	description_localizations: {
		fr: "verrouille un canaux de discussion",
		"es-ES": "Cierra un canal de discusión"
	},
	options: [
		{
			name: "activate",
			name_localizations: {
				fr: "activation",
				"es-ES": "activar"
			},
			description: "lock this channel?",
			description_localizations: {
				fr: "verrouiller ce canaux ?",
				"es-ES": "¿Cerrar este canal?"
			},
			type: ApplicationCommandOptionType.Boolean,
			required: true
		},

		{
			name: "hide",
			name_localizations: {
				fr: "masquer",
				"es-ES": "ocultar"
			},
			description: "Hides the output",
			description_localizations: {
				fr: "Masque(cacher) le résultat",
				"es-ES": "No mostrar públicamente el resultado de esta acción."
			},
			type: ApplicationCommandOptionType.Boolean
		}
	],
	default_member_permissions: "0"
} as const;
