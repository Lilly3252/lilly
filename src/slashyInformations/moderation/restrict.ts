import { ApplicationCommandOptionType } from "discord-api-types/v10";

export const RestrictCommand = {
	name: "restrict",
	description: "restrict a member",
	description_localizations: {
		fr: "Restreindre un membre.",
		"es-ES": "Restringir a un miembro"
	},
	options: [
		{
			type: ApplicationCommandOptionType.User,
			name: "target",
			name_localizations: {
				fr: "target",
				"es-ES": "target"
			},
			description: "Select a user to restrict",
			description_localizations: {
				fr: "Sélectionner l'utilisateur a restreindre",
				"es-ES": "Selecciona al usuario que quieres restringir"
			},

			required: true
		},
		{
			type: ApplicationCommandOptionType.String,
			name: "restriction",
			name_localizations: {
				fr: "restriction",
				"es-ES": "Restricción"
			},
			description: "select a restriction",
			description_localizations: {
				fr: "Sélectionner une restriction",
				"es-ES": "Selecciona una restricción"
			},
			choices: [
				{
					name: "Embed",
					value: "embed"
				},
				{
					name: "Reaction",
					value: "reaction"
				},
				{
					name: "Voice",
					value: "voice"
				},
				{
					name: "Slash",
					value: "slash"
				}
			],
			required: true
		},
		{
			type: ApplicationCommandOptionType.String,
			name: "reason",
			name_localizations: {
				fr: "raison",
				"es-ES": "razón"
			},
			description: "Reason of the restriction",
			description_localizations: {
				fr: "Raison de la restriction.",
				"es-ES": "Razón de la restricción."
			},

			required: true
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
