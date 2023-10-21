import { ApplicationCommandOptionType } from 'discord-api-types/v10';

export const UnbanCommand = {
	name: "unban",
	description: "unban a user.",
	description_localizations: {
		fr: "Verification du ping.",
	},
	options: [
		{
			name: "hide",
			name_localizations: {
				fr: "masquer",
			},
			description: "Hides the output",
			description_localizations: {
				fr: "Masque(cacher) le résultat",
			},
			type: ApplicationCommandOptionType.Boolean,
		},
	],
	default_member_permissions: "0",
} as const;