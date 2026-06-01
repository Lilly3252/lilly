import { ApplicationCommandOptionType, Locale } from "discord-api-types/v10";

export const LockCommand = {
	name: "lock",
	description: "Lock a channel",
	description_localizations: {
		fr: "verrouille un canaux de discussion",
    ja: "チャンネルをロックする",
		[Locale.SpanishLATAM]: "Cierra un canal"
	},
	options: [
		{
			name: "activate",
			name_localizations: {
				fr: "activation",
        ja: "アクティベーション",
				[Locale.SpanishLATAM]: "activar"
			},
			description: "Lock this channel?",
			description_localizations: {
				fr: "verrouiller ce canaux ?",
				ja: "このチャンネルをロックしますか？",
				[Locale.SpanishLATAM]: "¿Cerrar este canal?"
			},
			type: ApplicationCommandOptionType.Boolean,
			required: true
		},
		{
			name: "hide",
			name_localizations: {
				fr: "masquer",
        ja: "非表示",
				[Locale.SpanishLATAM]: "ocultar"
			},
			description: "Hides the output",
			description_localizations: {
				fr: "Masque(cacher) le résultat",
        ja: "出力を非表示にする",
        [Locale.SpanishLATAM]: "Oculta la respuesta del comando"
			},
			type: ApplicationCommandOptionType.Boolean
		}
	],
	default_member_permissions: "0"
} as const;
