import { botPermissionDenied, errors, successful } from '#constants/constants.js';
import type { SlashCommand } from '#type/index.js';
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { ChatInputCommandInteraction, PermissionsBitField, SlashCommandBuilder } from 'discord.js';

export const slashy: SlashCommand['slashy'] = new SlashCommandBuilder()
	.setName('unban')
	.setDescription('unban a member.')
	.addStringOption((option) => option.setName('id').setDescription('put a id').setRequired(true))
	.addStringOption((option) => option.setName('reason').setDescription('reason to unban').setRequired(true))
	.setDefaultMemberPermissions(PermissionsBitField.Flags.BanMembers);

export const run: SlashCommand['run'] = async (interaction: ChatInputCommandInteraction<'cached'>): Promise<any> => {
	const d = interaction.options.getString('reason')!;
	const bannedPerson = interaction.options.getString('id')!;

	if (!interaction.guild.members.me?.permissions.has(PermissionsBitField.Flags.BanMembers)) {
		return interaction.reply({ content: botPermissionDenied('BanMembers'), ephemeral: true });
	}
	if (isNaN(+bannedPerson)) return interaction.reply({ content: errors.noUserID, ephemeral: true });

	interaction.guild.bans.fetch().then(async (guildban) => {
		const findBanned = guildban.find((a) => a.user.id == bannedPerson);

		if (guildban.size == 0) return interaction.reply({ content: errors.noGuildBanned, ephemeral: true });

		return findBanned
			? void (await interaction.guild.members.unban(findBanned.user, d).catch((a) => console.log(a)), interaction.reply({ content: successful.unban(findBanned.user), ephemeral: true }))
			: interaction.reply({ content: errors.noUserBanned, ephemeral: true });
	});
	/*const c = await settingSchema.findOne({ guildID: interaction.guild.id });
	  const g = c?.logChannelID;
    if (!g || g === null) { return }
    const LogChannel = interaction.client.channels.cache.get(g);
    if (!LogChannel || LogChannel === null) { return }
    if (LogChannel?.isTextBased()) {
        LogChannel?.send({ embeds: [embed.adminEmbed(interaction, member!, reason!)] });
    }*/
};
