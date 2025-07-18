import { ApplicationCommandOptionType } from "discord-api-types/v10";

export const JoinCommand = {
    name: "join",
    description: "Join the channel for listening music.",
    description_localizations: {
        fr: "Rejoin le channel vocal pour ecouter la radio."
    },
    options: [
        {
            type: ApplicationCommandOptionType.Boolean,
            name: "hide",
            name_localizations: {
                fr: "masquer"
            },
            description: "Hides the output",
            description_localizations: {
                fr: "Masque(cacher) le résultat"
            }
        }
    ],
    default_member_permissions: "0"
} as const;
