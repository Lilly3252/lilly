import { InfoCommand } from "#slashyInformations/index.js";
import { user } from "#utils/types/database.js";

import { ArgsParam } from "@yuudachi/framework/types";
import { Colors, ContainerBuilder, GuildMember, TextDisplayBuilder, TimestampStyles, User, time } from "discord.js";
import i18next from "i18next";

export async function userInfo(
  args: ArgsParam<typeof InfoCommand>["user"],
  target: User | GuildMember,
  user: user,
  language: string | undefined
): Promise<ContainerBuilder> {
  const isGuildMember = target instanceof GuildMember;
  const userBlacklisted = user?.blacklisted;
  const spammer = isGuildMember ? target.user.flags?.has("Spammer") : target.flags?.has("Spammer");

  const containers = new ContainerBuilder().setAccentColor(
    isGuildMember ? target.displayColor : Colors.DarkButNotBlack
  );

  const user_memberHeaders = new TextDisplayBuilder().setContent(
    isGuildMember ? "Member Information" : "User Information"
  );
  containers.addTextDisplayComponents(user_memberHeaders);
  const member_userFooter = new TextDisplayBuilder().setContent(
    `Blacklisted: ${userBlacklisted ? "✅" : "❌"} | Spammer: ${spammer ? "✅" : "❌"}`
  );
  containers.addTextDisplayComponents(member_userFooter);

  if (isGuildMember) {
    const memberName = new TextDisplayBuilder().setContent(
      i18next.t("command.utility.info.member.name", { lng: language })
    );
    containers.addTextDisplayComponents(memberName);

    const memberValue = new TextDisplayBuilder().setContent(
      i18next.t("command.utility.info.member.value", {
        username: target.user.username,
        id: target.id,
        avatar: `[link to Avatar](${target.displayAvatarURL()})`,
        status: target.presence?.status ?? "No information",
        lng: language,
      })
    );
    containers.addTextDisplayComponents(memberValue);

    if (args.verbose) {
      const role = target.roles.highest;
      const memberRole = new TextDisplayBuilder().setContent("Role");
      containers.addTextDisplayComponents(memberRole);

      const memberValue = new TextDisplayBuilder().setContent(
        i18next.t("command.utility.info.role.value", {
          name: `${role}`,
          role_id: role.id,
          color: `${role.hexColor.toUpperCase()}`,
          hoisted: role.hoist,
          mentionable: role.mentionable,
          lng: language,
        })
      );
      containers.addTextDisplayComponents(memberValue);

      const memberOther = new TextDisplayBuilder().setContent("Other");
      containers.addTextDisplayComponents(memberOther);

      const otherValue = new TextDisplayBuilder().setContent(
        i18next.t("command.utility.info.member.other", {
          created_at: time(target.user.createdAt, TimestampStyles.RelativeTime),
          joined_at: time(target.joinedAt!, TimestampStyles.RelativeTime),
          pending: target.pending,
          is_timed_out: target.communicationDisabledUntil
            ? time(target.communicationDisabledUntil, TimestampStyles.RelativeTime)
            : "false",
          is_bot: target.user.bot,
          lng: language,
        })
      );
      containers.addTextDisplayComponents(otherValue);
      
      if (user.notes && user.notes.length > 0) {
        const memberNoteName = new TextDisplayBuilder().setContent("Notes");
        containers.addTextDisplayComponents(memberNoteName);

        const memberNoteValue = new TextDisplayBuilder().setContent(
          user.notes
            .map((n, index) => `${index + 1}. ${n.note} (by <@${n.moderator}> on ${n.date.toLocaleDateString()})`)
            .join("\n")
        );
        containers.addTextDisplayComponents(memberNoteValue);
      }
      if (user.pet) {
        const memberPet = new TextDisplayBuilder().setContent("Pet");
        containers.addTextDisplayComponents(memberPet);

        const memberPetValue = new TextDisplayBuilder().setContent(
          `Name: ${user.pet.petName}\nType: ${user.pet.petType}`
        );
        containers.addTextDisplayComponents(memberPetValue);
      }
    }
  } else {
    const userInfoName = new TextDisplayBuilder().setContent(
      i18next.t("command.utility.info.user.name", { lng: language })
    );
    containers.addTextDisplayComponents(userInfoName);

    const userInfoValue = new TextDisplayBuilder().setContent(
      i18next.t("command.utility.info.user.value", {
        username: target.username,
        id: target.id,
        avatar: `[link to Avatar](${target.displayAvatarURL()})`,
        time_create: time(target.createdAt, TimestampStyles.RelativeTime),
        lng: language,
      })
    );
    containers.addTextDisplayComponents(userInfoValue);
  }
  return containers;
}
