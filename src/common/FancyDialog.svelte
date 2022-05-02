<script lang="ts">
	import Dialog from "smelte/src/components/Dialog";

	export let showDialog = false;
	export let small = false;
</script>

<Dialog bind:value={showDialog} classes={(c) => c + " m-2"}>
	<slot name="title" slot="title" />

	<div class="dialog-content{small ? ' small' : ''}">
		<slot />
	</div>

	<slot name="actions" slot="actions" />
</Dialog>

<style lang="scss">
	.dialog-content {
		max-height: 80vh;
		max-width: 80vw;
		overflow: auto;

		&.small {
			max-width: 30rem;
		}

		> :global(p) {
			padding-bottom: 0.5rem;
		}
	}
</style>
