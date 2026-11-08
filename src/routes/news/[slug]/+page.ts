import { error } from '@sveltejs/kit';
import { news } from '#lib/news.ts';
import type { EntryGenerator, PageLoad } from './$types';

// Prerender one page per news item.
export const entries: EntryGenerator = () => news.map(({ slug }) => ({ slug }));

export const load: PageLoad = ({ params }) => {
	const item = news.find((n) => n.slug === params.slug);
	if (!item) error(404, 'Not found');
	return { item };
};
