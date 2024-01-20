import { ApplicationCommandOptionType } from "discord-api-types/v10";

export const SettingCommand = {
	name: "settings",
	description: "Show or add settings.",
	description_localizations: {
		fr: "Montrer ou ajouter des paramètres de guilde."
	},
	options: [
		{
			type: ApplicationCommandOptionType.Subcommand,
			name: "show",
			description: "Show settings from the guild.",
			description_localizations: {
				fr: "Montrer les paramètres de guilde."
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
			]
		},
		{
			type: ApplicationCommandOptionType.Subcommand,
			name: "audit_log",
			description: "Enable/disable audit logs",
			description_localizations: {
				fr: "activer/déactiver les logs serveur."
			},
			options: [
				{
					type: ApplicationCommandOptionType.Boolean,
					name: "choice",
					name_localizations: {
						fr: "choix"
					},
					description: "enable or disable the logs.",
					description_localizations: {
						fr: "activer ou déactiver les logs."
					},
					required: true
				},
				{
					type: ApplicationCommandOptionType.Boolean,
					name: "hide",
					name_localizations: {
						fr: "masquer"
					},
					description: "Hides the output.",
					description_localizations: {
						fr: "Masque(cacher) le résultat."
					}
				}
			]
		},
		{
			type: ApplicationCommandOptionType.Subcommand,
			name: "channels",
			description: "Setup log and welcome channel",
			description_localizations: {
				fr: "activer/déactiver les logs serveur."
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
						fr: "Selectionnez vos channels."
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
						fr: "channel"
					},
					description: "select a channel.",
					description_localizations: {
						fr: "selectionne un channel."
					},
					required: true
				},
				{
					type: ApplicationCommandOptionType.Boolean,
					name: "hide",
					name_localizations: {
						fr: "masquer"
					},
					description: "Hides the output.",
					description_localizations: {
						fr: "Masque(cacher) le résultat."
					}
				}
			]
		},
		{
			type: ApplicationCommandOptionType.Subcommand,
			name: "events",
			description: "Set all your events for logging purposes",
			description_localizations: {
				fr: "Configurer toute vos évènements pour les logs."
			},
			options: [
				{
					type: ApplicationCommandOptionType.String,
					name: "events",
					name_localizations: {
						fr: "events"
					},
					description: "select your events.",
					description_localizations: {
						fr: "selectionnez vos events."
					}
				},
				{
					type: ApplicationCommandOptionType.Boolean,
					name: "hide",
					name_localizations: {
						fr: "masquer"
					},
					description: "Hides the output.",
					description_localizations: {
						fr: "Masque(cacher) le résultat."
					}
				}
			]
		}
	],
	default_member_permissions: "0"
} as const;
