<script lang="ts">
	import './layout.css';
	import type { LayoutProps } from './$types';

	let { children }: LayoutProps = $props();
</script>

<svelte:head>
	<link rel="icon" href="/favicon.ico" sizes="32x32" />
	<link rel="icon" href="/favicon.svg" type="image/svg+xml" />
	<link rel="apple-touch-icon" href="/apple-touch-icon.png" />
	<meta name="theme-color" content="#000000" />
	<link
		rel="preload"
		href="/fonts/VCR_OSD_MONO.woff"
		as="font"
		type="font/woff"
		crossorigin="anonymous"
	/>
	<link rel="describedby" href="/llms.txt" type="text/markdown" />
</svelte:head>

{@render children()}
