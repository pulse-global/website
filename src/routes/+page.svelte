<script lang="ts">
	import { onMount } from 'svelte';
	import bar from '#lib/assets/bar.svg';

	const company = {
		name: 'Pulse Global BV',
		vat: 'BE 1008.017.466',
		street: 'Edward Pynaertkaai 111',
		city: '9000 Ghent, Belgium',
		register: 'RPR Ghent, division Ghent'
	};

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
	<title>Pulse Global</title>
	<meta
		name="description"
		content="Pulse Global BV builds software that keeps the beat, from Ghent, Belgium."
	/>
</svelte:head>

<div class="flex min-h-dvh flex-col bg-black font-mono text-primary uppercase">
	<main class="flex flex-1 flex-col items-center justify-center gap-4 p-6 text-center">
		<h1 class="animate-heartbeat text-6xl font-extrabold motion-reduce:animate-none">Pulse</h1>
		<img src={bar} alt="" class="w-56 max-w-full" />
		<p class="text-sm text-primary/60">Software that keeps the beat</p>
	</main>

	<footer
		class="flex flex-col gap-4 p-6 text-xs text-primary/60 sm:flex-row sm:items-end sm:justify-between"
	>
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
