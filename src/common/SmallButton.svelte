<script lang="ts">
	import { createEventDispatcher } from "svelte";
	let dispatch = createEventDispatcher();

	import Button from "smelte/src/components/Button";

	export let disabled: boolean = false;
	export let reverse: boolean = false;
	export let classes: string = "";
	export let color: string;
	export let icon: string;
	export let title: string;

	$: baseClasses = `m-1 px-3 py-2 small-button-vertical-padding ${classes}`;
	$: finalClasses = reverse
		? `${baseClasses} flex flex-row-reverse`
		: baseClasses;
</script>

<Button
	classes={finalClasses}
	{disabled}
	{color}
	remove="p-4"
	{icon}
	{title}
	on:click={() => dispatch("click")}
>
	{title}
</Button>

<style lang="scss">
	:global(.small-button-vertical-padding) {
		$padding: 0.5rem;
		padding-top: $padding;
		padding-bottom: $padding;
	}
</style>
