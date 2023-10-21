import { Client, Guild, GuildMember, PermissionFlagsBits } from 'discord.js';
import { container } from 'tsyringe';

export function botPermissionDenied<P extends keyof typeof PermissionFlagsBits>(
  permission: P
): `❌ Error: i'm missing ${P} permission to use that command.` {
  return `❌ Error: i'm missing ${permission} permission to use that command.`;
}

export function checkBotPermission<P extends keyof typeof PermissionFlagsBits>(
  guildID: Guild,
  permission: P
) {
  const client = container.resolve<Client<true>>(Client);
  const guild = guildID;

  return guild.members.me.permissions.has(permission);
}

export function checkMemberPermission<P extends keyof typeof PermissionFlagsBits>(
  memberID: GuildMember,
  permission: P
) {
  const client = container.resolve<Client<true>>(Client);
  const member = memberID

  return member.permissions.has(permission)
}

