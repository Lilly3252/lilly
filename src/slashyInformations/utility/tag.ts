import { ApplicationCommandOptionType } from "discord-api-types/v10";

export const TagCommand = {
	name: "tag",
	name_localizations: {
		fr: "tag"
	},
	description: "get a tag",
	description_localizations: {
		fr: "obtenez un tag"
	},
	options: [
		{
			type: ApplicationCommandOptionType.String,
			name: "query",
			name_localizations: {
				fr: "tag"
			},
			description: "tag",
			description_localizations: {
				fr: "tag"
			},
			autocomplete: true,
			required: true
		}
	],
	default_member_permissions: "0"
} as const;
