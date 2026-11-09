<script lang="ts">
	import { onMount } from 'svelte';
	import { companySocials } from '#lib/socials.ts';

	const company = {
		name: 'Pulse Global BV',
		vat: 'BE 1008.017.466',
		street: 'Edward Pynaertkaai 111',
		city: '9000 Ghent, Belgium',
		register: 'RPR Ghent, division Ghent'
	};

	// Link previews and canonical need absolute URLs.
	const site = 'https://pulse.city';
	const title = 'Pulse Global';
	const description = 'Pulse Global BV builds software that breathes, from Ghent, Belgium.';

	// schema.org facts for search engines and AI crawlers: who the company is, its official
	// profiles (sameAs) and its founder. Keep it in line with llms.txt and the profiles themselves.
	const founder = {
		'@type': 'Person',
		'@id': `${site}/#lukas`,
		name: "Lukas D'Hondt",
		jobTitle: 'Founder',
		url: `${site}/lukas`,
		worksFor: { '@id': `${site}/#org` },
		sameAs: [
			'https://www.linkedin.com/in/lukasdhondt',
			'https://github.com/xylys',
			'https://x.com/xylys'
		]
	};
	const structuredData = {
		'@context': 'https://schema.org',
		'@graph': [
			{
				'@type': 'Organization',
				'@id': `${site}/#org`,
				name: 'Pulse Global',
				legalName: company.name,
				url: `${site}/`,
				logo: { '@type': 'ImageObject', url: `${site}/logo.png`, width: 512, height: 512 },
				image: `${site}/og.png`,
				slogan: 'Software that breathes',
				description:
					"Pulse Global is a software company in Ghent, Belgium. We build and run our own SaaS products, create custom software around how businesses actually work, and give clear technical advice from strategy to code. In our lab we test new technology first, so our clients don't have to.",
				foundingDate: '2024-04-04',
				vatID: 'BE1008017466',
				address: {
					'@type': 'PostalAddress',
					streetAddress: company.street,
					postalCode: '9000',
					addressLocality: 'Ghent',
					addressCountry: 'BE'
				},
				founder: { '@id': founder['@id'] },
				sameAs: [
					'https://www.linkedin.com/company/pulseglobal',
					'https://github.com/pulse-global',
					'https://x.com/pulse_city_',
					'https://www.instagram.com/pulse_city/',
					'https://www.facebook.com/pulseglobalbv',
					'https://www.threads.com/@pulse_city',
					'https://bsky.app/profile/pulse.city',
					'https://www.youtube.com/@pulseglobalhq',
					'https://www.tiktok.com/@pulseglobalhq',
					'https://www.crunchbase.com/organization/pulse-global'
				]
			},
			founder,
			{
				'@type': 'WebSite',
				'@id': `${site}/#website`,
				url: `${site}/`,
				name: title,
				publisher: { '@id': `${site}/#org` }
			}
		]
	};
	// Escape "<" so the JSON can never close the script tag early.
	const jsonLd =
		`<script type="application/ld+json">${JSON.stringify(structuredData).replace(/</g, '\\u003c')}</` +
		'script>';

	// Assembled in the browser only, from reversed pieces and char codes, so neither the HTML nor
	// the JS bundle contains the address, an @, or the link scheme. Comments and local names are
	// stripped by the build; only the strings below ship.
	const parts = ['city', 'pulse', 'info'];
	const fallback = `${parts[2]}[at]${parts[1]}.${parts[0]}`;
	let reach = $state<{ href: string; text: string } | null>(null);

	onMount(() => {
		// Spread from arrays: the minifier folds String.fromCharCode(64) back into a literal "@".
		const chars = (codes: number[]) => String.fromCharCode(...codes);
		const [tld, domain, user] = parts;
		const text = user + chars([64]) + domain + '.' + tld;
		reach = { href: chars([109, 97, 105, 108, 116, 111, 58]) + text, text };
	});
</script>

<svelte:head>
	<title>{title}</title>
	<meta name="description" content={description} />
	<link rel="canonical" href="{site}/" />

	<meta property="og:type" content="website" />
	<meta property="og:site_name" content={title} />
	<meta property="og:title" content={title} />
	<meta property="og:description" content={description} />
	<meta property="og:url" content="{site}/" />
	<meta property="og:image" content="{site}/og.png" />
	<meta property="og:image:width" content="1200" />
	<meta property="og:image:height" content="630" />
	<meta property="og:image:alt" content="PULSE: software that breathes" />
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:site" content="@pulse_city_" />

	<!-- eslint-disable-next-line svelte/no-at-html-tags -- static JSON built above, not user input -->
	{@html jsonLd}
</svelte:head>

<div
	class="relative isolate flex min-h-dvh flex-col overflow-hidden bg-black font-mono text-primary uppercase"
