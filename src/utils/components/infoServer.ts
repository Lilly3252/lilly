import { InfoCommand } from "#slashyInformations/index.js";
import { trimRole } from "#utils/index.js";
import { ArgsParam, InteractionParam } from "@yuudachi/framework/types";
import {
  Channel,
  ChannelType,
  Collection,
  ContainerBuilder,
  GuildEmoji,
  GuildExplicitContentFilter,
  GuildMember,
  GuildVerificationLevel,
  RoleMention,
  TextDisplayBuilder,
  TimestampStyles,
  time,
} from "discord.js";
import i18next from "i18next";

export async function serverInfo(
  args: ArgsParam<typeof InfoCommand>,
  interaction: InteractionParam,
  roles: RoleMention[],
  owner: GuildMember,
  members: Collection<string, GuildMember>,
  emojis: Collection<string, GuildEmoji>,
  channels: Collection<string, Channel>,
  language: string | undefined
): Promise<ContainerBuilder> {
  const containers = new ContainerBuilder();

  const generalHeaders = new TextDisplayBuilder().setContent("Server Information");
  containers.addTextDisplayComponents(generalHeaders);

  const generalInfo = new TextDisplayBuilder().setContent(
    i18next.t("command.utility.info.server.info", {
      name: interaction.guild.name,
      id: interaction.guild.id,
      owner: `${owner.user.tag} (${owner.id})`,
      booster_tier: interaction.guild.premiumTier ? `Tier ${interaction.guild.premiumTier}` : "None",
      explicit_filter: GuildExplicitContentFilter[interaction.guild.explicitContentFilter].replace(
        /([a-z])([A-Z])/g,
        "$1 $2"
      ),
      verification_level: GuildVerificationLevel[interaction.guild.verificationLevel],
      created_at: time(interaction.guild.createdAt, TimestampStyles.RelativeTime),
      lng: language,
    })
  );
  containers.addTextDisplayComponents(generalInfo)
  if (args.server.verbose) {
    const StatHeaders = new TextDisplayBuilder().setContent("Statistic");
    containers.addTextDisplayComponents(StatHeaders);

    const statInfo = new TextDisplayBuilder().setContent(
      i18next.t("command.utility.info.server.stats", {
        role_count: roles.length,
        emoji_count: emojis.size,
        regular_emoji: emojis.filter((emoji) => !emoji.animated).size,
        animated_emoji: emojis.filter((emoji) => emoji.animated).size,
        member_count: interaction.guild.memberCount,
        humans: members.filter((member) => !member.user.bot).size,
        bots: members.filter((member) => member.user.bot).size,
        txt_chan: channels.filter((channel) => channel.type === ChannelType.GuildText).size,
        voice_chan: channels.filter((channel) => channel.type === ChannelType.GuildVoice).size,
        stage_chan: channels.filter((channel) => channel.type === ChannelType.GuildStageVoice).size,
        boost_count: interaction.guild.premiumSubscriptionCount || "0",
        lng: language,
      })
    );
    containers.addTextDisplayComponents(statInfo);

    const presenceHeaders = new TextDisplayBuilder().setContent("Presence");
    containers.addTextDisplayComponents(presenceHeaders);

    const presenceInfo = new TextDisplayBuilder().setContent(
      i18next.t("command.utility.info.server.presence", {
        online: members.filter((member) => member.presence?.status === "online").size,
        idle: members.filter((member) => member.presence?.status === "idle").size,
        dnd: members.filter((member) => member.presence?.status === "dnd").size,
        offline: members.filter((member) => member.presence?.status === "offline").size,
        no_presence: members.filter((member) => !member.presence).size,
        lng: language,
      })
    );
    containers.addTextDisplayComponents(presenceInfo);

    const mappedRoles = interaction.guild.roles.cache
    .filter((role) => role.id !== interaction.guild.id)
    .map((role) => role.toString());


    const roleInfo = new TextDisplayBuilder().setContent(
      trimRole(mappedRoles).join(", ")
    );
    containers.addTextDisplayComponents(roleInfo);

  }
  /*


  const embed: APIEmbed = {
    author: { name: "Bot Information" },
    thumbnail: { url: interaction.guild.iconURL()! },
    fields: [generalInfo],
  };


*/
  return containers;
}
