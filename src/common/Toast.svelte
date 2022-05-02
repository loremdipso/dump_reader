<script context="module">
	import { notificationQueue } from "smelte/src";

	export const toaster = notificationQueue();
</script>

<script>
	import Snackbar from "smelte/src/components/Snackbar";

	export let color = "alert";

	export let queue = toaster;
	let message;
	let item;
	let ts;

	$: {
		if (!item) {
			item = $queue[0];
		}

		if (typeof item === "string") {
			message = item;
		} else if (item) {
			message = item.toString();
			color = item.color;
			ts = item.ts;
		}
	}
</script>

<Snackbar
	value={ts}
	hash={ts}
	top
	{color}
	{...item}
	on:finish={() => {
		queue.remove($queue.indexOf(item));
		item = false;
	}}
>
	{message}
</Snackbar>
