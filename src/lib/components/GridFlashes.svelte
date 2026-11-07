<script lang="ts">
	import { onMount } from 'svelte';

	// Streaks of light that run along random lines of the HUD grid. Line positions follow the grid's
	// layout in layout.css (48px cells, background-position: center).
	const cell = 48;
	const boot = 1600;

	type Flash = { id: number; axis: 'x' | 'y'; at: number; length: number; ms: number };

	let host: HTMLDivElement;
	let flashes = $state<Flash[]>([]);
	let next = 0;

	function spawn() {
		const { width, height } = host.getBoundingClientRect();
		const axis = Math.random() < 0.5 ? 'x' : 'y';
		const span = axis === 'x' ? width : height;
		// Lines sit at (span - cell) / 2 + k * cell; pick one inside the inner 70%, where the grid shows.
		const first = (span - cell) / 2 - Math.floor((span * 0.35) / cell) * cell;
		const count = Math.floor((span * 0.7) / cell);
		const at = first + Math.floor(Math.random() * (count + 1)) * cell;
		const along = axis === 'x' ? height : width;
		flashes.push({
			id: next++,
			axis,
			at,
			length: 140 + Math.random() * 160,
			ms: Math.max(900, along * (1.2 + Math.random() * 1.2))
		});
	}

	function done(id: number) {
		flashes = flashes.filter((f) => f.id !== id);
	}

	onMount(() => {
		if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
		let timer: ReturnType<typeof setTimeout>;
		const loop = () => {
			if (!document.hidden) spawn();
			timer = setTimeout(loop, 700 + Math.random() * 1800);
		};
		timer = setTimeout(loop, boot);
		return () => clearTimeout(timer);
	});
</script>

<div bind:this={host} class="absolute inset-0 overflow-hidden">
	{#each flashes as f (f.id)}
		<span
			class="grid-flash {f.axis === 'x' ? 'grid-flash-x' : 'grid-flash-y'}"
			style="--at: {f.at}px; --len: {f.length}px; --ms: {f.ms}ms"
			onanimationend={() => done(f.id)}
		></span>
	{/each}
</div>
