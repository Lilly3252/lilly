import { ApplicationCommandOptionType, Locale } from "discord-api-types/v10";

export const TagCommand = {
	name: "tag",
	name_localizations: {
		fr: "tag",
    ja: "タグ",
		[Locale.SpanishLATAM]: "etiquetas",
	},
	description: "Get a tag",
	description_localizations: {
		fr: "Obtenez un tag",
    ja: "タグを取得する",
		[Locale.SpanishLATAM]: "Obtén la información de una etiqueta",
	},
	options: [
		{
			type: ApplicationCommandOptionType.String,
			name: "query",
			name_localizations: {
				fr: "tag",
        ja: "タグ",
				[Locale.SpanishLATAM]: "etiqueta",
			},
			description: "Tag",
			description_localizations: {
				fr: "Tag",
				ja: "タグ",
				[Locale.SpanishLATAM]: "La etiqueta a consultar",
			},
			autocomplete: true,
			required: true
		}
	],
	default_member_permissions: "0"
} as const;
