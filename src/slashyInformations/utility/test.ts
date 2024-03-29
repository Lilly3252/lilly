import { ApplicationCommandOptionType } from "discord-api-types/v10";

export const TestCommand = {
	name: "test",
	description: "test.",
	description_localizations: {
		fr: "test."
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
		},
		{
			type: ApplicationCommandOptionType.User,
			name: "user",
			name_localizations: {
				fr: "utilisateur"
			},
			description: "User",
			description_localizations: {
				fr: "User"
			}
		}
	],
	default_member_permissions: "0"
} as const;
