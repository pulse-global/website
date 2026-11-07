<script lang="ts">
	import { onMount } from 'svelte';

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
	const fallback = `${parts[2]} [at] ${parts[1]}.${parts[0]}`;
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

<main>
	<h1>Pulse<span>.</span></h1>
	<p>Software that keeps the beat.</p>
</main>

<footer>
	<p>{company.name} · {company.street}, {company.city}</p>
	<p>VAT {company.vat} · {company.register}</p>
	<p>
		{#if reach}
			<!-- eslint-disable-next-line svelte/no-navigation-without-resolve -- external link, not a route -->
			<a href={reach.href}>{reach.text}</a>
		{:else}
			{fallback}
		{/if}
	</p>
</footer>

<style>
	main {
		flex: 1;
		display: flex;
		flex-direction: column;
		justify-content: center;
		padding: 2rem 1.5rem;
		max-width: 64rem;
		width: 100%;
		margin: 0 auto;
		box-sizing: border-box;
	}

	h1 {
		margin: 0;
		font-size: clamp(4rem, 16vw, 10rem);
		font-weight: 800;
		letter-spacing: -0.05em;
		line-height: 0.9;
	}

	h1 span {
		display: inline-block;
		color: var(--orange);
		transform-origin: 50% 85%;
		animation: heartbeat 1.4s ease-in-out infinite;
	}

	/* Lub-dub, then rest: two quick beats in the first ~40% of each cycle. */
	@keyframes heartbeat {
		0%,
		40%,
		100% {
			transform: scale(1);
			text-shadow: 0 0 0 transparent;
		}
		10% {
			transform: scale(1.18);
			text-shadow: 0 0 0.35em rgb(255 106 0 / 0.75);
		}
		20% {
			transform: scale(1.02);
			text-shadow: 0 0 0.15em rgb(255 106 0 / 0.3);
		}
		28% {
			transform: scale(1.12);
			text-shadow: 0 0 0.3em rgb(255 106 0 / 0.6);
		}
	}

	@media (prefers-reduced-motion: reduce) {
		h1 span {
			animation: none;
			text-shadow: 0 0 0.25em rgb(255 106 0 / 0.5);
		}
	}

	main p {
		margin: 1.5rem 0 0;
		font-size: clamp(1.125rem, 2.5vw, 1.5rem);
		color: var(--muted);
	}

	footer {
		padding: 1.5rem 0;
		max-width: 61rem;
		width: calc(100% - 3rem);
		margin: 0 auto;
		border-top: 1px solid #222;
		font-size: 0.8125rem;
		color: var(--muted);
	}

	footer p {
		margin: 0.25rem 0;
	}

	footer a {
		color: var(--orange);
		text-decoration: none;
	}

	footer a:hover {
		text-decoration: underline;
	}
</style>
