<script lang="ts">
	import favicon from '#lib/assets/favicon.svg';
	import type { LayoutProps } from './$types';

	let { children }: LayoutProps = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	<meta name="theme-color" content="#000000" />
</svelte:head>

{@render children()}

<style>
	@font-face {
		font-family: 'VCR OSD Mono';
		font-display: swap;
		src:
			url('/fonts/VCR_OSD_MONO.woff') format('woff'),
			url('/fonts/VCR_OSD_MONO.ttf') format('truetype');
	}

	:global(:root) {
		--orange: #ff6a00;
		--muted: #8a8a8a;
		color-scheme: dark;
	}

	:global(body) {
		margin: 0;
		min-height: 100vh;
		min-height: 100dvh;
		display: flex;
		flex-direction: column;
		background: #000;
		color: #fff;
		font-family: 'VCR OSD Mono', ui-monospace, monospace;
		-webkit-font-smoothing: antialiased;
	}
</style>
