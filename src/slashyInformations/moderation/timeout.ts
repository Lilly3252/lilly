import { ApplicationCommandOptionType, Locale } from "discord-api-types/v10";

export const TimeoutCommand = {
	name: "timeout",
	description: "Timeout a member.",
	description_localizations: {
		fr: "Mute un membre.",
    ja: "メンバーをタイムアウトする。",
		[Locale.SpanishLATAM]: "Silenciar a un miembro"
	},
	options: [
		{
			type: ApplicationCommandOptionType.User,
			name: "target",
			name_localizations: {
				fr: "membre",
        ja: "ターゲット",
				[Locale.SpanishLATAM]: "usuario"
			},
			description: "The member to timeout.",
			description_localizations: {
				fr: "Le membre à mute.",
				ja: "タイムアウトするメンバー。",
				[Locale.SpanishLATAM]: "El usuario a silenciar."
			},
			required: true
		},
		{
			type: ApplicationCommandOptionType.Integer,
			name: "duration",
			name_localizations: {
				fr: "durée",
        ja: "期間",
				[Locale.SpanishLATAM]: "duracion"
			},
			description: "The duration of the timeout in seconds.",
			description_localizations: {
				fr: "La durée du mute en secondes.",
				ja: "タイムアウトの期間（秒単位）。",
				[Locale.SpanishLATAM]: "La duracion del silencio en segundos."
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
			description: "The reason for the timeout.",
			description_localizations: {
				fr: "La raison du mute.",
				ja: "タイムアウトの理由。",
				[Locale.SpanishLATAM]: "La razon del silencio."
			},
			required: false
		},
		{
			type: ApplicationCommandOptionType.Boolean,
			name: "hide",
			name_localizations: {
				fr: "masquer",
				ja: "非表示",
				[Locale.SpanishLATAM]: "ocultar"
			},
			description: "Hides the output.",
			description_localizations: {
				fr: "Masque le résultat.",
				ja: "出力を非表示にする。",
				[Locale.SpanishLATAM]: "Ocultar la respuesta del comando"
			},
			required: false
		}
	],
	default_member_permissions: "0"
} as const;
