import { ApplicationCommandOptionType } from "discord-api-types/v10";

export const KickCommand = {
	name: "kick",
	description: "Kick a user.",
	description_localizations: {
		fr: "Kick un utilisateur",
		"es-ES": "Expulsa a un usuario"
	},
	options: [
		{
			type: ApplicationCommandOptionType.User,
			name: "target",
			name_localizations: {
				fr: "target",
				"es-ES": "target",
			},
			description: "Select a user to kick",
			description_localizations: {
				fr: "Sélectionner l'utilisateur a kick",
				"es-ES": "Selecciona al usuario a expulsar"
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
			description: "Reason of the kick",
			description_localizations: {
				fr: "Raison du kick",
				"es-ES": "Razón de la expulsión"
			}
		},
		{
			type: ApplicationCommandOptionType.Boolean,
			name: "hide",
			name_localizations: {
				fr: "masquer",
				"es-ES": "esconder"
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
