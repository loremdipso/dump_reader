<script lang="ts">
	export let selected = null;
	export let itemText: string;
	export let itemId: string;
	export let classes: string = "p-3 flex-grow";

	export let selectedColor = "bg-white text-black";
	export let notSelectedColor = "bg-black text-white";

	$: color = selected === itemId ? selectedColor : notSelectedColor;

	function doSelect() {
		selected = itemId;
	}
</script>

<button class="{classes} {color}" on:click={() => doSelect()}>
	{itemText}
</button>
