import { ApplicationCommandOptionType, Locale } from "discord-api-types/v10";
import { ApplicationIntegrationType } from "discord.js";

export const PingCommand = {
	name: "ping",
	description: "Check ping.",
	integration_types: [ApplicationIntegrationType.UserInstall],
	description_localizations: {
		fr: "Vérification du ping.",
    ja: "ピングの確認。",
    [Locale.SpanishLATAM]: "Verificar el ping",
	},
	options: [
		{
			type: ApplicationCommandOptionType.Boolean,
			name: "hide",
			name_localizations: {
				fr: "masquer",
				ja: "非表示",
				[Locale.SpanishLATAM]: "ocultar",
			},
			description: "Hides the output",
			description_localizations: {
				fr: "Masque(cacher) le résultat",
				ja: "出力を非表示にする",
				[Locale.SpanishLATAM]: "Ocultar la respuesta del comando",
			}
		}
	],
	default_member_permissions: "0"
} as const;
