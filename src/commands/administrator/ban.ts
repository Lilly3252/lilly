import { botPermissionDenied, errors, successful } from '#constants/constants.js';
import type { SlashCommand } from '#type/index.js';
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { ChatInputCommandInteraction, PermissionsBitField, SlashCommandBuilder } from 'discord.js';

export const slashy: SlashCommand['slashy'] = new SlashCommandBuilder()
	.setName('ban')
	.setDescription('Ban a member.')
	.addUserOption((option) => option.setName('target').setDescription('Select a user').setRequired(true))
	.addStringOption((option) => option.setName('reason').setDescription('reason to ban').setRequired(true))
	.setDefaultMemberPermissions(PermissionsBitField.Flags.BanMembers);

export const run: SlashCommand['run'] = async (interaction: ChatInputCommandInteraction<'cached'>): Promise<any> => {
	if (!interaction.guild.members.me?.permissions.has(PermissionsBitField.Flags.BanMembers)) {
		return interaction.reply({
			content: botPermissionDenied('BanMembers'),
			ephemeral: true,
		});
	}
	//  const c = await prisma.guild.findFirst({ where: { guildID: interaction.guild.id } });
	const member = interaction.options.getMember('target')!;
	const reason = interaction.options.getString('reason');
	if (!member?.moderatable || !member?.manageable) {
		await interaction.reply({
			content: errors.moderationDenied,
			ephemeral: true,
		});
	}
	member
		?.send(`Hello, you have been banned from ${interaction.guild.name} for: ${reason}`)
		.then(() => interaction.guild.members.ban(member!))
		.catch((a) => console.log(a)),
		interaction.reply({
			content: successful.ban(member.user.username),
			ephemeral: true,
		});
	/*  const g = c?.logChannelID;
    if (!g || g === null) { return }
    const LogChannel = interaction.client.channels.cache.get(g);
    if (!LogChannel || LogChannel === null) { return }
    if (LogChannel?.isTextBased()) {
        LogChannel?.send({ embeds: [Embed.adminEmbed(interaction, member!, reason!)] });
    }
*/
};
