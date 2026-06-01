import { ApplicationCommandOptionType, Locale } from "discord-api-types/v10";

export const BlacklistCommand = {
	// pingCommand / banCommand / settingCommand ...
	name: "blacklist",
	name_localizations: {
		fr: "liste-noire",
    ja: "ブラックリスト",
		[Locale.SpanishLATAM]: "lista-negra"
	},
	description: "Add a user to the blacklist.",
	description_localizations: {
		fr: "Ajouter un membre à la liste noire",
		ja: "ユーザーをブラックリストに追加します。",
		[Locale.SpanishLATAM]: "Agrega un usuario a la lista negra."
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
			description: "User to be added",
			description_localizations: {
				fr: "Membre à ajouter",
        ja: "追加するユーザー",
				[Locale.SpanishLATAM]: "Usuario al que quieres dejar en lista-negra"
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
