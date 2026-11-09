<script lang="ts">
	import { resolve } from '$app/paths';
	import { site } from '#lib/news.ts';
	import { founderSocials } from '#lib/socials.ts';

	// Founder page. Not linked from the homepage on purpose: it gives search engines and AI crawlers
	// one page that ties Lukas's personal profiles to Pulse Global. Listed in sitemap.xml and llms.txt.
	const url = `${site}/lukas`;
	const title = "Lukas D'Hondt · Founder of Pulse Global";
	const description =
		"Lukas D'Hondt is the founder of Pulse Global, a software company in Ghent, Belgium: SaaS, custom software and technology consulting.";

	const structuredData = {
		'@context': 'https://schema.org',
		'@type': 'ProfilePage',
		'@id': `${url}#page`,
		url,
		name: title,
		description,
		mainEntity: {
			'@type': 'Person',
			// Same id as the founder on the homepage, so both describe one person.
			'@id': `${site}/#lukas`,
			name: "Lukas D'Hondt",
			jobTitle: 'Founder',
			url,
			description,
			worksFor: {
				'@type': 'Organization',
				'@id': `${site}/#org`,
				name: 'Pulse Global',
				url: `${site}/`
			},
			sameAs: founderSocials.map((s) => s.href)
		}
	};
	// Escape "<" so the JSON can never close the script tag early.
	const jsonLd =
		`<script type="application/ld+json">${JSON.stringify(structuredData).replace(/</g, '\\u003c')}</` +
		'script>';
</script>

<svelte:head>
	<title>{title}</title>
	<meta name="description" content={description} />
	<link rel="canonical" href={url} />

	<meta property="og:type" content="profile" />
	<meta property="og:site_name" content="Pulse Global" />
	<meta property="og:title" content={title} />
	<meta property="og:description" content={description} />
	<meta property="og:url" content={url} />
	<meta property="og:image" content="{site}/og.png" />
	<meta property="profile:first_name" content="Lukas" />
	<meta property="profile:last_name" content="D'Hondt" />
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:site" content="@pulse_city_" />
	<meta name="twitter:creator" content="@xylys" />

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
		<span class="text-primary/60">Founder</span>
	</header>

	<main class="mx-auto max-w-2xl px-6 py-16">
		<p class="mb-4 text-xs tracking-[0.25em] text-primary/60 uppercase">Founder · Ghent, Belgium</p>
		<h1 class="mb-10 text-4xl leading-tight font-extrabold uppercase sm:text-5xl">Lukas D'Hondt</h1>
		<div class="space-y-5 text-sm leading-relaxed text-primary/85 sm:text-base">
			<p>
				I'm the founder of <a
					class="underline outline-offset-4 hover:text-primary focus-visible:outline-1 focus-visible:outline-primary"
					href={resolve('/')}>Pulse Global</a
				>, a software company in Ghent, Belgium. We build and run our own SaaS products, create
				custom software around how businesses actually work, and test new technology in our lab.
			</p>
			<p>
				I also work with companies as a technology consultant, giving clear technical advice from
				strategy to code.
			</p>
		</div>

		<section class="mt-12 border-t border-primary/25 pt-6">
			<h2 class="mb-4 text-xs tracking-[0.25em] text-primary/70 uppercase">Elsewhere</h2>
			<ul class="space-y-3 text-sm">
				{#each founderSocials as social (social.name)}
					<li>
						<!-- eslint-disable svelte/no-navigation-without-resolve -- external link, not a route -->
						<a
							class="inline-flex items-center gap-3 text-primary/85 outline-offset-4 hover:text-primary hover:underline focus-visible:outline-1 focus-visible:outline-primary"
							href={social.href}
							target="_blank"
							rel="me noopener noreferrer"
						>
							<svg class="size-4" viewBox={social.viewBox} fill="currentColor" aria-hidden="true">
								<path d={social.path} />
							</svg>
							<span>{social.name}</span>
							<span class="text-primary/50">{social.href.replace(/^https:\/\/(www\.)?/, '')}</span>
							<span class="sr-only">(opens in a new tab)</span>
						</a>
						<!-- eslint-enable svelte/no-navigation-without-resolve -->
					</li>
				{/each}
			</ul>
		</section>
	</main>

	<footer class="mx-auto max-w-2xl px-6 pb-10 text-xs text-primary/60">
		<p>Pulse Global BV · Edward Pynaertkaai 111, 9000 Ghent, Belgium · VAT BE 1008.017.466</p>
	</footer>
</div>
