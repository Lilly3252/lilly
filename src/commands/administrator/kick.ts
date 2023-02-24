/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-unused-vars */
import  { ChatInputCommandInteraction , PermissionsBitField, SlashCommandBuilder} from 'discord.js';
import type { SlashCommand } from '#type/index.js';
import settingSchema from '#database/guildSettings.js';
import * as Embed from '#structures/messageEmbeds.js';
import { botPermissionDenied, errors, successful } from '#constants/constants.js';

export const slashy: SlashCommand['slashy'] = new SlashCommandBuilder()
	.setName('kick')
	.setDescription('kick a member.')
	.addUserOption((option) => option.setName('target').setDescription('Select a user').setRequired(true))
	.addStringOption((option) => option.setName('reason').setDescription('reason to kick').setRequired(true))
	.setDefaultMemberPermissions(PermissionsBitField.Flags.KickMembers);

export const run: SlashCommand['run'] = async (interaction: ChatInputCommandInteraction<'cached'>): Promise<any> => {
	const database = await settingSchema.findOne({ guildID: interaction.guild.id });
	const member = interaction.options.getMember('target')!;
	const reason = interaction.options.getString('reason')!;

	if (!interaction.guild.members.me?.permissions.has(PermissionsBitField.Flags.KickMembers)) {
		return  interaction.reply({
			content: botPermissionDenied('BanMembers'),
			ephemeral: true,
		});
	}
	if (!member?.moderatable || !member.manageable) {
		await interaction.reply({
			content: errors.moderationDenied,
			ephemeral: true,
		});
	}
	member
		?.send(`Hello, you have been kicked from ${interaction.guild.name} for: ${reason}.\n `)
		.then(() => member.kick())
		.catch((a) => console.log(a)),
		interaction.reply({
			content: successful.kick(member.user.username),
			ephemeral: true,
		});

	const data = database?.logChannelID;
	if (!data || data === null) {
		return;
	}
	const LogChannel = interaction.client.channels.cache.get(data);
	if (!LogChannel || LogChannel === null) {
		return;
	}
	if (LogChannel?.isTextBased()) {
		LogChannel?.send({ embeds: [Embed.adminEmbed(interaction, member!, reason!)] });
	}
};
