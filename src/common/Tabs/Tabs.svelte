<script lang="ts">
	import TabButton from "./TabButton.svelte";
	import type { IItem } from "./interfaces";

	export let selected = null;
	export let items: IItem[] = [];

	// export let tabbuttonclasses = (i) => i;

	const classesDefault =
		"flex w-full y-0 h-full items-center relative mx-auto";

	export let classes = classesDefault;
</script>

<div class={classes}>
	{#each items as item, i}
		<TabButton bind:selected itemId={item.id} itemText={item.text}>
			{item.text}
		</TabButton>
	{/each}
</div>

<slot {selected} name="content" />
