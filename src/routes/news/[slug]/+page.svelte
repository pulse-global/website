<script lang="ts">
	import { resolve } from '$app/paths';
	import { site } from '#lib/news.ts';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
	const item = $derived(data.item);
	const url = $derived(`${site}/news/${item.slug}`);

	const jsonLd = $derived.by(() => {
		const structuredData = {
			'@context': 'https://schema.org',
			'@type': 'NewsArticle',
			'@id': `${url}#article`,
			mainEntityOfPage: url,
			url,
			headline: item.headline,
			description: item.summary,
			datePublished: item.published,
			dateModified: item.published,
			articleBody: item.body.join(' '),
			image: `${site}/og.png`,
			author: { '@type': 'Organization', '@id': `${site}/#org`, name: 'Pulse Global', url: site },
			publisher: {
				'@type': 'Organization',
				'@id': `${site}/#org`,
				name: 'Pulse Global',
				logo: { '@type': 'ImageObject', url: `${site}/logo.png` }
			},
			about: { '@id': `${site}/#org` }
		};
		// Escape "<" so the JSON can never close the script tag early.
		return (
			`<script type="application/ld+json">${JSON.stringify(structuredData).replace(/</g, '\\u003c')}</` +
			'script>'
		);
	});
</script>

<svelte:head>
	<title>{item.headline} · Pulse Global</title>
	<meta name="description" content={item.summary} />
	<meta name="author" content="Pulse Global" />
	<link rel="canonical" href={url} />

	<meta property="og:type" content="article" />
	<meta property="og:site_name" content="Pulse Global" />
	<meta property="og:title" content={item.headline} />
	<meta property="og:description" content={item.summary} />
	<meta property="og:url" content={url} />
	<meta property="og:image" content="{site}/og.png" />
	<meta property="article:published_time" content={item.published} />
	<meta property="article:author" content="Pulse Global" />
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
		<a
			class="text-primary/60 outline-offset-4 hover:text-primary focus-visible:outline-1 focus-visible:outline-primary"
			href={resolve('/news')}>News</a
		>
	</header>

	<main class="mx-auto max-w-2xl px-6 py-16">
		<article>
			<p class="mb-4 text-xs tracking-[0.25em] text-primary/60 uppercase">
				<time datetime={item.eventIso}>{item.eventDate}</time> · Ghent, Belgium
			</p>
			<h1 class="mb-10 text-2xl leading-snug font-extrabold uppercase sm:text-4xl">
				{item.headline}
			</h1>
			<div class="space-y-5 text-sm leading-relaxed text-primary/85 sm:text-base">
				{#each item.body as paragraph, i (i)}
					<p>{paragraph}</p>
				{/each}
			</div>

			<section
				class="mt-12 border-t border-primary/25 pt-6 text-xs leading-relaxed text-primary/70"
			>
				<h2 class="mb-2 tracking-[0.25em] uppercase">About Pulse Global</h2>
				<p>
					Pulse Global BV is a software company in Ghent, Belgium: SaaS products, custom software,
					technical consulting and a lab for new technology. More at pulse.city.
				</p>
				<p class="mt-3 text-primary/50">
					Published <time datetime={item.published}>{item.publishedLabel}</time> by Pulse Global.
				</p>
			</section>
		</article>
	</main>

	<footer class="mx-auto max-w-2xl px-6 pb-10 text-xs text-primary/60">
		<p>Pulse Global BV · Edward Pynaertkaai 111, 9000 Ghent, Belgium · VAT BE 1008.017.466</p>
	</footer>
</div>
