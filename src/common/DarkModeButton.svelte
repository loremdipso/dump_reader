<script lang="ts">
	import Button from "smelte/src/components/Button";
	import dark from "smelte/src/dark";

	export let classes: string = "";

	const darkMode = dark();
	let icon: "dark_mode" | "light_mode";
	function setIcon(value: boolean) {
		if (value) {
			icon = "light_mode";
		} else {
			icon = "dark_mode";
		}
	}
	setIcon(true);

	darkMode.subscribe((value) => {
		setIcon(value);
	});
</script>

<Button
	bind:value={$darkMode}
	{icon}
	small
	title="Toggle dark mode"
	{classes}
/>
