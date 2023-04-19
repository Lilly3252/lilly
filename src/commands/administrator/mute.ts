import { botPermissionDenied, errors, successful } from '#constants/constants.js';
import type { SlashCommand } from '#type/index.js';
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { ChatInputCommandInteraction, PermissionsBitField, SlashCommandBuilder } from 'discord.js';

export const slashy: SlashCommand['slashy'] = new SlashCommandBuilder()
	.setName('mute')
	.setDescription('mute a member.')
	.addUserOption((option) => option.setName('target').setDescription('Select a user').setRequired(true))
	.addStringOption((option) => option.setName('reason').setDescription('reason to mute').setRequired(true))
	.setDefaultMemberPermissions(PermissionsBitField.Flags.MuteMembers);

export const run: SlashCommand['run'] = async (interaction: ChatInputCommandInteraction<'cached'>): Promise<any> => {
	if (!interaction.guild.members.me?.permissions.has(PermissionsBitField.Flags.MuteMembers)) {
		return interaction.reply({
			content: botPermissionDenied('MuteMembers'),
			ephemeral: true,
		});
	}

	const member = interaction.options.getMember('target');
	const reason = interaction.options.getString('reason');
	// const database = await prisma.guild.findFirst({ where: { guildID: interaction.guild.id } });
	if (!member?.moderatable || !member.manageable) {
		await interaction.reply({
			content: errors.moderationDenied,
			ephemeral: true,
		});
	}
	let role = interaction.guild.roles.cache.find((role) => role.name === 'Muted');
	if (!role)
		try {
			(role = await interaction.guild.roles.create({
				name: 'Muted',
				color: '#514f48',
				permissions: [],
			})),
				role.permissions.remove('SendMessages', 'AddReactions', 'SendTTSMessages', 'AttachFiles', 'Speak');
		} catch (err: any) {
			console.log(err.stack);
		}
	member?.roles.add(role!.id).then(() => {
		member.send(`Hello, you have been muted in ${interaction.guild.name} for: ${reason}`).catch((err) => console.log(err)),
			interaction.reply({
				content: successful.mute(member),
				ephemeral: true,
			});
	});

	/*   const data = database?.logChannelID;
    if (!data || data === null) { return }
    const LogChannel = interaction.client.channels.cache.get(data);
    if (!LogChannel || LogChannel === null) { return }
    if (LogChannel?.isTextBased()) {
        LogChannel?.send({ embeds: [Embed.adminEmbed(interaction, member!, reason!)] });
    }
*/
};
