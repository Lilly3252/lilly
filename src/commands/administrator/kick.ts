/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-unused-vars */
import type { ChatInputCommandInteraction } from 'discord.js';
import type { SlashCommand } from '../../structures/index.js';
import { PermissionsBitField, SlashCommandBuilder } from 'discord.js';
import SYSTEM from '../../structures/messageSystem.json' assert { type: 'json' };
//import { prisma } from "../../index.js";
//import * as Embed from "../../structures/messageEmbeds.js";

export const slashy: SlashCommand['slashy'] = new SlashCommandBuilder()
	.setName('kick')
	.setDescription('kick a member.')
	.addUserOption((option) => option.setName('target').setDescription('Select a user').setRequired(true))
	.addStringOption((option) => option.setName('reason').setDescription('reason to kick').setRequired(true))
	.setDefaultMemberPermissions(PermissionsBitField.Flags.KickMembers);

export const run: SlashCommand['run'] = async (interaction: ChatInputCommandInteraction<'cached'>): Promise<void> => {
	//const database = await prisma.guild.findFirst({ where: { guildID: interaction.guild.id } });
	const member = interaction.options.getMember('target');
	const reason = interaction.options.getString('reason');

	if (!interaction.guild.members.me?.permissions.has(PermissionsBitField.Flags.KickMembers)) {
		return void interaction.reply({
			content: SYSTEM.ERROR.PERMISSIONS.BOT_PERM['KICK_MEMBERS'],
			ephemeral: true,
		});
	}
	if (!member?.moderatable || !member.manageable) {
		await interaction.reply({
			content: SYSTEM.ERROR.ADMIN.MODERATION_DENIED,
			ephemeral: true,
		});
	}
	member
		?.send(`Hello, you have been kicked from ${interaction.guild.name} for: ${reason}.\n `)
		.then(() => member.kick())
		.catch((a) => console.log(a)),
		interaction.reply({
			content: `**${member?.user.tag}** has been kicked`,
			ephemeral: true,
		});

	/*  const data = database?.logChannelID;
    if (!data || data === null) { return }
    const LogChannel = interaction.client.channels.cache.get(data);
    if (!LogChannel || LogChannel === null) { return }
    if (LogChannel?.isTextBased()) {
        LogChannel?.send({ embeds: [Embed.AdminEmbed(interaction, member!, reason!)] });
    }
*/
};
