import { AlgoliaMovieHit } from "#utils/types/functiontypes.js";
import { truncateEmbed } from "@yuudachi/framework";
import { APIEmbed, APIEmbedField } from "discord.js";

export async function movieInfo(movie: AlgoliaMovieHit) {
	const wiki = await fetch(`https://en.wikipedia.org/wiki/${movie.title.replaceAll(" ", "_")}_(${movie.type === "movie" ? "Film" : "TV_show"})`);
	console.log(wiki);
	const info: APIEmbedField = {
		name: `General Information`,
		value: [
			`
            **Title**: ${movie.title}
            **Director**: ${movie.director ? movie.director : "No director found"}
            `
		].join("")
	};
	const descriptions: APIEmbedField = {
		name: `Description`,
		value: `${movie.description}`
	};

	const embed: APIEmbed = {
		author: {
			name: `${movie.type} Information`
		},
		fields: [info, descriptions],
		footer: {
			text: `Country: ${movie.country}`
		}
	};

	return truncateEmbed(embed);
}
