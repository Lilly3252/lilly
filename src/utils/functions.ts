// #region Imports
import guilds from "#database/models/guilds.js";
import { default as user, default as users } from "#database/models/users.js";
import { InteractionParam } from "@yuudachi/framework/types";
import { randomBytes } from "crypto";
import {
  AuditLogChange,
  ChatInputCommandInteraction,
  Client,
  Events,
  GatewayDispatchEvents,
  GatewayVoiceServerUpdateDispatchData,
  GatewayVoiceStateUpdateDispatchData,
  Guild,
  GuildMember,
  GuildTextBasedChannel,
  Interaction,
  PermissionResolvable,
  Role,
  RoleMention,
  Snowflake,
  Status,
  VoiceBasedChannel,
} from "discord.js";
import i18next from "i18next";
import { guild } from "./types/database.js";
import { EmojifyOptions } from "./types/functiontypes.js";
import {
  AudioPlayer,
  AudioPlayerStatus,
  createAudioResource,
  DiscordGatewayAdapterCreator,
  DiscordGatewayAdapterLibraryMethods,
  entersState,
  joinVoiceChannel,
  StreamType,
  VoiceConnectionStatus,
} from "@discordjs/voice";
// #endregion

// #region Other
export async function permission(
  interaction: InteractionParam,
  permission: PermissionResolvable,
  defaultLanguage: string | undefined
) {
  const language = defaultLanguage;
  const perms = interaction.guild.members.me?.permissions.has(permission);
  if (!perms && interaction.deferred) {
    await interaction.editReply({
      content: i18next.t("command.common.errors.permission_not_found", {
        perm: `${permission}`,
        lng: getLanguage(interaction, language),
      }),
    });
    return perms;
  } else {
    if (!perms && !interaction.deferred)
      await interaction.reply({
        content: i18next.t("command.common.errors.permission_not_found", {
          perm: `${permission}`,
          lng: getLanguage(interaction, language),
        }),
      });
  }
  return perms;
}
export function isEnabled(name: boolean) {
  return name ? "Enabled" : "Disabled";
}

export function emojify({ mode, padStart = true, separator, space = 0 }: EmojifyOptions) {
  const emoji = mode ? "✅" : "❌";

  return padStart ? emoji.padStart(space, separator) : emoji.padEnd(space, separator);
}

export function getRoles(target: GuildMember) {
  return target.roles.cache
    .sort((c, a) => a.position - c.position)
    .map((a) => a.toString())
    .slice(0, -1);
}
/**
 * Trims an array of role mentions to a specified limit and adds a summary if there are more roles.
 * @param roles - The array of role mentions to trim.
 * @param limit - The maximum number of roles to include in the trimmed array. Default is 10.
 * @returns An array of strings representing the trimmed roles and a summary if there are more roles.
 */
export function trimRole(roles: RoleMention[], limit = 10): string[] {
  const trimmedRoles = roles.slice(0, limit).map((role) => role.toString());

  if (roles.length > limit) {
    trimmedRoles.push(`${roles.length - limit} more...`);
  }

  if (trimmedRoles.length === 0) {
    trimmedRoles.push("None.");
  }

  return trimmedRoles;
}
/** * Checks if the audit log change is related to communication being disabled.
 * @param change - The audit log change to check.
 * @returns `true` if the change is related to communication being disabled, otherwise `false`. */
export function isCommunicationDisabledUntil(change: AuditLogChange): boolean {
  return change.key === "communication_disabled_until";
}
/** * Checks if the given value is undefined.
 * @param value - The value to check.
 * @returns `true` if the value is undefined, otherwise `false`. */
export function isUndefined(value: unknown): boolean {
  return value === undefined;
}
/** * Determines the language to use based on the interaction's locale and a default language.
 * If the default language is undefined, it returns "en-US" or the interaction's locale if it is supported.
 * @param interaction - The interaction object containing locale information.
 * @param defaultLanguage - The default language to use if it is defined.
 * @returns The language to use for the interaction. */
