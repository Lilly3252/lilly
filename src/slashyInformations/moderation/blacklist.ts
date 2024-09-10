import { ApplicationCommandOptionType } from "discord-api-types/v10";

export const BlacklistCommand = {
	// pingCommand / banCommand / settingCommand ...
	name: "blacklist",
	name_localizations: {
		fr: "liste-noire"
	},
	description: "Add a user to the blacklist.",
	description_localizations: {
		fr: "Ajouter un membre a la liste noire"
	},
	options: [
		{
			type: ApplicationCommandOptionType.User,
			name: "target",
			name_localizations: {
				fr: "target"
			},
			description: "User to be added",
			description_localizations: {
				fr: "Membre a ajouter"
			},
			required: true
		},
		{
			type: ApplicationCommandOptionType.Boolean,
			name: "hide",
			name_localizations: {
				fr: "masquer"
			},
			description: "Hides the output.",
			description_localizations: {
				fr: "Masque(cacher) le résultat."
			}
		}
	],
	default_member_permissions: "0"
} as const;
