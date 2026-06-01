import { ApplicationCommandOptionType, Locale } from "discord-api-types/v10";

export const BanCommand = {
	name: "ban",
	description: "Ban a member",
	description_localizations: {
    fr: "Bannissement d'un membre",
		[Locale.SpanishLATAM]: "Banear a un miembro"
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
			description: "Select a user to ban.",
			description_localizations: {
				fr: "Sélectionner l'utilisateur à bannir.",
        ja: "BANするユーザーを選択してください。",
				[Locale.SpanishLATAM]: "Selecciona un usuario para banear."
			},
			required: true
		},

		{
			type: ApplicationCommandOptionType.Number,
			name: "days",
			name_localizations: {
				fr: "jours",
        ja: "日数",
				[Locale.SpanishLATAM]: "días"
			},
			description: "number of days that you want to delete.(messages)",
			description_localizations: {
				fr: "nombre de jours que vous voulez supprimer.(messages)",
        ja: "削除する日数。（メッセージ）",
				[Locale.SpanishLATAM]: "Cuantos días de mensajes deseas eliminar.",
			},
			choices: [
				{
					name: "0 day",
					name_localizations: {
						fr: "0 jour",
						ja: "0日",
						[Locale.SpanishLATAM]: "0 días"
					},
					value: 0
				},
				{
					name: "1 day",
					name_localizations: { fr: "1 jour", ja: "1日", [Locale.SpanishLATAM]: "1 día" },
					value: 86400
				},
				{
					name: "2 days",
					name_localizations: { fr: "2 jours", ja: "2日", [Locale.SpanishLATAM]: "2 días" },
					value: 172800
				},
				{
					name: "3 days",
					name_localizations: { fr: "3 jours", ja: "3日", [Locale.SpanishLATAM]: "3 días" },
					value: 259200
				},
				{
					name: "4 days",
					name_localizations: { fr: "4 jours", ja: "4日", [Locale.SpanishLATAM]: "4 días" },
					value: 345600
				},
				{
					name: "5 days",
					name_localizations: { fr: "5 jours", ja: "5日", [Locale.SpanishLATAM]: "5 días" },
					value: 432000
				},
				{
					name: "6 days",
					name_localizations: { fr: "6 jours", ja: "6日", [Locale.SpanishLATAM]: "6 días" },
					value: 518400
				},
				{
					name: "7 days",
					name_localizations: { fr: "7 jours", ja: "7日", [Locale.SpanishLATAM]: "7 días" },
					value: 604800
				}
			],
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
			description: "Reason of the ban.",
			description_localizations: {
				fr: "Raison du ban.",
				ja: "BANの理由。",
				[Locale.SpanishLATAM]: "Razón del ban."
			},
			required: true
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
				fr: "Masque(cacher) le résultat.",
				ja: "出力を非表示にします。",
				[Locale.SpanishLATAM]: "Oculta la respuesta de este comando."
			}
		}
	],
	default_member_permissions: "0"
} as const;
