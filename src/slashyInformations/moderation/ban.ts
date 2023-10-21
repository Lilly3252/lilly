import { ApplicationCommandOptionType } from 'discord-api-types/v10';

export const BanCommand = {
  name: "ban",
  description: "Ban a member",
  description_localizations: {
    fr: "Bannissement d'un membre",
  },
  options: [
    {
      name: "target",
      name_localizations: {
        fr: "target",
      },
      description: "Select a user to ban",
      description_localizations: {
        fr: "Sélectionner l'utilisateur a bannir",
      },
      type: ApplicationCommandOptionType.User,
    },

    {
      name: "reason",
      name_localizations: {
        fr: "raison",
      },
      description: "Reason of the ban",
      description_localizations: {
        fr: "Raison du ban",
      },
      type: ApplicationCommandOptionType.String,
    },
    {
      name: "hide",
      name_localizations: {
        fr: "masquer",
      },
      description: "Hides the output",
      description_localizations: {
        fr: "Masque(cacher) le résultat",
      },
      type: ApplicationCommandOptionType.Boolean,
    },
  ],
  default_member_permissions: "0",
} as const;
