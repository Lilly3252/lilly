import { botPermissionDenied, errors, successful } from '#constants/constants.js';
import blacklistUser from '#database/blacklistUser.js';
import settingSchema from '#database/guildSettings.js';
import * as Embed from '#embeds/index.js';
import type { SlashCommand } from '#type/index.js';
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { ActionRowBuilder, ChatInputCommandInteraction, type ModalActionRowComponentBuilder, ModalBuilder, PermissionsBitField, SlashCommandBuilder, TextInputBuilder, TextInputStyle } from 'discord.js';

export const slashy: SlashCommand['slashy'] = new SlashCommandBuilder()
	.setName('blacklist')
	.setDescription('Blacklist a member.')
	.addUserOption((option) => option.setName('target').setDescription('Select a user').setRequired(true))
	.addStringOption((option) => option.setName('reason').setDescription('reason to blacklist').setRequired(true))
	.setDefaultMemberPermissions(PermissionsBitField.Flags.ManageRoles);

export const run: SlashCommand['run'] = async (interaction: ChatInputCommandInteraction<'cached'>): Promise<any> => {
	const guild = await settingSchema.findOne({ guildID: interaction.guild.id });
	const member = interaction.options.getMember('target');
	const reason = interaction.options.getString('reason');

	const BlacklistModal = new ModalBuilder().setCustomId('Blacklist').setTitle('Add someone into the Blacklist.');
	const Guildmember = new TextInputBuilder().setCustomId('guildMember_blacklist').setLabel('Who do you want to add?').setStyle(TextInputStyle.Short).setRequired(true);
	const Reason = new TextInputBuilder().setCustomId('reason_blacklist').setLabel('What is the reason?').setStyle(TextInputStyle.Paragraph).setRequired(true);

	const firstActionRow = new ActionRowBuilder<ModalActionRowComponentBuilder>().addComponents(Guildmember);
	const secondActionRow = new ActionRowBuilder<ModalActionRowComponentBuilder>().addComponents(Reason);

	BlacklistModal.addComponents(firstActionRow, secondActionRow);

	await interaction.showModal(BlacklistModal);

	//* Some Checkups ..
	if (!interaction.guild.members.me?.permissions.has(PermissionsBitField.Flags.ManageRoles)) {
		return await interaction.reply({
			content: botPermissionDenied('ManageRoles'),
			ephemeral: true,
		});
	}
	if (!member?.manageable) {
		return await interaction.reply({
			content: errors.moderationDenied,
			ephemeral: true,
		});
	}

	//* If everything is okay..create doc in database VV
	await blacklistUser.create({
		guildID: interaction.guild.id,
		ID: interaction.user.id,
		reason: reason,
	});

	//* reply with a message to say that everything when through perfectly..
	await interaction.reply({ content: successful.blacklisted, ephemeral: true });

	//* Logging channel for Moderation purposes
	const g = guild?.logChannelID;
	if (!g || g === null) {
		return;
	}
	const LogChannel = interaction.client.channels.cache.get(g);
	if (!LogChannel || LogChannel === null) {
		return;
	}
	if (LogChannel?.isTextBased()) {
		LogChannel?.send({ embeds: [Embed.adminEmbed(interaction, member!, reason!)] });
	}
};
