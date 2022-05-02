<script lang="ts">
	import Button from "smelte/src/components/Button/Button.svelte";

	import { decodeMulti } from "@msgpack/msgpack";

	import { decrypt } from "utils/crypt";

	interface IPrelude {
		encrypted: boolean;
		header_start: number;
		header_size: number;
	}

	interface IArtifact {
		path: string;
		size: 20;
		start: 0;
	}

	let imgsrc = "";
	let preamble: IPrelude | null = null;
	let header: IArtifact[] = [];
	let currentIndex = 0;

	let fileVar: any;
	let view: Uint8Array | null = null;
	$: {
		let file = fileVar && fileVar[0];
		if (file) {
			fileVar = null;
			const reader = new FileReader();
			reader.onload = (e) => {
				let buffer = e.target.result as ArrayBuffer;
				view = new Uint8Array(buffer);
				decodeView(view);
			};
			reader.readAsArrayBuffer(file);
		}
	}

	let fileInput: HTMLElement;
	function doImport() {
		fileInput.click();
	}

	function decodeView() {
		const MAX_PREAMBLE_LENGTH = 100;
		let preamble_bytes = Array.from(
			view.slice(view.length - MAX_PREAMBLE_LENGTH)
		).reverse();

		// Get the preamble
		// We use decodeMulti since we're not actually sure how big the header is going to be
		preamble = decodeMulti(Uint8Array.from(preamble_bytes)).next()
			.value as IPrelude;

		// Get the header
		let header_bytes = view.slice(
			preamble.header_start,
			preamble.header_start + preamble.header_size
		);
		if (preamble.encrypted) {
			decrypt(header_bytes);
		}
		header = decodeMulti(Uint8Array.from(header_bytes)).next()
			.value as IArtifact[];

		showFirst();
	}

	function showCurrent() {
		if (!preamble) {
			console.log("no preamble");
			return;
		}

		// Decode single file
		let file = header[currentIndex];
		let file_bytes = view.slice(file.start, file.start + file.size);
		if (preamble.encrypted) {
			decrypt(file_bytes);
		}

		// Convert to a string
		let base64Url = window.btoa(
			file_bytes.reduce(
				(acc, current) => acc + String.fromCharCode(current),
				""
			)
		);

		// encode to base64
		imgsrc = `data:image/png;base64,${base64Url}`;
	}

	function showFirst() {
		currentIndex = 0;
		showCurrent();
	}

	function showPrevious() {
		if (currentIndex > 0) {
			currentIndex -= 1;
			showCurrent();
		}
	}

	function showNext() {
		if (currentIndex < header.length - 1) {
			currentIndex += 1;
			showCurrent();
		}
	}

	function handleImageClick(e: MouseEvent) {
		let width = document.body.clientWidth / 2;
		if (e.clientX < width) {
			showPrevious();
		} else {
			showNext();
		}
	}
</script>

{#if !view}
	<input
		bind:this={fileInput}
		class="hidden"
		type="file"
		bind:files={fileVar}
		accept=".adump"
	/>

	<div class="button-container">
		<!-- <Button on:click={showPrevious}>Previous</Button> -->
		<Button class="big-button" on:click={doImport}>Open</Button>
		<!-- <Button on:click={showNext}>Next</Button> -->
	</div>
{:else}
	<div class="overlay" on:click={(e) => handleImageClick(e)} />

	<img src={imgsrc} />
{/if}

<style lang="scss">
	.overlay {
		z-index: 1000;
		width: 100vw;
		height: 100vh;
		position: fixed;
		left: 0;
		top: 0;
	}
	img {
		width: auto;
		max-width: 100%;
		max-height: 100vh;
		margin: auto;
	}

	.button-container {
		display: flex;
		justify-content: space-between;
		width: 100vw;
		height: 100vh;
	}

	:global(.button-container > *) {
		flex-grow: 1;
	}
</style>
