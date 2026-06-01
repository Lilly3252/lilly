import { ApplicationCommandOptionType, Locale } from "discord-api-types/v10";

export const JoinCommand = {
    name: "join",
    description: "Join the channel for listening music.",
    description_localizations: {
      fr: "Rejoin le channel vocal pour ecouter la radio.",
      [Locale.SpanishLATAM]: "Entrar al canal de voz para escuchar música"
    },
    options: [
        {
            type: ApplicationCommandOptionType.Boolean,
            name: "hide",
            name_localizations: {
              fr: "masquer",
              [Locale.SpanishLATAM]: "ocultar",
            },
            description: "Hides the output",
            description_localizations: {
              fr: "Masque(cacher) le résultat",
              [Locale.SpanishLATAM]: "Ocultar la respuesta del comando",
            }
        }
    ],
    default_member_permissions: "0"
} as const;
