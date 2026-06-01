import { ApplicationCommandOptionType, Locale } from "discord-api-types/v10";

export const UnbanCommand = {
	name: "unban",
	description: "Unban a user.",
	description_localizations: {
		fr: "Révoquer un ban.",
    ja: "ユーザーのバンを解除する。",
		[Locale.SpanishLATAM]: "Desbanear a un usuario"
	},
	options: [
		{
			type: ApplicationCommandOptionType.String,
			name: "id",
			name_localizations: {
				fr: "id",
				ja: "id",
				[Locale.SpanishLATAM]: "id"
			},
			description: "Put an ID",
			description_localizations: {
				fr: "Inscrire un ID",
				ja: "IDを入力する",
				[Locale.SpanishLATAM]: "Ingresa una ID"
			},
			required: true
		},
		{
			type: ApplicationCommandOptionType.String,
			name: "reason",
			name_localizations: {
				fr: "raison",
				ja: "理由",
				[Locale.SpanishLATAM]: "razon"
			},
			description: "Reason for revoking the ban",
			description_localizations: {
				fr: "Raison pour révoquer le ban",
				ja: "バン解除の理由",
				[Locale.SpanishLATAM]: "Razón para quitar el ban"
			}
		},
		{
			type: ApplicationCommandOptionType.Boolean,
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
				[Locale.SpanishLATAM]: "Ocultar la respuesta del comando"
			}
		}
	],
	default_member_permissions: "0"
} as const;
