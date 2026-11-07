<script lang="ts">
	import { onMount } from 'svelte';

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
	const description = 'Pulse Global BV builds software that keeps the beat, from Ghent, Belgium.';

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
	<meta property="og:image:alt" content="PULSE: software that keeps the beat" />
	<meta name="twitter:card" content="summary_large_image" />
</svelte:head>

<div
	class="relative isolate flex min-h-dvh flex-col overflow-hidden bg-black font-mono text-primary uppercase"
>
	<!-- Backdrop: a faint grid and a glow that slowly breathes across the whole page. -->
	<div class="hud-grid pointer-events-none absolute inset-0 -z-10" aria-hidden="true"></div>
	<div class="breath pointer-events-none absolute inset-0 -z-10" aria-hidden="true"></div>

	<!--
		HUD top edge: a hairline across the page with the Pulse tab (the lip of the old bar) hanging
		off it as a see-through outlined panel, and a tick scale running out to the right edge.
	-->
	<header class="relative h-7 shrink-0" aria-hidden="true">
		<div class="hud-line absolute inset-x-0 top-0 h-px bg-primary/50"></div>
		<svg class="absolute top-0 left-4 h-7 w-[232px] sm:left-8" viewBox="0 0 232 28" fill="none">
			<path
				d="M0.5 0.5L16 27.5H200L215.5 0.5"
				class="fill-primary/10 stroke-primary/70"
				stroke-width="1"
			/>
			<path d="M24 23.5H72" class="stroke-primary" stroke-width="2" />
		</svg>
		<div
			class="absolute top-0 left-4 flex h-6 w-[216px] items-center justify-center gap-2 text-[10px] tracking-[0.3em] text-primary/80 sm:left-8"
		>
			<span class="breath-dot size-1.5 rounded-full bg-primary"></span>
			Pulse // Global
		</div>
		<div
			class="hud-ticks absolute top-0 right-4 hidden h-2 w-[40%] max-w-md sm:right-8 sm:block"
		></div>
		<div class="absolute top-0 right-4 h-3 w-px bg-primary/70 sm:right-8"></div>
	</header>

	<main class="flex flex-1 flex-col items-center justify-center gap-6 p-6 text-center">
		<h1 class="breath-text text-7xl font-extrabold sm:text-8xl lg:text-9xl">Pulse</h1>
		<p class="text-sm tracking-[0.25em] text-primary/60 sm:text-base">
			Software that keeps the beat
		</p>
	</main>

	<footer
		class="relative mx-4 mb-4 flex flex-col gap-4 border-t border-primary/25 pt-4 text-xs text-primary/60 sm:mx-8 sm:mb-6 sm:flex-row sm:items-end sm:justify-between"
	>
		<span class="absolute -top-px left-0 h-2 w-px bg-primary/70" aria-hidden="true"></span>
		<span class="absolute -top-px right-0 h-2 w-px bg-primary/70" aria-hidden="true"></span>
		<div class="space-y-1">
			<p>{company.name} · {company.street}, {company.city}</p>
			<p>VAT {company.vat} · {company.register}</p>
		</div>
		<p class="text-sm text-primary">
			{#if reach}
				<!-- eslint-disable-next-line svelte/no-navigation-without-resolve -- external link, not a route -->
				<a class="hover:underline" href={reach.href}>{reach.text}</a>
			{:else}
				{fallback}
			{/if}
		</p>
	</footer>
</div>
