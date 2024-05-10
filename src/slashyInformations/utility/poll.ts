import { ApplicationCommandOptionType } from "discord-api-types/v10";

export const PollCommand = {
	name: "poll",
	description: "do a poll.",
	description_localizations: {
		fr: "cree un poll."
	},
	options: [
		{
			type: ApplicationCommandOptionType.Number,
			name: "duration",
			name_localizations: {
				fr: "duree"
			},
			description: "Duration of the poll (in seconds 1 = 1 hour , MAX = 168 (a week))",
			description_localizations: {
				fr: "duration du poll (en seconde , 1 = 1 heure , MAX = 168 (une semaine))"
			},
			required: true
		},
		{
			type: ApplicationCommandOptionType.String,
			name: "question",
			name_localizations: {
				fr: "question"
			},
			description: "Ask a question",
			description_localizations: {
				fr: "demander une question"
			},
			required: true
		},
		{
			type: ApplicationCommandOptionType.String,
			name: "answer1",
			name_localizations: {
				fr: "reponse1"
			},
			description: "answers 1",
			description_localizations: {
				fr: "reponse1"
			},
			required: true
		},
		{
			type: ApplicationCommandOptionType.String,
			name: "answer2",
			name_localizations: {
				fr: "reponse2"
			},
			description: "answer2",
			description_localizations: {
				fr: "reponse2"
			}
		},
		{
			type: ApplicationCommandOptionType.String,
			name: "answer3",
			name_localizations: {
				fr: "reponse3"
			},
			description: "answer3",
			description_localizations: {
				fr: "reponse3"
			}
		},
		{
			type: ApplicationCommandOptionType.String,
			name: "answer4",
			name_localizations: {
				fr: "reponse4"
			},
			description: "answer4",
			description_localizations: {
				fr: "reponse4"
			}
		},
		{
			type: ApplicationCommandOptionType.String,
			name: "answer5",
			name_localizations: {
				fr: "reponse5"
			},
			description: "answer5",
			description_localizations: {
				fr: "reponse5"
			}
		},
		{
			type: ApplicationCommandOptionType.String,
			name: "answer6",
			name_localizations: {
				fr: "reponse6"
			},
			description: "answer6",
			description_localizations: {
				fr: "reponse6"
			}
		},
		{
			type: ApplicationCommandOptionType.String,
			name: "answer7",
			name_localizations: {
				fr: "reponse7"
			},
			description: "answer7",
			description_localizations: {
				fr: "reponse7"
			}
		},
		{
			type: ApplicationCommandOptionType.String,
			name: "answer8",
			name_localizations: {
				fr: "reponse8"
			},
			description: "answer8",
			description_localizations: {
				fr: "reponse8"
			}
		},
		{
			type: ApplicationCommandOptionType.String,
			name: "answer9",
			name_localizations: {
				fr: "reponse9"
			},
			description: "answer9",
			description_localizations: {
				fr: "reponse9"
			}
		},
		{
			type: ApplicationCommandOptionType.String,
			name: "answer10",
			name_localizations: {
				fr: "reponse10"
			},
			description: "answer10",
			description_localizations: {
				fr: "reponse10"
			}
		}
	],
	default_member_permissions: "0"
} as const;
