import { ApplicationCommandOptionType } from "discord-api-types/v10";

export const LockCommand = {
	name: "lock",
	description: "lock a channel",
	description_localizations: {
		fr: "verrouille un canaux de discussion"
	},
	options: [
		{
			name: "activate",
			name_localizations: {
				fr: "activation"
			},
			description: "lock this channel?",
			description_localizations: {
				fr: "verrouiller ce canaux ?"
			},
			type: ApplicationCommandOptionType.Boolean,
			required: true
		},

		{
			name: "hide",
			name_localizations: {
				fr: "masquer"
			},
			description: "Hides the output",
			description_localizations: {
				fr: "Masque(cacher) le résultat"
			},
			type: ApplicationCommandOptionType.Boolean
		}
	],
	default_member_permissions: "0"
} as const;
