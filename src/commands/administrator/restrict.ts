import { botPermissionDenied, errors, successful } from '#constants/constants.js';
import type { SlashCommand } from '#type/index.js';
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { ChatInputCommandInteraction, PermissionsBitField, SlashCommandBuilder } from 'discord.js';

export const slashy: SlashCommand['slashy'] = new SlashCommandBuilder()
	.setName('restrict')
	.setDescription('restrict a member.')
	.addUserOption((option) => option.setName('member').setDescription('Mention someone to restrict').setRequired(true))
	.addStringOption((option) => option.setName('restrictions').setDescription('Choose a restriction').setRequired(true).addChoices({ name: 'Embed', value: 'embed' }, { name: 'Reaction', value: 'reaction' }, { name: 'Voice', value: 'voice' }, { name: 'Slash', value: 'slash' }).setRequired(true))
	.addStringOption((option) => option.setName('reasons').setDescription('Specify a reason').setRequired(true))
	.setDefaultMemberPermissions(PermissionsBitField.Flags.ManageRoles);

export const run: SlashCommand['run'] = async (interaction: ChatInputCommandInteraction<'cached'>): Promise<any> => {
	if (!interaction.guild.members.me?.permissions.has(PermissionsBitField.Flags.ManageRoles)) {
		return interaction.reply({
			content: botPermissionDenied('ManageRoles'),
			ephemeral: true,
		});
	}
	// const database = await prisma.guild.findFirst({ where: { guildID: interaction.guild.id } });
	const member = interaction.options.getMember('member')!;
	const reason = interaction.options.getString('reasons')!;
	const restrictionName = interaction.options.getString('restrictions')!;
	// const data = database?.logChannelID;

	if (!member.moderatable || !member.manageable) {
		await interaction.reply({
			content: errors.moderationDenied,
			ephemeral: true,
		});
	}
	switch (restrictionName) {
		case 'embed': {
			let embedRole = interaction.guild.roles.cache.find((role) => role.name === 'Embed Restriction');
			if (!embedRole)
				try {
					(embedRole = await interaction.guild.roles.create({
						name: 'Embed Restriction',
						color: '#514f48',
					})),
						embedRole.permissions.remove('EmbedLinks', 'AttachFiles');
				} catch (a: any) {
					console.log(a.stack);
				}
			member.roles.add(embedRole!).then(() => {
				member.send(`Hello, you have been restricted in ${interaction.guild.name} for: ${reason}`).catch((a) => console.log(a)),
					interaction.reply({
						content: successful.restricted(member.user.username),
						ephemeral: true,
					});
			});
			break;
		}
		case 'reaction': {
			let reactionRole = interaction.guild.roles.cache.find((role) => role.name === 'Reaction Restriction');
			if (!reactionRole)
				try {
					(reactionRole = await interaction.guild.roles.create({
						name: 'Reaction Restriction',
						color: '#514f48',
					})),
						reactionRole.permissions.remove('AddReactions');
				} catch (a: any) {
					console.log(a.stack);
				}
			member.roles.add(reactionRole!).then(() => {
				member.send(`Hello, you have been restricted in ${interaction.guild.name} for: ${reason}`).catch((a) => console.log(a)),
					interaction.reply({
						content: successful.restricted(member.user.username),
						ephemeral: true,
					});
			});
			break;
		}
		case 'slash': {
			let slashRole = interaction.guild.roles.cache.find((role) => role.name === 'Slash Restriction');
			if (!slashRole)
				try {
					(slashRole = await interaction.guild.roles.create({
						name: 'Slash Restriction',
						color: '#514f48',
					})),
						slashRole.permissions.remove('UseApplicationCommands');
				} catch (a: any) {
					console.log(a.stack);
				}
			member.roles.add(slashRole!).then(() => {
				member.send(`Hello, you have been restricted in ${interaction.guild.name} for: ${reason}`).catch((a) => console.log(a)),
					interaction.reply({
						content: successful.restricted(member.user.username),
						ephemeral: true,
					});
			});
			break;
		}
		case 'voice':
			{
				let voiceRole = interaction.guild.roles.cache.find((role) => role.name === 'Voice Restriction');
				if (!voiceRole)
					try {
						(voiceRole = await interaction.guild.roles.create({
							name: 'Voice Restriction',
							color: '#514f48',
						})),
							voiceRole.permissions.remove('Stream', 'Connect', 'Speak', 'UseVAD');
					} catch (a: any) {
						console.log(a.stack);
					}
				member.roles.add(voiceRole!).then(() => {
					member.send(`Hello, you have been restricted in ${interaction.guild.name} for: ${reason}`).catch((a) => console.log(a)),
						interaction.reply({
							content: successful.restricted(member.user.username),
							ephemeral: true,
						});
				});
				member.voice.setChannel(null);
			}
			break;
	}

	//    if (!data || data === null) { return }
	//   const LogChannel = interaction.client.channels.cache.get(data);
	//  if (!LogChannel || LogChannel === null) { return }
	// if (LogChannel?.isTextBased()) {
	//    LogChannel?.send({
	//      embeds: [Embed.restrictEmbed(interaction, reason, restrictionName, member)],
	// });
	//   }
};
