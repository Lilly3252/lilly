import { PermissionFlagsBits } from 'discord.js';

export function botPermissionDenied<P extends keyof typeof PermissionFlagsBits>(
  permission: P
): `❌ Error: i'm missing ${P} permission to use that command.` {
  return `❌ Error: i'm missing ${permission} permission to use that command.`;
}


export async function handler(){
  
}