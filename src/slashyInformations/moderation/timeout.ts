import { ApplicationCommandOptionType } from "discord-api-types/v10";

export const TimeoutCommand = {
	name: "timeout",
	description: "Timeout a member.",
	description_localizations: {
		fr: "Mute un membre."
	},
	options: [
		{
			type: ApplicationCommandOptionType.User,
			name: "target",
			name_localizations: {
				fr: "membre"
			},
			description: "The member to timeout.",
			description_localizations: {
				fr: "Le membre à mute."
			},
			required: true
		},
		{
			type: ApplicationCommandOptionType.Integer,
			name: "duration",
			name_localizations: {
				fr: "durée"
			},
			description: "The duration of the timeout in seconds.",
			description_localizations: {
				fr: "La durée du mute en secondes."
			},
			required: true
		},
		{
			type: ApplicationCommandOptionType.String,
			name: "reason",
			name_localizations: {
				fr: "raison"
			},
			description: "The reason for the timeout.",
			description_localizations: {
				fr: "La raison du mute."
			},
			required: false
		},
		{
			type: ApplicationCommandOptionType.Boolean,
			name: "hide",
			name_localizations: {
				fr: "masquer"
			},
			description: "Hides the output.",
			description_localizations: {
				fr: "Masque le résultat."
			},
			required: false
		}
	],
	default_member_permissions: "0"
} as const;
