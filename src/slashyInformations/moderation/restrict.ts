import { ApplicationCommandOptionType } from "discord-api-types/v10";

export const RestrictCommand = {
	name: "restrict",
	description: "restrict a member",
	description_localizations: {
		fr: "Restreindre un membre."
	},
	options: [
		{
			type: ApplicationCommandOptionType.User,
			name: "target",
			name_localizations: {
				fr: "target"
			},
			description: "Select a user to restrict",
			description_localizations: {
				fr: "Sélectionner l'utilisateur a restreindre"
			},

			required: true
		},
		{
			type: ApplicationCommandOptionType.String,
			name: "restriction",
			name_localizations: {
				fr: "restriction"
			},
			description: "select a restriction",
			description_localizations: {
				fr: "Sélectionner une restriction"
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
				},
				{
					name: "Poll",
					value: "poll"
				}
			],
			required: true
		},
		{
			type: ApplicationCommandOptionType.String,
			name: "reason",
			name_localizations: {
				fr: "raison"
			},
			description: "Reason of the restriction",
			description_localizations: {
				fr: "Raison de la restriction."
			},

			required: true
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
	],
	default_member_permissions: "0"
} as const;
