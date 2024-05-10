export type EmojifyOptions = {
	mode: boolean;
	padStart?: boolean;
	separator?: string;
	space?: number;
};
export interface Tag {
	keywords: string[];
	content: string;
}
export type AlgoliaMovieHit = {
	show_id: number;
	type: string;
	title: string;
	director: string;
	cast: string;
	country: string;
	date_added: string;
	release_year: number;
	rating: string;
	duration: string;
	listed_in: string;
	description: string;
	objectID: string;
};
export type AlgoliaSearchResult = {
	hits?: AlgoliaMovieHit[];
	query: string;
};

