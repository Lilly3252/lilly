import { ApplicationCommandOptionType } from "discord-api-types/v10";

export const SettingCommand = {
	name: "settings",
	description: "Show or add settings.",
	description_localizations: {
		fr: "Montrer ou ajouter des paramètres de guilde.",
		"es-ES": "Revisa o ajusta las configuraciones del servidor."
	},
	options: [
		{
			type: ApplicationCommandOptionType.Subcommand,
			name: "show",
			description: "Show settings from the guild.",
			description_localizations: {
				fr: "Montrer les paramètres de guilde.",
				"es-ES": "Revisa las configuraciones del servidor."
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
			]
		},
		{
			type: ApplicationCommandOptionType.Subcommand,
			name: "audit_log",
			description: "Enable/disable audit logs",
			description_localizations: {
				fr: "activer/déactiver les logs serveur.",
				"es-ES": "activa/desactiva el registro de auditoría."
			},
			options: [
				{
					type: ApplicationCommandOptionType.Boolean,
					name: "choice",
					name_localizations: {
						fr: "choix",
						"es-ES": "elección"
					},
					description: "enable or disable the logs.",
					description_localizations: {
						fr: "activer ou déactiver les logs.",
						"es-ES": "activa o desactiva los registros"
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
			]
		},
		{
			type: ApplicationCommandOptionType.Subcommand,
			name: "channels",
			description: "Setup log and welcome channel",
			description_localizations: {
				fr: "activer/déactiver les logs serveur.",
				"es-ES": "Configura el canal de registros y el de bienvenidas."
			},
			options: [
				{
					type: ApplicationCommandOptionType.String,
					name: "channels",
					name_localizations: {
						fr: "channels"
					},
					description: "Select your channels.",
					description_localizations: {
						fr: "Selectionnez vos channels.",
						"es-ES": "Selecciona los canales."
					},
					choices: [
						{
							name: "Welcome Channel",
							value: "welcomechannel"
						},
						{
							name: "Mod Log",
							value: "modlog"
						}
					],
					required: true
				},
				{
					type: ApplicationCommandOptionType.Channel,
					name: "channel",
					name_localizations: {
						fr: "channel",
						"es-ES": "canal"
					},
					description: "select a channel.",
					description_localizations: {
						fr: "selectionne un channel.",
						"es-ES": "selecciona un canal."
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
			]
		},
		{
			type: ApplicationCommandOptionType.Subcommand,
			name: "events",
			description: "Set all your events for logging purposes",
			description_localizations: {
				fr: "Configurer toute vos évènements pour les logs.",
				"es-ES": "Configura los eventos que serán registrados y enviados al canal de registros."
			},
			options: [
				{
					type: ApplicationCommandOptionType.String,
					name: "events",
					name_localizations: {
						fr: "events",
						"es-ES": "eventos"
					},
					description: "select your events.",
					description_localizations: {
						fr: "selectionnez vos events.",
						"es-ES": "Selecciona los eventos para loguear"
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
