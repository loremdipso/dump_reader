<script lang="ts">
	import {Archive} from 'libarchive.js/main.js';
	import Button from "smelte/src/components/Button/Button.svelte";
	import TextField from "smelte/src/components/TextField/TextField.svelte";

	Archive.init({
		workerUrl: 'libarchive.js/dist/worker-bundle.js'
	});

	let imgsrc = "";
	let currentIndex = 0;

	interface FileEntry {
		name: string;
		file: File;
	};

	let files: FileEntry[];

	let password: string = "";

	let fileVar: any;
	$: {
		let file = fileVar && fileVar[0];
		if (file) {
			openArchiveFile(file);
		}
	}

	let fileInput: HTMLElement;
	function doImport() {
		fileInput.click();
	}

	async function openArchiveFile(file: File) {
		const archive = await Archive.open(file);
		await archive.usePassword(password);
		let obj = await archive.extractFiles();
		console.log({obj});

		files = parseObj(obj);
		files.sort((a, b) => a.name > b.name ? 1 : -1);
		console.log(files);
		showFirst();
	}

	function parseObj(obj: any): FileEntry[] {
		let files: FileEntry[] = [];

		for (const key in obj) {
			const value = obj[key];
			if (value instanceof File) {
				files.push({name: key, file: value});
			} else {
				files = files.concat(parseObj(value));
			}
		}

		return files;
	}

	async function showCurrent() {
		console.log(`showing ${currentIndex}`);

		let file = files[currentIndex];
		const reader = new FileReader();
		reader.readAsDataURL(file.file);
		reader.onload = () => {
			imgsrc = reader.result as string;
		};
	}

	function showFirst() {
		currentIndex = 0;
		showCurrent();
	}

	function showPrevious() {
		console.log("showing previous");
		if (currentIndex > 0) {
			currentIndex -= 1;
			showCurrent();
		}
	}

	function showNext() {
		console.log("showing next");
		if (currentIndex < files.length - 1) {
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

{#if files}
	<div class="overlay" on:click={(e) => handleImageClick(e)} />

	<img src={imgsrc} alt="idk" />
{:else}
	<input
		bind:this={fileInput}
		class="hidden"
		type="file"
		bind:files={fileVar}
		accept=".zip"
	/>

	<div class="button-container">
		<TextField label="secrets" class="" bind:value={password} />
		<Button class="big-button" on:click={doImport}>Open</Button>
	</div>
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
		flex-direction: column;
		justify-content: space-between;
		width: 100vw;
		height: 100vh;
	}

	:global(.button-container > :last-child) {
		flex-grow: 1;
	}
</style>