export function getLanguage(interaction: Interaction, defaultLanguage: string | undefined) {
  if (isUndefined(defaultLanguage)) {
    const supportedLanguages = ["en-US", "fr", "ja"];
    return supportedLanguages.includes(interaction.locale) ? interaction.locale : "en-US";
  } else {
    return "en-US";
  }
}
//#endregion

// #region Database functions
export async function createSettings(param: Guild | ChatInputCommandInteraction<"cached">) {
  const paramCondition = param instanceof ChatInputCommandInteraction;

  await guilds.create({
    guildID: paramCondition ? param.guild.id : param.id,
    name: paramCondition ? param.guild.name : param.name,
    auditLogEvent: false,
    logChannelID: null,
    welcomeChannelID: null,
    guildSettings: [
      {
        antiRaid: false,
        botUpdate: false,
        roleUpdate: false,
        guildUpdate: false,
        emojiUpdate: false,
        inviteUpdate: false,
        threadUpdate: false,
        memberUpdate: false,
        messageUpdate: false,
        channelUpdate: false,
        stickerUpdate: false,
        webhookUpdate: false,
        autoModeration: false,
        integrationUpdate: false,
        commandPermission: false,
        stageInstanceUpdate: false,
        guildScheduledUpdate: false,
      },
    ],
  });
  return createSettings;
}
export async function addUserBlacklist(member: GuildMember) {
  await users.create({
    guildID: member.guild.id,
    userID: member.id,
    blacklisted: true,
  });
  return addUserBlacklist;
}
/** * Checks if the member is blacklistable based on their roles and the guild's safe roles.
 * @param member - The guild member to check.
 * @param guild_db - The guild's database settings.
 * @returns `true` if the member is blacklistable, otherwise `false`. */
export function blacklistable(member: GuildMember, guild_db: guild) {
  const settings = guild_db.safeRoles;
  if (member.roles.highest.position > member.guild.members.me!.roles.highest.position) {
    return false;
  }
  if (member.roles.cache.find((role: Role) => role.id === settings.toString())) {
    return false;
  }
}
/** * Checks if the user's pet has leveled up and updates its level and experience.
 *  @param userToCheck - The user whose pet's level is being checked.
 *  @param interaction - The interaction object to follow up the response. */
export async function checkLevelUp(
  userToCheck: InstanceType<typeof user>,
  interaction: InteractionParam
): Promise<void> {
  const xpToNextLevel = userToCheck.pet!.level * 100;
  if (userToCheck.pet!.experience >= xpToNextLevel) {
    userToCheck.pet!.level += 1;
    userToCheck.pet!.experience = 0;
    await userToCheck.save();
    await interaction.followUp(`Congratulations! Your pet has leveled up to level ${userToCheck.pet!.level}!`);
  }
}
//#endregion

// #region Maths
/**
 * Converts a number of bytes into a human-readable string with appropriate units.
 * @param bytes - The number of bytes to format.
 * @returns A string representing the formatted bytes.
 */
export function formatBytes(bytes: number): string {
  if (bytes === 0) return "0 Bytes";

  const units = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
  const exponent = Math.floor(Math.log(bytes) / Math.log(1024));
  const value = (bytes / Math.pow(1024, exponent)).toFixed(2);

  return `${value} ${units[exponent]}`;
}
// #endregion

// #region Settings 
/** * Updates the channel setting in the guild settings.
 * @param interaction - The interaction object for editing the reply.
 * @param guildSettings - The settings of the guild.
 * @param chan - The channel to update.
 * @param settingKey - The key of the setting to update.
 * @param channelId - The ID of the channel.
 * @param successMessage - The success message to display.
 * @param removeMessage - The removal message to display. *
 * @param locale - The locale for translation. */
