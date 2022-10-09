/* eslint-disable @typescript-eslint/no-non-null-assertion */
import type { ChatInputCommandInteraction } from 'discord.js';
import type { SlashCommand } from '../../structures/index.js';
import { PermissionsBitField, SlashCommandBuilder } from 'discord.js';
import SYSTEM from '../../structures/messageSystem.json' assert { type: 'json' };
//import { prisma } from "../../index.js";
//import * as Embed from "../../structures/messageEmbeds.js";

export const slashy: SlashCommand['slashy'] = new SlashCommandBuilder()
	.setName('ban')
	.setDescription('Ban a member.')
	.addUserOption((option) => option.setName('target').setDescription('Select a user').setRequired(true))
	.addStringOption((option) => option.setName('reason').setDescription('reason to ban').setRequired(true))
	.setDefaultMemberPermissions(PermissionsBitField.Flags.BanMembers);

export const run: SlashCommand['run'] = async (interaction: ChatInputCommandInteraction<'cached'>): Promise<void> => {
	if (!interaction.guild.members.me?.permissions.has(PermissionsBitField.Flags.BanMembers)) {
		return void interaction.reply({
			content: SYSTEM.ERROR.PERMISSIONS.BOT_PERM['BAN_MEMBERS'],
			ephemeral: true,
		});
	}
	//  const c = await prisma.guild.findFirst({ where: { guildID: interaction.guild.id } });
	const member = interaction.options.getMember('target');
	const reason = interaction.options.getString('reason');
	if (!member?.moderatable || !member?.manageable) {
		await interaction.reply({
			content: SYSTEM.ERROR.ADMIN.MODERATION_DENIED,
			ephemeral: true,
		});
	}
	member
		?.send(`Hello, you have been banned from ${interaction.guild.name} for: ${reason}`)
		.then(() => interaction.guild.members.ban(member!))
		.catch((a) => console.log(a)),
		interaction.reply({
			content: `**${member?.user.tag}** has been banned`,
			ephemeral: true,
		});
	/*  const g = c?.logChannelID;
    if (!g || g === null) { return }
    const LogChannel = interaction.client.channels.cache.get(g);
    if (!LogChannel || LogChannel === null) { return }
    if (LogChannel?.isTextBased()) {
        LogChannel?.send({ embeds: [Embed.AdminEmbed(interaction, member!, reason!)] });
    }
*/
};
