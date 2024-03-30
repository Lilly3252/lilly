import { ApplicationCommandOptionType } from "discord-api-types/v10";

export const BlacklistCommand = {
	// pingCommand / banCommand / settingCommand ...
	name: "blacklist",
	name_localizations: {
		fr: "liste-noire",
		"es-ES": "lista-negra"
	},
	description: "Add a user to the blacklist.",
	description_localizations: {
		fr: "Ajouter un membre a la liste noire.",
		"es-ES": "Añade a un miembro a la lista negra."
	},
	options: [
		{
			type: ApplicationCommandOptionType.User,
			name: "target",
			name_localizations: {
				fr: "target",
				"es-ES": "target"
			},
			description: "User to be added",
			description_localizations: {
				fr: "Membre a ajouter",
				"es-ES": "Miembro a añadir"
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
			description: "Hides the output.",
			description_localizations: {
				fr: "Masque(cacher) le résultat.",
				"es-ES": "No mostrar públicamente el resultado de esta acción."
			}
		}
	],
	default_member_permissions: "0"
} as const;
