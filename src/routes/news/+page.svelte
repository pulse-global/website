<script lang="ts">
	import { resolve } from '$app/paths';

	// Company news. Not linked from the homepage on purpose: it exists so directories (Crunchbase,
	// Dealroom) and search engines have a citable source. It is listed in sitemap.xml and llms.txt.
	const site = 'https://pulse.city';
	const title = 'News · Pulse Global';
	const description = 'News from Pulse Global BV, a software company in Ghent, Belgium.';

	const items = [
		{
			id: 'seed-2024',
			headline: 'Pulse Global founded in Ghent with €500,000 in seed capital',
			// The date of the event; the page itself was published later (datePublished below).
			eventDate: '4 April 2024',
			eventIso: '2024-04-04',
			published: '2026-11-09',
			body: [
				'Pulse Global BV was founded in Ghent, Belgium, on 4 April 2024, with €500,000 in seed capital.',
				'The company builds and runs its own SaaS products, creates custom software around how businesses actually work, and gives clear technical advice from strategy to code.',
				"Pulse Global is led by its founder, Lukas D'Hondt."
			]
		}
	];

	const structuredData = {
		'@context': 'https://schema.org',
		'@graph': items.map((item) => ({
			'@type': 'NewsArticle',
			'@id': `${site}/news#${item.id}`,
			url: `${site}/news#${item.id}`,
			headline: item.headline,
			datePublished: item.published,
			articleBody: item.body.join(' '),
			image: `${site}/og.png`,
			author: { '@type': 'Organization', '@id': `${site}/#org`, name: 'Pulse Global' },
			publisher: {
				'@type': 'Organization',
				'@id': `${site}/#org`,
				name: 'Pulse Global',
				logo: { '@type': 'ImageObject', url: `${site}/logo.png` }
			},
			about: { '@id': `${site}/#org` }
		}))
	};
	// Escape "<" so the JSON can never close the script tag early.
	const jsonLd =
		`<script type="application/ld+json">${JSON.stringify(structuredData).replace(/</g, '\\u003c')}</` +
		'script>';
</script>

<svelte:head>
	<title>{title}</title>
	<meta name="description" content={description} />
	<link rel="canonical" href="{site}/news" />

	<meta property="og:type" content="website" />
	<meta property="og:site_name" content="Pulse Global" />
	<meta property="og:title" content={title} />
	<meta property="og:description" content={description} />
	<meta property="og:url" content="{site}/news" />
	<meta property="og:image" content="{site}/og.png" />
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:site" content="@pulse_city_" />

	<!-- eslint-disable-next-line svelte/no-at-html-tags -- static JSON built above, not user input -->
	{@html jsonLd}
</svelte:head>

<div class="min-h-dvh bg-black font-mono text-primary">
	<header
		class="mx-auto flex max-w-2xl items-center justify-between px-6 pt-8 text-xs tracking-[0.3em] uppercase"
	>
		<a
			class="text-primary/80 outline-offset-4 hover:text-primary focus-visible:outline-1 focus-visible:outline-primary"
			href={resolve('/')}>Pulse // Global</a
		>
		<span class="text-primary/60">News</span>
	</header>

	<main class="mx-auto max-w-2xl px-6 py-16">
		<h1 class="mb-12 text-4xl font-extrabold uppercase sm:text-5xl">News</h1>

		{#each items as item (item.id)}
			<article id={item.id} class="border-t border-primary/25 pt-8">
				<p class="mb-3 text-xs tracking-[0.25em] text-primary/60 uppercase">
					<time datetime={item.eventIso}>{item.eventDate}</time>
				</p>
				<h2 class="mb-6 text-xl leading-snug uppercase sm:text-2xl">{item.headline}</h2>
				<div class="space-y-4 text-sm leading-relaxed text-primary/85 sm:text-base">
					{#each item.body as paragraph, i (i)}
						<p>{paragraph}</p>
					{/each}
				</div>
			</article>
		{/each}
	</main>

	<footer class="mx-auto max-w-2xl px-6 pb-10 text-xs text-primary/60">
		<p>Pulse Global BV · Edward Pynaertkaai 111, 9000 Ghent, Belgium · VAT BE 1008.017.466</p>
	</footer>
</div>
