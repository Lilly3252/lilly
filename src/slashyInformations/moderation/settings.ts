import { ApplicationCommandOptionType, Locale } from "discord-api-types/v10";

export const SettingCommand = {
	name: "settings",
	description: "Show or add settings.",
  description_localizations: {
    fr: "Montrer ou ajouter des paramètres de guilde.",
    ja: "設定を表示または追加する。",
    [Locale.SpanishLATAM]: "Ver o agregar configuraciones al servidor"
  },
	options: [
		{
			type: ApplicationCommandOptionType.Subcommand,
			name: "show",
			description: "Show settings from the guild.",
      description_localizations: {
        fr: "Montrer les paramètres de guilde.",
        ja: "ギルドの設定を表示する。",
        [Locale.SpanishLATAM]: "Mostrar configuraciones del servidor"
      },
			options: [
				{
					type: ApplicationCommandOptionType.Boolean,
					name: "hide",
					name_localizations: { fr: "masquer", ja: "非表示", "ocultar" },
					description: "Hides the output",
          description_localizations: {
            fr: "Masque(cacher) le résultat",
            ja: "出力を非表示にする",
            [Locale.SpanishLATAM]: "Ocultar el resultado del comando"
          }
        }
			]
		},
		{
			type: ApplicationCommandOptionType.Subcommand,
			name: "language",
			description: "Modify the default language of the bot.",
      description_localizations: {
        fr: "Modifier le langage par défaut.",
        ja: "ボットのデフォルトの言語を変更する。",
        [Locale.SpanishLATAM]: "Modificar el idioma predeterminado del bot"
      },
			options: [
				{
					type: ApplicationCommandOptionType.String,
					name: "lng",
					name_localizations: { fr: "langue", ja: "言語", [Locale.SpanishLATAM]: "idioma" },
					description: "Default language of the bot",
          description_localizations: {
            fr: "Langue par défaut",
            ja: "ボットのデフォルトの言語",
            [Locale.SpanishLATAM]: "Idioma predeterminado del bot"
          },
					choices: [
						{ name: "English", name_localizations: { fr: "Anglais", ja: "英語" }, value: "en-US" },
						{ name: "French", name_localizations: { fr: "Français", ja: "フランス語" }, value: "fr" },
            { name: "Japanese", name_localizations: { fr: "Japonais", ja: "日本語" }, value: "ja" },
						{ name: "Spanish", name_localizations: { fr: "Español", ja: "スペイン語" }, value: "es-ES" }
					]
				},
				{
					type: ApplicationCommandOptionType.Boolean,
					name: "hide",
					name_localizations: { fr: "masquer", ja: "非表示", [Locale.SpanishLATAM]: "ocultar" },
					description: "Hides the output",
          description_localizations: {
            fr: "Masque(cacher) le résultat",
            ja: "出力を非表示にする",
            [Locale.SpanishLATAM]: "Ocultar el resultado del comando"
          }
				}
			]
		},
		{
			type: ApplicationCommandOptionType.Subcommand,
			name: "audit_log",
			description: "Enable/disable audit logs",
      description_localizations: {
        fr: "Activer/désactiver les logs serveur.",
        ja: "監査ログを有効/無効にする",
        [Locale.SpanishLATAM]: "Habilitar / deshabilitar los registros de auditoría"
      },
			options: [
				{
					type: ApplicationCommandOptionType.Boolean,
					name: "choice",
					name_localizations: { fr: "choix", ja: "選択", [Locale.SpanishLATAM]: "valor" },
					description: "Enable or disable the logs.",
          description_localizations: {
            fr: "Activer ou désactiver les logs.",
            ja: "ログを有効または無効にする。",
            [Locale.SpanishLATAM]: "Habilitar / deshabilitar los registros de auditoría"
          },
					required: true
				},
				{
					type: ApplicationCommandOptionType.Boolean,
					name: "hide",
					name_localizations: { fr: "masquer", ja: "非表示", [Locale.SpanishLATAM]: "ocultar" },
					description: "Hides the output.",
          description_localizations: {
            fr: "Masque(cacher) le résultat。",
            ja: "出力を非表示にする。",
            [Locale.SpanishLATAM]: "Ocultar el resultado del comando"
          }
				}
			]
		},
		{
			type: ApplicationCommandOptionType.Subcommand,
			name: "channels",
			description: "Setup log and welcome channel",
      description_localizations: {
        fr: "Configurer les logs et le channel de bienvenue.",
        ja: "ログとウェルカムチャンネルを設定する。",
        [Locale.SpanishLATAM]: "Configurar los canales de auditoría y bienvenida"
      },
			options: [
				{
					type: ApplicationCommandOptionType.String,
					name: "channels_select",
					name_localizations: { fr: "channels", ja: "チャンネル", [Locale.SpanishLATAM]: "canales" },
					description: "Select your channels.",
          description_localizations: {
            fr: "Sélectionnez vos channels。",
            ja: "チャンネルを選択する。",
            [Locale.SpanishLATAM]: "Seleccione los canales"
          },
					choices: [
						{ name: "Welcome Channel", name_localizations: { fr: "Channel de bienvenue", ja: "ウェルカムチャンネル", [Locale.SpanishLATAM]: "Canal de bienvenida" }, value: "welcomechannel" },
						{ name: "Mod Log", name_localizations: { fr: "Log des modérateurs", ja: "モデレーションログ", [Locale.SpanishLATAM]: "Registros de moderación" }, value: "modlog" }
					],
					required: true
				},
				{
					type: ApplicationCommandOptionType.Boolean,
					name: "hide",
					name_localizations: { fr: "masquer", ja: "非表示", [Locale.SpanishLATAM]: "ocultar" },
					description: "Hides the output.",
					description_localizations: { fr: "Masque(cacher) le résultat。", ja: "出力を非表示にする。", [Locale.SpanishLATAM]: "Ocultar el resultado del comando" }
				}
			]
		},
		{
			type: ApplicationCommandOptionType.Subcommand,
			name: "events",
			description: "Set all your events for logging purposes",
      description_localizations: {
        fr: "Configurer tous vos évènements pour les logs。",
        ja: "ログのためにすべてのイベントを設定する。",
        [Locale.SpanishLATAM]: "Selecciona"
      },
			options: [
				{
					type: ApplicationCommandOptionType.String,
					name: "events",
					name_localizations: { fr: "évènements", ja: "イベント" },
					description: "Select your events.",
          description_localizations: {
            fr: "Sélectionnez vos évènements。",
            ja: "イベントを選択する。",
            [Locale.SpanishLATAM]: "Selecciona tus eventos"
          }
				},
				{
					type: ApplicationCommandOptionType.Boolean,
					name: "hide",
					name_localizations: { fr: "masquer", ja: "非表示", [Locale.SpanishLATAM]: "ocultar" },
					description: "Hides the output.",
          description_localizations: {
            fr: "Masque(cacher) le résultat。",
            ja: "出力を非表示にする。",
            [Locale.SpanishLATAM]: "Ocultar el resultado del comando"
          }
				}
			]
		},
		{
			type: ApplicationCommandOptionType.Subcommand,
			name: "restriction_roles",
			description: "Set all your restriction roles for the guild",
			description_localizations: {
				fr: "Configurer tous vos rôles de restriction pour cette guilde.",
        ja: "ギルドのすべての制限役割を設定する。",
        [Locale.SpanishLATAM]: "Configurar los roles de restricción en este servidor"
			},
			options: [
				{
					type: ApplicationCommandOptionType.Role,
					name: "role_id",
					name_localizations: {
						fr: "role_id",
            ja: "役割id",
            [Locale.SpanishLATAM]: "rol"
					},
					description: "Select the role to assign.",
					description_localizations: {
						fr: "Sélectionnez le rôle à attribuer.",
            ja: "割り当てる役割を選択する。",
            [Locale.SpanishLATAM]: "Selecciona el rol a asignar"
					},
					required: true
				},
				{
					type: ApplicationCommandOptionType.String,
					name: "role",
					name_localizations: {
						fr: "rôle",
            ja: "役割",
            [Locale.SpanishLATAM]: "rol"
					},
					description: "Select your restriction role type.",
					description_localizations: {
						fr: "Sélectionnez le type de rôle de restriction.",
            ja: "制限役割の種類を選択する。",
            [Locale.SpanishLATAM]: "Selecciona el tipo de rol de restricción"
					},
					choices: [
						{
							name: "Embed",
							name_localizations: {
								fr: "Incorporer",
								ja: "埋め込み",
								[Locale.SpanishLATAM]: "Embed"
							},
							value: "embed"
						},
						{
							name: "Reaction",
							name_localizations: {
								fr: "Réaction",
								ja: "リアクション",
								[Locale.SpanishLATAM]: "Reacción"
							},
							value: "reaction"
						},
						{
							name: "Voice",
							name_localizations: {
								fr: "Voix",
                ja: "ボイス",
								[Locale.SpanishLATAM]: "Voz"
							},
							value: "voice"
						},
						{
							name: "Slash",
							name_localizations: {
								fr: "Barre oblique",
								ja: "スラッシュ",
								[Locale.SpanishLATAM]: "Comandos Slash"
							},
							value: "slash"
						},
						{
							name: "Poll",
							name_localizations: {
								fr: "Sondage",
								ja: "投票",
								[Locale.SpanishLATAM]: "Encuestas"
							},
							value: "poll"
						},
						{
							name: "Safe",
							name_localizations: {
								fr: "Sûr",
								ja: "安全",
								[Locale.SpanishLATAM]: "Seguro"
							},
							value: "safe"
						}
					]
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
            ja: "出力を非表示にする",
						[Locale.SpanishLATAM]: "Ocultar el resultado del comando"
					}
				},
      ]
    },
	],
	default_member_permissions: "0"
} as const;
