import { ApplicationCommandOptionType } from "discord-api-types/v10";

export const UnbanCommand = {
	name: "unban",
	description: "unban a user.",
	description_localizations: {
		fr: "revoker un ban."
	},
	options: [
		{
			type: ApplicationCommandOptionType.String,
			name: "id",
			name_localizations: {
				fr: "id"
			},
			description: "put a id",
			description_localizations: {
				fr: "Inscrire un id"
			},
			required: true
		},
		{
			type: ApplicationCommandOptionType.String,
			name: "reason",
			name_localizations: {
				fr: "raison"
			},
			description: "reason for revoking the ban",
			description_localizations: {
				fr: "raison pour revoker le ban"
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
	],
	default_member_permissions: "0"
} as const;
