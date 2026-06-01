import { ApplicationCommandOptionType, Locale } from "discord-api-types/v10";
import { ApplicationIntegrationType } from "discord.js";
export const RestrictCommand = {
	name: "restrict",
	description: "Restrict a member",
	integration_types: [ApplicationIntegrationType.UserInstall],
	description_localizations: {
		fr: "Restreindre un membre.",
    ja: "メンバーを制限する",
    [Locale.SpanishLATAM]: "Aplica restricciones a un miembro"
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
			description: "Select a user to restrict",
			description_localizations: {
				fr: "Sélectionner l'utilisateur à restreindre",
        ja: "制限するユーザーを選択する",
				[Locale.SpanishLATAM]: "Selecciona al usuario para aplicar las restricciones"
			},
			required: true
		},
		{
			type: ApplicationCommandOptionType.String,
			name: "restriction",
			name_localizations: {
				fr: "restriction",
        ja: "制限",
				[Locale.SpanishLATAM]: "restricciones"
			},
			description: "Select a restriction",
			description_localizations: {
				fr: "Sélectionner une restriction",
        ja: "制限を選択する",
				[Locale.SpanishLATAM]: "Selecciona una restricción"
			},
			choices: [
				{
					name: "Embed",
					name_localizations: { fr: "Messages incorporés", ja: "埋め込みメッセージ", [Locale.SpanishLATAM]: "Suprimir Embeds" },
					value: "embed"
				},
				{
					name: "Reaction",
					name_localizations: { fr: "Réaction", ja: "リアクション", [Locale.SpanishLATAM]: "Reaccionar" },
					value: "reaction"
				},
				{
					name: "Voice",
					name_localizations: { fr: "Connexions vocales", ja: "ボイス接続", [Locale.SpanishLATAM]: "Conectar a Canales de Voz" },
					value: "voice"
				},
				{
					name: "Slash",
					name_localizations: { fr: "Commandes slash", ja: "スラッシュコマンド", [Locale.SpanishLATAM]: "Comandos de Slash" },
					value: "slash"
				},
				{
					name: "Poll",
					name_localizations: { fr: "Messages de sondage", ja: "投票メッセージ", [Locale.SpanishLATAM]: "Encuestas" },
					value: "poll"
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
			description: "Reason of the restriction",
			description_localizations: {
				fr: "Raison de la restriction.",
        ja: "制限の理由",
				[Locale.SpanishLATAM]: "Razón de la restricción"
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
