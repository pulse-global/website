// Company news items. Each gets its own article page at /news/<slug> (so directories such as
// Crunchbase can cite it as an article) and a line on the /news index. Newest first.
export type NewsItem = {
	slug: string;
	headline: string;
	summary: string;
	/** The date the news is about, shown on the page. */
	eventDate: string;
	eventIso: string;
	/** When the page itself was published (ISO date and label). */
	published: string;
	publishedLabel: string;
	body: string[];
};

export const news: NewsItem[] = [
	{
		slug: 'founding-seed-2024',
		headline: 'Pulse Global founded in Ghent with €500,000 in seed capital',
		summary:
			'Pulse Global BV was founded in Ghent, Belgium, on 4 April 2024, with €500,000 in seed capital.',
		eventDate: '4 April 2024',
		eventIso: '2024-04-04',
		published: '2026-11-09',
		publishedLabel: '9 November 2026',
		body: [
			'Pulse Global BV was founded in Ghent, Belgium, on 4 April 2024, with €500,000 in seed capital.',
			'The company builds and runs its own SaaS products, creates custom software around how businesses actually work, and gives clear technical advice from strategy to code. In its lab it tests new technology first, so its clients don’t have to.',
			"Pulse Global is led by its founder, Lukas D'Hondt."
		]
	}
];

export const site = 'https://pulse.city';