export async function updateChannelSetting(
  interaction: ChatInputCommandInteraction<"cached">,
  guildSettings: guild,
  chan: GuildTextBasedChannel | null,
  settingKey: string,
  channelId: string | null,
  successMessage: string,
  removeMessage: string,
  defaultLanguage: string | undefined
) {
  const language = defaultLanguage;
  if (channelId) {
    await guildSettings.updateOne({ [settingKey]: channelId });
    interaction.editReply({
      content: i18next.t(successMessage, {
        channel: settingKey,
        channel_id: chan,
        lng: getLanguage(interaction, language),
      }),
    });
  } else {
    await guildSettings.updateOne({ [settingKey]: null });
    interaction.editReply({
      content: i18next.t(removeMessage, { lng: getLanguage(interaction, language) }),
    });
  }
}

/** * Updates the event setting in the guild settings.
 *  @param interaction - The interaction object for editing the reply.
 *  @param guildSettings - The settings of the guild.
 *  @param eventKey - The key of the event to update.
 *  @param enabled - Whether the event is enabled or disabled.
 *  @param locale - The locale for translation. */
export async function updateEventSetting(
  interaction: ChatInputCommandInteraction<"cached">,
  guildSettings: guild,
  eventKey: string,
  enabled: boolean,
  defaultLanguage: string | undefined
) {
  const language = defaultLanguage;
  await guildSettings.updateOne({ [eventKey]: enabled });
  interaction.editReply({
    content: i18next.t(enabled ? "command.config.events.enabled" : "command.config.events.disabled", {
      event: eventKey,
      lng: getLanguage(interaction, language),
    }),
  });
}

/** * Updates the role setting in the guild settings.
 * @param interaction - The interaction object for editing the reply.
 * @param guildSettings - The settings of the guild.
 * @param role - The role to update.
 * @param settingKey - The key of the setting to update.
 * @param roleId - The ID of the role.
 * @param successMessage - The success message to display.
 * @param removeMessage - The removal message to display.
 * @param locale - The locale for translation. */
export async function updateRoleSetting(
  interaction: ChatInputCommandInteraction<"cached">,
  guildSettings: guild,
  role: Role | null,
  settingKey: string,
  roleId: string | null,
  successMessage: string,
  removeMessage: string,
  defaultLanguage: string | undefined
) {
  const language = defaultLanguage;
  await guildSettings.updateOne({ [settingKey]: roleId });
  interaction.editReply({
    content: i18next.t(roleId ? successMessage : removeMessage, {
      role: settingKey,
      role_id: role,
      lng: getLanguage(interaction, language),
    }),
  });
}
/** * Updates the safe roles in the guild settings.
 * @param interaction - The interaction object for editing the reply.
 * @param guildSettings - The settings of the guild.
 * @param roleId - The ID of the role to add or remove.
 * @param add - Whether to add or remove the role.
 * @param locale - The locale for translation. */
export async function updateSafeRoles(
  interaction: ChatInputCommandInteraction<"cached">,
  guildSettings: guild,
  roleId: string,
  add: boolean,
  defaultLanguage: string | undefined
) {
  const language = defaultLanguage;
  if (add) {
    await guildSettings.updateOne({ $addToSet: { safeRoles: roleId } });
  } else {
    await guildSettings.updateOne({ $pull: { safeRoles: roleId } });
  }
  interaction.editReply({
    content: i18next.t(add ? "command.config.events.enabled" : "command.config.events.disabled", {
      event: "Safe Role",
      lng: getLanguage(interaction, language),
    }),
  });
}

// #endregion

