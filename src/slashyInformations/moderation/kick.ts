import { ApplicationCommandOptionType } from 'discord-api-types/v10';

export const KickCommand = {
	name: "kick",
	description: "Kick a user.",
	description_localizations: {
		fr: "Kick un utilisateur",
	},
	options: [
		{
			name: "target",
			name_localizations: {
			  fr: "target",
			},
			description: "Select a user to kick",
			description_localizations: {
			  fr: "Sélectionner l'utilisateur a kick",
			},
			type: ApplicationCommandOptionType.User,
		  },
	  
		  {
			name: "reason",
			name_localizations: {
			  fr: "raison",
			},
			description: "Reason of the kick",
			description_localizations: {
			  fr: "Raison du kick",
			},
			type: ApplicationCommandOptionType.String,
		  },
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