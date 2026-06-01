import { ApplicationCommandOptionType, Locale } from "discord-api-types/v10";

export const TestCommand = {
	name: "test",
	description: "test.",
	description_localizations: {
    fr: "test.",
		[Locale.SpanishLATAM]: "test."
	},
	options: [
		{
			type: ApplicationCommandOptionType.Boolean,
			name: "hide",
			name_localizations: {
        fr: "masquer",
				[Locale.SpanishLATAM]: "ocultar",
			},
			description: "Hides the output",
			description_localizations: {
				fr: "Masque(cacher) le résultat",
				[Locale.SpanishLATAM]: "Ocultar la respuesta del comando",
			}
		}
	],
	default_member_permissions: "0"
} as const;
