<script lang="ts">
	import { resolve } from '$app/paths';
	import { news, site } from '#lib/news.ts';

	// Company news. Not linked from the homepage on purpose: it exists so directories (Crunchbase,
	// Dealroom) and search engines have a citable source. It is listed in sitemap.xml and llms.txt.
	const title = 'News · Pulse Global';
	const description = 'News from Pulse Global BV, a software company in Ghent, Belgium.';
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

		<ul>
			{#each news as item (item.slug)}
				<li class="border-t border-primary/25 pt-8 pb-8">
					<p class="mb-3 text-xs tracking-[0.25em] text-primary/60 uppercase">
						<time datetime={item.eventIso}>{item.eventDate}</time>
					</p>
					<h2 class="mb-4 text-xl leading-snug uppercase sm:text-2xl">
						<a
							class="outline-offset-4 hover:underline focus-visible:underline focus-visible:outline-1 focus-visible:outline-primary"
							href={resolve('/news/[slug]', { slug: item.slug })}>{item.headline}</a
						>
					</h2>
					<p class="text-sm leading-relaxed text-primary/85 sm:text-base">{item.summary}</p>
				</li>
			{/each}
		</ul>
	</main>

	<footer class="mx-auto max-w-2xl px-6 pb-10 text-xs text-primary/60">
		<p>Pulse Global BV · Edward Pynaertkaai 111, 9000 Ghent, Belgium · VAT BE 1008.017.466</p>
	</footer>
</div>
