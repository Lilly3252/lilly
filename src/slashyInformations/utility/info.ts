import { ApplicationCommandOptionType } from "discord-api-types/v10";

export const InfoCommand = {
	name: "info",
	description: "informations.",
	description_localizations: {
		fr: "informations."
	},
	options: [
		{
			type: ApplicationCommandOptionType.Subcommand,
			name: "user",
			description: "Show user info.",
			description_localizations: {
				fr: "Montre les info de l'utilisateur choisit."
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
					},
					required: true
				},
				{
					type: ApplicationCommandOptionType.Boolean,
					name: "verbose",
					name_localizations: {
						fr: "complet"
					},
					description: "show complete information",
					description_localizations: {
						fr: "montre toutes les informations"
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
			]
		},
		{
			type: ApplicationCommandOptionType.Subcommand,
			name: "channel",
			description: "Show channel info.",
			description_localizations: {
				fr: "Montre les info du channel choisit."
			},
			options: [
				{
					type: ApplicationCommandOptionType.Channel,
					name: "channel",
					name_localizations: {
						fr: "channel"
					},
					description: "choose the channel",
					description_localizations: {
						fr: "selectionner le channel"
					},
					required: true
				},
				{
					type: ApplicationCommandOptionType.Boolean,
					name: "verbose",
					name_localizations: {
						fr: "complet"
					},
					description: "show complete information",
					description_localizations: {
						fr: "montre toutes les informations"
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
			]
		},
		{
			type: ApplicationCommandOptionType.Subcommand,
			name: "role",
			description: "Information about a role in the guild",
			description_localizations: {
				fr: "Information a propos dun role dans la guilde"
			},
			options: [
				{
					type: ApplicationCommandOptionType.Role,
					name: "role",
					name_localizations: {
						fr: "role"
					},
					description: "Select a role.",
					description_localizations: {
						fr: "selectionnez un role."
					},
					required: true
				},
				{
					type: ApplicationCommandOptionType.Boolean,
					name: "verbose",
					name_localizations: {
						fr: "complet"
					},
					description: "show complete information",
					description_localizations: {
						fr: "montre toutes les informations"
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
		},
		{
			type: ApplicationCommandOptionType.Subcommand,
			name: "bot",
			description: "see bot's info",
			description_localizations: {
				fr: "voyez les information du bot."
			},
			options: [
				{
					type: ApplicationCommandOptionType.Boolean,
					name: "verbose",
					name_localizations: {
						fr: "complet"
					},
					description: "show complete information",
					description_localizations: {
						fr: "montre toutes les informations"
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
		},
		{
			type: ApplicationCommandOptionType.Subcommand,
			name: "server",
			description: "see server info",
			description_localizations: {
				fr: "voyez les information du bot."
			},
			options: [
				{
					type: ApplicationCommandOptionType.Boolean,
					name: "verbose",
					name_localizations: {
						fr: "complet"
					},
					description: "show complete information",
					description_localizations: {
						fr: "montre toutes les informations"
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
