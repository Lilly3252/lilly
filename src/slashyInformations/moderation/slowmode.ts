import { ApplicationCommandOptionType } from "discord-api-types/v10";
import { ChannelType } from "discord.js";

export const SlowmodeCommand = {
	name: "slowmode",
	description: "Enabling a slowmode on the current channel.",
	description_localizations: {
		fr: "Instaurer un slowmode sur le channel courant.",
		"es-ES": "Habilita el modo lento en el canal actual."
	},
	options: [
		{
			type: ApplicationCommandOptionType.Channel,
			name: "channel",
			name_localizations: {
				fr: "channel",
				"es-ES": "canal"
			},
			description: "Channel for the slowmode",
			description_localizations: {
				fr: "Channel pour le slowmode",
				"es-ES": "El canal donde quieres activar el modo lento"
			},
			channel_types: [ChannelType.GuildText, ChannelType.GuildVoice],
			required: true
		},
		{
			type: ApplicationCommandOptionType.Number,
			name: "time",
			name_localizations: {
				fr: "temps",
				"es-ES": "tiempo"
			},
			description: "Time of the slowmode ( in seconds )",
			description_localizations: {
				fr: "Temps du slowmode ( en secondes )",
				"es-ES": "Tiempo del modo lento ( en segundos )"
			},
			required: true
		},
		{
			type: ApplicationCommandOptionType.Boolean,
			name: "hide",
			name_localizations: {
				fr: "masquer",
				"es-ES": "ocultar"
			},
			description: "Hides the output",
			description_localizations: {
				fr: "Masque(cacher) le résultat",
				"es-ES": "No mostrar públicamente el resultado de esta acción."
			}
		}
	],

	default_member_permissions: "0"
} as const;
