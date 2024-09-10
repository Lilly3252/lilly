import { ApplicationCommandOptionType } from "discord-api-types/v10";
import { ChannelType } from "discord.js";

export const SlowmodeCommand = {
	name: "slowmode",
	description: "Enabling a slowmode on the current channel.",
	description_localizations: {
		fr: "Instaurer un slowmode sur le channel courant."
	},
	options: [
		{
			type: ApplicationCommandOptionType.Channel,
			name: "channel",
			name_localizations: {
				fr: "channel"
			},
			description: "Channel for the slowmode",
			description_localizations: {
				fr: "Channel pour le slowmode"
			},
			channel_types: [ChannelType.GuildText, ChannelType.GuildVoice],
			required: true
		},
		{
			type: ApplicationCommandOptionType.Number,
			name: "time",
			name_localizations: {
				fr: "temps"
			},
			description: "Time of the slowmode ( in seconds )",
			description_localizations: {
				fr: "Temps du slowmode ( en secondes )"
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
