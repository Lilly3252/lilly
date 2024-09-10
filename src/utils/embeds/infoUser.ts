import { InfoCommand } from "#slashyInformations/index.js";
import { user } from "#utils/types/database.js";
import { truncateEmbed } from "@yuudachi/framework";
import { ArgsParam } from "@yuudachi/framework/types";
import { APIEmbed, APIEmbedField, Colors, GuildMember, TimestampStyles, User, time } from "discord.js";
import i18next from "i18next";

export function userInfo(args: ArgsParam<typeof InfoCommand>, target: User | GuildMember, user: user, locale: string) {
	const targetParam = target instanceof GuildMember;
	const userBlacklisted = user?.blacklisted;
	const spammer = targetParam ? target.user.flags.has("Spammer") : target.flags.has("Spammer");
	const embed: APIEmbed = {
		title: targetParam ? "Member information" : "User information",
		color: targetParam ? target.displayColor : Colors.DarkButNotBlack,
		thumbnail: {
			url: targetParam ? target.displayAvatarURL({ size: 512 }) : target.displayAvatarURL({ size: 512 })
		},
		footer: {
			text: `Blacklisted: ${userBlacklisted ? "✅" : "❌"} | Spammer: ${spammer ? "✅" : "❌"}`,
			icon_url: targetParam ? target.displayAvatarURL() : target.displayAvatarURL()
		}
	};

	const fields: APIEmbedField[] = [];

	if (targetParam) {
		const guildMemberInformation: APIEmbedField = {
			name: i18next.t("info.member.name", { lng: locale }),
			value: i18next.t("info.member.value", {
				username: target.user.username,
				id: target.id,
				avatar: `[Link to avatar](${target.displayAvatarURL()})`,
				status: target.presence?.status ?? "No information",
				lng: locale
			})
		};
		fields.push(guildMemberInformation);

		if (args.user.verbose) {
			const role = target.roles.highest;
			const memberRole: APIEmbedField = {
				name: "Role",
				value: i18next.t("info.role.value", {
					name: `${role}`,
					role_id: role.id,
					color: `${role.hexColor.toUpperCase()}`,
					hoisted: role.hoist,
					mentionable: role.mentionable
				}),
				inline: true
			};
			const otherinfo: APIEmbedField = {
				name: "Other",
				value: i18next.t("info.member.other", {
					created_at: time(target.user.createdAt, TimestampStyles.RelativeTime),
					joined_at: time(target.joinedAt, TimestampStyles.RelativeTime),
					pending: target.pending,
					is_timed_out: target.communicationDisabledUntil ? time(target.communicationDisabledUntil, TimestampStyles.RelativeTime) : "false",
					is_bot: target.user.bot
				}),
				inline: true
			};

			fields.push(memberRole, otherinfo);
		}
	} else {
		const userInformation: APIEmbedField = {
			name: i18next.t("info.user.name", { lng: locale }),
			value: i18next.t("info.user.value", {
				username: target.username,
				id: target.id,
				avatar: `[Link to avatar](${target.displayAvatarURL()})`,
				time_create: time(target.createdAt, TimestampStyles.RelativeTime),
				lng: locale
			})
		};
		fields.push(userInformation);
	}

	// Add notes to the embed if they exist
	if (user.notes && user.notes.length > 0) {
		const notesField: APIEmbedField = {
			name: "Notes",
			value: user.notes.map((n, index) => `${index + 1}. ${n.note} (by <@${n.moderator}> on ${n.date.toLocaleDateString()})`).join("\n")
		};
		fields.push(notesField);
	}
	if (user.pet) {
		const petField: APIEmbedField = {
			name: "Pet",
			value: `Name: ${user.pet.petName}\nType: ${user.pet.petType}`,
			inline: true
		};
		fields.push(petField);
	}
	embed.fields = fields;

	return truncateEmbed(embed);
}
