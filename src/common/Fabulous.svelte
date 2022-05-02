<script lang="ts">
	import { fadeScale } from "./transitions";
	import { onMount } from "svelte";

	type IPosition = "bottomRight" | "bottomLeft";
	export let position: IPosition = "bottomRight";

	let baseClasses = "fixed bottom-0 mb-1 mr-1 z-20 py-2 px-2 flex flex-col ";
	$: classes =
		baseClasses + (position === "bottomRight" ? `right-1` : "left-0");

	let ready = false;
	onMount(() => (ready = true));
</script>

<!-- Hack to get animations to work on page load -->
{#if ready}
	<div
		class={classes}
		in:fadeScale={{
			delay: 250,
			duration: 800,
			baseScale: 0.5,
		}}
	>
		<slot />
	</div>
{/if}
