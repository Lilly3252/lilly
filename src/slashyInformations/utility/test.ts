import { ApplicationCommandOptionType } from "discord-api-types/v10";

export const TestCommand = {
	name: "test",
	description: "test.",
	description_localizations: {
		fr: "test."
	},
	options: [
		{
			type: ApplicationCommandOptionType.String,
			name: "query",
			name_localizations: {
				fr: "query"
			},
			description: "query",
			description_localizations: {
				fr: "query"
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