// #region Voice
export async function playSong(player: AudioPlayer, songUrl: string) {
  /**
   * Here we are creating an audio resource using a sample song freely available online
   * (see https://www.soundhelix.com/audio-examples)
   *
   * We specify an arbitrary inputType. This means that we aren't too sure what the format of
   * the input is, and that we'd like to have this converted into a format we can use. If we
   * were using an Ogg or WebM source, then we could change this value. However, for now we
   * will leave this as arbitrary.
   */
  const resource = createAudioResource(songUrl, { inputType: StreamType.Arbitrary });

  /**
   * We will now play this to the audio player. By default, the audio player will not play until
   * at least one voice connection is subscribed to it, so it is fine to attach our resource to the
   * audio player this early.
   */
  player.play(resource);

  /**
   * Here we are using a helper function. It will resolve if the player enters the Playing
   * state within 5 seconds, otherwise it will reject with an error.
   */
  return entersState(player, AudioPlayerStatus.Playing, 5_000);
}
export async function connectToChannel(channel: VoiceBasedChannel) {
  /**
   * Here, we try to establish a connection to a voice channel. If we're already connected
   * to this voice channel, \@discordjs/voice will just return the existing connection for us!
   */
  const connection = joinVoiceChannel({
    channelId: channel.id,
    guildId: channel.guildId,
    selfDeaf: false,
    adapterCreator: createDiscordJSAdapter(channel),
  });
  console.log(connection);
  /**
   * If we're dealing with a connection that isn't yet Ready, we can set a reasonable
   * time limit before giving up. In this example, we give the voice connection 30 seconds
   * to enter the ready state before giving up.
   */
  try {
    /**
     * Allow ourselves 30 seconds to join the voice channel. If we do not join within then,
     * an error is thrown.
     */
    await entersState(connection, VoiceConnectionStatus.Ready, 30_000);
    /**
     * At this point, the voice connection is ready within 30 seconds! This means we can
     * start playing audio in the voice channel. We return the connection so it can be
     * used by the caller.
     */
    return connection;
  } catch (error) {
    /**
     * At this point, the voice connection has not entered the Ready state. We should make
     * sure to destroy it, and propagate the error by throwing it, so that the calling function
     * is aware that we failed to connect to the channel.
     */
    connection.destroy();

    throw error;
  }
}

const adapters = new Map<Snowflake, DiscordGatewayAdapterLibraryMethods>();
const trackedClients = new Set<Client>();
const trackedShards = new Map<number, Set<Snowflake>>();

/**
 * Tracks a Discord.js client, listening to VOICE_SERVER_UPDATE and VOICE_STATE_UPDATE events
 *
 * @param client - The Discord.js Client to track
 */
function trackClient(client: Client) {
  if (trackedClients.has(client)) return;

  trackedClients.add(client);

  client.ws.on(GatewayDispatchEvents.VoiceServerUpdate, (payload: GatewayVoiceServerUpdateDispatchData) => {
    adapters.get(payload.guild_id)?.onVoiceServerUpdate(payload);
  });

  client.ws.on(GatewayDispatchEvents.VoiceStateUpdate, (payload: GatewayVoiceStateUpdateDispatchData) => {
    if (payload.guild_id && payload.session_id && payload.user_id === client.user?.id) {
      adapters.get(payload.guild_id)?.onVoiceStateUpdate(payload);
    }
  });

  client.on(Events.ShardDisconnect, (_, shardId) => {
    const guilds = trackedShards.get(shardId);

    if (guilds) {
      for (const guildId of guilds.values()) {
        adapters.get(guildId)?.destroy();
      }
    }

    trackedShards.delete(shardId);
  });
}

function trackGuild(guild: Guild) {
  let guilds = trackedShards.get(guild.shardId);

  if (!guilds) {
    guilds = new Set();

    trackedShards.set(guild.shardId, guilds);
  }

  guilds.add(guild.id);
}

/**
 * Creates an adapter for a Voice Channel.
 *
 * @param channel - The channel to create the adapter for
 */
export function createDiscordJSAdapter(channel: VoiceBasedChannel): DiscordGatewayAdapterCreator {
  return (methods) => {
    adapters.set(channel.guild.id, methods);

    trackClient(channel.client);
    trackGuild(channel.guild);

    return {
      sendPayload(data) {
        if (channel.guild.shard.status !== Status.Ready) return false;

        channel.guild.shard.send(data);

        return true;
      },
      destroy() {
        adapters.delete(channel.guild.id);
      },
    };
  };
}
//#endregion