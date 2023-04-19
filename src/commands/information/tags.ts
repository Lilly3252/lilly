import { errors } from '#constants/constants.js';
import type { SlashCommand, Tag } from '#type/index.js';
/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { AutocompleteInteraction, ChatInputCommandInteraction, Collection, SlashCommandBuilder } from 'discord.js';
import { readFileSync } from 'fs';

import * as TOML from '@ltd/j-toml';

export const slashy: SlashCommand['slashy'] = new SlashCommandBuilder()
	.setName('tags')
	.setDescription('send a tag')
	.addStringOption((option) => option.setName('query').setDescription('Name of the tag to search for.').setAutocomplete(true));

export const run: SlashCommand['run'] = async (interaction: AutocompleteInteraction<'cached'> | ChatInputCommandInteraction<'cached'>): Promise<any> => {
	//* --------------------------- TOML reading ---------------------------
	const tags = new Collection<string, Tag>();
	const file = readFileSync('./dist/tags.toml');
	const tagParsed = TOML.parse(file, 1.0, '\n');
	Object.keys(tagParsed).forEach((x) => {
		tags.set(x, tagParsed[x] as unknown as Tag);
	});

	//* ---------------------------------------------------------------------

	if (interaction.isAutocomplete()) {
		const filtered = tags.filter((t) => t.keywords.toString().includes(interaction.options.getFocused() + ''));
		return interaction.respond(filtered.map((t) => ({ name: t.keywords.toString(), value: t.keywords.toString() })));
	}

	const tagName = interaction.options.getString('query', true);
	const tag = tags.find((t) => t.keywords.toString() === tagName.toLowerCase());

	if (tag) {
		interaction.reply({ content: tag?.content });
	} else {
		interaction.reply({ content: errors.noTagFound(tagName), ephemeral: true });
	}
};
