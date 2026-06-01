import { ApplicationCommandOptionType, Locale } from "discord-api-types/v10";
export const KickCommand = {
	name: "kick",
	description: "Kick a user.",
	description_localizations: {
		fr: "Kick un utilisateur",
    ja: "ユーザーをキックする",
    [Locale.SpanishLATAM]: "Expulsar a un usuario"
	},
	options: [
		{
			type: ApplicationCommandOptionType.User,
			name: "target",
			name_localizations: {
				fr: "target",
        ja: "ターゲット",
				[Locale.SpanishLATAM]: "usuario"
			},
			description: "Select a user to kick",
			description_localizations: {
				fr: "Sélectionner l'utilisateur à kick",
				ja: "キックするユーザーを選択する",
				[Locale.SpanishLATAM]: "El usuario al que quieres expulsar"
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
			description: "Reason of the kick",
			description_localizations: {
				fr: "Raison du kick",
        ja: "キックの理由",
				[Locale.SpanishLATAM]: "Razón de la expulsión"
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
