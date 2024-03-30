import { ApplicationCommandOptionType } from "discord-api-types/v10";

export const InfoCommand = {
	name: "info",
	description: "informations.",
	description_localizations: {
		fr: "informations.",
		"es-ES": "informaciones."
	},
	options: [
		{
			type: ApplicationCommandOptionType.Subcommand,
			name: "user",
			description: "Show user info.",
			description_localizations: {
				fr: "Montre les info de l'utilisateur choisit.",
				"es-ES": "Muestra la información de un usuario"
			},
			options: [
				{
					type: ApplicationCommandOptionType.User,
					name: "target",
					name_localizations: {
						fr: "target",
						"es-ES": "target"
					},
					description: "get the member you want information from.",
					description_localizations: {
						fr: "Afficher le membre don vous voulez l'information.",
						"es-ES": "Selecciona al miembro del cual quieres ver la información."
					},
					required: true
				},
				{
					type: ApplicationCommandOptionType.Boolean,
					name: "verbose",
					name_localizations: {
						fr: "complet",
						"es-ES": "completo"
					},
					description: "show complete information",
					description_localizations: {
						fr: "montre toutes les informations",
						"es-ES": "mostrar la información completa"
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
			]
		},
		{
			type: ApplicationCommandOptionType.Subcommand,
			name: "channel",
			description: "Show channel info.",
			description_localizations: {
				fr: "Montre les info du channel choisit.",
				"es-ES": "Muestra la información de un canal."
			},
			options: [
				{
					type: ApplicationCommandOptionType.Channel,
					name: "channel",
					name_localizations: {
						fr: "channel",
						"es-ES": "canal"
					},
					description: "choose the channel",
					description_localizations: {
						fr: "selectionner le channel",
						"es-ES": "selecciona el canal"
					},
					required: true
				},
				{
					type: ApplicationCommandOptionType.Boolean,
					name: "verbose",
					name_localizations: {
						fr: "complet",
						"es-ES": "completo"
					},
					description: "show complete information",
					description_localizations: {
						fr: "montre toutes les informations",
						"es-ES": "mostrar la información completa"
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
			]
		},
		{
			type: ApplicationCommandOptionType.Subcommand,
			name: "role",
			description: "Information about a role in the guild",
			description_localizations: {
				fr: "Information a propos dun role dans la guilde",
				"es-ES": "Información de un rol del servidor"
			},
			options: [
				{
					type: ApplicationCommandOptionType.Role,
					name: "role",
					name_localizations: {
						fr: "role",
						"es-ES": "rol"
					},
					description: "Select a role.",
					description_localizations: {
						fr: "selectionnez un role.",
						"es-ES": "Seleccione el rol."
					},
					required: true
				},
				{
					type: ApplicationCommandOptionType.Boolean,
					name: "verbose",
					name_localizations: {
						fr: "complet",
						"es-ES": "completo"
					},
					description: "show complete information",
					description_localizations: {
						fr: "montre toutes les informations",
						"es-ES": "muestra la información completa"
					}
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
			]
		},
		{
			type: ApplicationCommandOptionType.Subcommand,
			name: "bot",
			description: "see bot's info",
			description_localizations: {
				fr: "voyez les information du bot.",
				"es-ES": "ve la información de un bot."
			},
			options: [
				{
					type: ApplicationCommandOptionType.Boolean,
					name: "verbose",
					name_localizations: {
						fr: "complet",
						"es-ES": "completo"
					},
					description: "show complete information",
					description_localizations: {
						fr: "montre toutes les informations",
						"es-ES": "muestra toda la información"
					}
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
			]
		},
		{
			type: ApplicationCommandOptionType.Subcommand,
			name: "server",
			description: "see server info",
			description_localizations: {
				fr: "voyez les information du bot.",
				"es-ES": "muestra la información del servidor"
			},
			options: [
				{
					type: ApplicationCommandOptionType.Boolean,
					name: "verbose",
					name_localizations: {
						fr: "complet",
						"es-ES": "completo"
					},
					description: "show complete information",
					description_localizations: {
						fr: "montre toutes les informations",
						"es-ES": "mostrar la información completa"
					}
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
			]
		}
	],
	default_member_permissions: "0"
} as const;
