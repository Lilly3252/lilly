import "reflect-metadata";
import User from "#database/models/users.js";
import type { UserNoteCommand } from "#slashyInformations/index.js";
import { Command } from "@yuudachi/framework";
import type { ArgsParam, InteractionParam, LocaleParam } from "@yuudachi/framework/types";

import { injectable } from "tsyringe";

@injectable()
export default class extends Command<typeof UserNoteCommand> {
	public override async chatInput(interaction: InteractionParam, args: ArgsParam<typeof UserNoteCommand>, locale: LocaleParam): Promise<void> {
		await interaction.deferReply();
		const action = args.action;
		const target = args.target;
		const note = args.note;
		const moderator = interaction.user.id;

		if (!target.user) {
			await interaction.editReply("Please specify a user.");
			return;
		}

		switch (action) {
			case "add":
				if (!note) {
					await interaction.editReply("Please provide a note to add.");
					return;
				}
				await User.findOneAndUpdate({ userID: target.user.id, guildID: interaction.guildId }, { $push: { notes: { note, moderator } } }, { upsert: true, new: true });
				await interaction.editReply(`Note added for ${target.user.tag}.`);
				break;

			case "view":
				const userNotes = await User.findOne({ userID: target.user.id, guildID: interaction.guildId });
				if (!userNotes || !userNotes.notes || userNotes.notes.length === 0) {
					await interaction.editReply(`No notes found for ${target.user.tag}.`);
					return;
				}
				const notesList = userNotes.notes.map((n, index) => `${index + 1}. ${n.note} (by <@${n.moderator}> on ${n.date.toLocaleDateString()})`).join("\n");
				await interaction.editReply(`Notes for ${target.user.tag}:\n${notesList}`);
				break;

			case "delete":
				const noteIndex = parseInt(note, 10) - 1;
				const userNotesToDelete = await User.findOne({ userID: target.user.id, guildID: interaction.guildId });
				if (!userNotesToDelete || !userNotesToDelete.notes || !userNotesToDelete.notes[noteIndex]) {
					await interaction.editReply(`No note found at index ${note}.`);
					return;
				}
				userNotesToDelete.notes.splice(noteIndex, 1);
				await userNotesToDelete.save();
				await interaction.editReply(`Note ${note} deleted for ${target.user.tag}.`);
				break;

			default:
				await interaction.editReply("Invalid action.");
				break;
		}
	}
}
