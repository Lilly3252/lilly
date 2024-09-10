import { ApplicationCommandOptionType } from "discord-api-types/v10";

export const KickCommand = {
	name: "kick",
	description: "Kick a user.",
	description_localizations: {
		fr: "Kick un utilisateur"
	},
	options: [
		{
			type: ApplicationCommandOptionType.User,
			name: "target",
			name_localizations: {
				fr: "target"
			},
			description: "Select a user to kick",
			description_localizations: {
				fr: "Sélectionner l'utilisateur a kick"
			},
			required: true
		},

		{
			type: ApplicationCommandOptionType.String,
			name: "reason",
			name_localizations: {
				fr: "raison"
			},
			description: "Reason of the kick",
			description_localizations: {
				fr: "Raison du kick"
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
