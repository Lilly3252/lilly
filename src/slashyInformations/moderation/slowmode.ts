import { ApplicationCommandOptionType } from 'discord-api-types/v10';

export const SlowmodeCommand = {
	name: "Slowmode",
	description: "Enabling a slowmode on the current channel.",
	description_localizations: {
		fr: "Instaurer un slowmode sur le channel courant.",
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
        {
			name: "time",
			name_localizations: {
				fr: "temps",
			},
			description: "Time of the slowmode ( in seconds )",
			description_localizations: {
				fr: "Temps du slowmode ( en secondes )",
			},
			type: ApplicationCommandOptionType.Number,
		}
	],
	default_member_permissions: "0",
} as const;