import { ApplicationCommandOptionType } from "discord-api-types/v10";

export const TimeoutCommand = {
	name: "timeout",
	description: "timeout a member.",
	description_localizations: {
		fr: "Verification du ping."
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
	],
	default_member_permissions: "0"
} as const;
