import { ApplicationCommandOptionType } from "discord-api-types/v10";

export const UserNoteCommand = {
	name: "usernote",
	description: "Manage user notes",
	description_localizations: {
		fr: "Gérer les notes des utilisateurs"
	},
	options: [
		{
			type: ApplicationCommandOptionType.String,
			name: "action",
			name_localizations: {
				fr: "action"
			},
			description: "The action to perform (add, view, delete)",
			description_localizations: {
				fr: "L'action à effectuer (ajouter, voir, supprimer)"
			},
			required: true,
			choices: [
				{ name: "add", value: "add" },
				{ name: "view", value: "view" },
				{ name: "delete", value: "delete" }
			]
		},
		{
			type: ApplicationCommandOptionType.User,
			name: "target",
			name_localizations: {
				fr: "utilisateur"
			},
			description: "The target to manage notes for",
			description_localizations: {
				fr: "L'utilisateur pour gérer les notes"
			},
			required: true
		},
		{
			type: ApplicationCommandOptionType.String,
			name: "note",
			name_localizations: {
				fr: "note"
			},
			description: "The note to add (required for add action)",
			description_localizations: {
				fr: "La note à ajouter (requis pour l'action ajouter)"
			},
			required: false
		}
	],
	default_member_permissions: "0"
} as const;