>
	<!-- Backdrop: a faint grid and a glow that slowly breathes across the whole page. -->
	<div class="hud-mask pointer-events-none absolute inset-0 -z-10" aria-hidden="true">
		<div class="hud-grid absolute inset-0"></div>
	</div>
	<!-- Grid flashes (GridFlashes.svelte) are switched off for now; to bring them back:
	<div class="flash-mask pointer-events-none absolute inset-0 -z-10" aria-hidden="true">
		<GridFlashes />
	</div> -->
	<div class="boot-glow pointer-events-none absolute inset-0 -z-10" aria-hidden="true">
		<div class="breath absolute inset-0"></div>
	</div>

	<!--
		HUD top edge: a hairline across the page with the Pulse tab (the lip of the old bar) hanging
		off it as a see-through outlined panel, and a tick scale running out to the right edge.
	-->
	<header class="relative h-7 shrink-0" aria-hidden="true">
		<div class="boot-line absolute inset-x-0 top-0 h-px">
			<div class="hud-line h-full bg-primary/50"></div>
		</div>
		<svg
			class="boot-panel absolute top-0 left-4 h-7 w-[232px] sm:left-8"
			viewBox="0 0 232 28"
			fill="none"
		>
			<path
				d="M0.5 0.5L16 27.5H200L215.5 0.5"
				class="fill-primary/10 stroke-primary/70"
				stroke-width="1"
			/>
			<path d="M24 23.5H72" class="stroke-primary" stroke-width="2" />
		</svg>
		<div
			class="boot-panel absolute top-0 left-4 flex h-6 w-[216px] items-center justify-center gap-2 text-[10px] tracking-[0.3em] text-primary/80 sm:left-8"
		>
			<span class="breath-dot size-1.5 rounded-full bg-primary"></span>
			<span class="boot-type">Pulse // Global</span>
		</div>
		<div
			class="boot-fade hud-ticks absolute top-0 right-8 h-2 w-[28%] max-w-md sm:right-12 sm:w-[40%]"
		></div>
		<div class="boot-fade absolute top-0 right-4 h-3 w-px bg-primary/70 sm:right-8"></div>
	</header>

	<main class="relative flex flex-1 flex-col items-center justify-center gap-6 p-6 text-center">
		<!-- Viewfinder brackets framing the content; they brighten with each breath. -->
		<div class="boot-brackets pointer-events-none absolute inset-4 sm:inset-8" aria-hidden="true">
			<span class="bracket top-0 left-0 border-t border-l"></span>
			<span class="bracket top-0 right-0 border-t border-r"></span>
			<span class="bracket bottom-0 left-0 border-b border-l"></span>
			<span class="bracket right-0 bottom-0 border-r border-b"></span>
		</div>

		<div class="boot-crt">
			<h1 class="breath-text text-7xl font-extrabold sm:text-8xl lg:text-9xl" data-text="Pulse">
				Pulse
			</h1>
		</div>
		<p class="boot-fade boot-late text-sm tracking-[0.25em] text-primary/80 sm:text-base">
			Software that breathes
		</p>
	</main>

	<footer
		class="relative mx-4 mb-4 flex flex-col gap-4 pt-4 text-xs text-primary/80 sm:mx-8 sm:mb-6 sm:flex-row sm:items-end sm:justify-between"
	>
		<div class="boot-line-center absolute inset-x-0 top-0 h-px bg-primary/25" aria-hidden="true">
			<span class="absolute top-0 left-0 h-2 w-px bg-primary/70"></span>
			<span class="absolute top-0 right-0 h-2 w-px bg-primary/70"></span>
		</div>
		<div class="boot-fade boot-late space-y-1">
			<p>{company.name} · {company.street}, {company.city}</p>
			<p>VAT {company.vat} · {company.register}</p>
		</div>
		<div class="boot-fade boot-late flex items-center gap-4 text-sm text-primary">
			<ul class="flex items-center gap-3">
				{#each companySocials as social (social.name)}
					<li>
						<!-- eslint-disable svelte/no-navigation-without-resolve -- external link, not a route -->
						<a
							class="block opacity-80 outline-offset-4 transition-opacity hover:opacity-100 focus-visible:opacity-100 focus-visible:outline-1 focus-visible:outline-primary"
							href={social.href}
							target="_blank"
							rel="noopener noreferrer"
							aria-label="Pulse Global on {social.name} (opens in a new tab)"
							title="Pulse Global on {social.name}"
						>
							<svg class="size-4" viewBox={social.viewBox} fill="currentColor" aria-hidden="true">
								<path d={social.path} />
							</svg>
						</a>
						<!-- eslint-enable svelte/no-navigation-without-resolve -->
					</li>
				{/each}
			</ul>
			<p>
				{#if reach}
					<!-- eslint-disable svelte/no-navigation-without-resolve -- external link, not a route -->
					<a
						class="outline-offset-4 hover:underline focus-visible:underline focus-visible:outline-1 focus-visible:outline-primary"
						href={reach.href}>{reach.text}</a
					>
					<!-- eslint-enable svelte/no-navigation-without-resolve -->
				{:else}
					{fallback}
				{/if}
			</p>
		</div>
	</footer>
</div>
