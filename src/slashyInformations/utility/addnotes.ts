import { ApplicationCommandOptionType, Locale } from "discord-api-types/v10";

export const UserNoteCommand = {
  name: "usernote",
  description: "Manage user notes",
  description_localizations: {
    fr: "Gérer les notes des utilisateurs",
    ja: "ユーザーノートを管理する",
    [Locale.SpanishLATAM]: "Notas de usuarios",
  },
  options: [
    {
      type: ApplicationCommandOptionType.String,
      name: "action",
      name_localizations: {
        fr: "action",
        ja: "アクション",
        [Locale.SpanishLATAM]: "accion",
      },
      description: "The action to perform (add, view, delete)",
      description_localizations: {
        fr: "L'action à effectuer (ajouter, voir, supprimer)",
        ja: "実行するアクション（追加、表示、削除）",
        [Locale.SpanishLATAM]: "La acción a realizar (crear, ver, eliminar)",
      },
      required: true,
      choices: [
        { name: "add", name_localizations: { fr: "ajouter", ja: "追加", [Locale.SpanishLATAM]: "crear" }, value: "add" },
        { name: "view", name_localizations: { fr: "voir", ja: "表示", [Locale.SpanishLATAM]: "ver" }, value: "view" },
        { name: "delete", name_localizations: { fr: "supprimer", ja: "削除", [Locale.SpanishLATAM]: "eliminar" }, value: "delete" },
      ],
    },
    {
      type: ApplicationCommandOptionType.User,
      name: "target",
      name_localizations: {
        fr: "utilisateur",
        ja: "ターゲット",
        [Locale.SpanishLATAM]: "usuario",
      },
      description: "The target to manage notes for",
      description_localizations: {
        fr: "L'utilisateur pour gérer les notes",
        ja: "ノートを管理する対象",
        [Locale.SpanishLATAM]: "El usuario al que se le gestionarán las notas",
      },
      required: true,
    },
    {
      type: ApplicationCommandOptionType.String,
      name: "note",
      name_localizations: {
        fr: "note",
        ja: "ノート",
        [Locale.SpanishLATAM]: "nota",
      },
      description: "The note to add (required for add action)",
      description_localizations: {
        fr: "La note à ajouter (requis pour l'action ajouter)",
        ja: "追加するノート（追加アクションの場合に必要）",
        [Locale.SpanishLATAM]: "La nota a agregar (requerida para la creación)",
      },
      required: false,
    },
  ],
  default_member_permissions: "0",
} as const;
