import { ApplicationCommandOptionType } from 'discord-api-types/v10';

export const RestrictCommand = {
	name: "restrict",
	description: "restrict a member",
	description_localizations: {
		fr: "Restreindre un membre.",
	},
	options: [
		{
			name: "target",
			name_localizations: {
			  fr: "target",
			},
			description: "Select a user to restrict",
			description_localizations: {
			  fr: "Sélectionner l'utilisateur a restreindre",
			},
			type: ApplicationCommandOptionType.User,
			required:true
		  },
		  {
			name: "restriction",
			name_localizations: {
			  fr: "restriction",
			},
			description: "select a restriction",
			description_localizations: {
			  fr: "Sélectionner une restriction",
			},
			"choices": [
                {
                    "name": "Embed",
                    "value": "embed"
                },
                {
                    "name": "Reaction",
                    "value": "reaction"
                },
                {
                    "name": "Voice",
                    "value": "voice"
                },
				{
					"name": "Slash",
					"value":"slash"
				}
            ],
			type: ApplicationCommandOptionType.String,
			required:true
		  },
		  {
			name: "reason",
			name_localizations: {
			  fr: "raison",
			},
			description: "Reason of the restriction",
			description_localizations: {
			  fr: "Raison de la restriction.",
			},
			type: ApplicationCommandOptionType.String,
			required:true
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