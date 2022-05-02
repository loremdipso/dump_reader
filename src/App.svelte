<script lang="ts">
	import { onMount } from "svelte";
	onMount(() => {
		// force-reset scroll top, since for some reason browsers remember this
		document.body.scrollTop = 0;
	});

	import Button from "smelte/src/components/Button/Button.svelte";

	/* import GithubCorner from "./common/GithubCorner.svelte"; */

	import Reader from "./components/Reader.svelte";

	let fileVar: any;
	let view: Uint8Array|null = null;
	$: {
		let file = fileVar && fileVar[0];
		if (file) {
			fileVar = null;
			const reader = new FileReader();
			reader.onload = (e) => {
				let buffer = e.target.result as ArrayBuffer;
				view = new Uint8Array(buffer);
			};
			reader.readAsArrayBuffer(file);
		}
	}

	let fileInput: HTMLElement;
	function doImport() {
		fileInput.click();
	}
</script>

<svelte:head>
	<!-- Material Icons -->
	<link
		rel="stylesheet"
		href="https://fonts.googleapis.com/icon?family=Material+Icons"
	/>
	<!-- Roboto -->
	<link
		rel="stylesheet"
		href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,600,700"
	/>
	<!-- Roboto Mono -->
	<link
		rel="stylesheet"
		href="https://fonts.googleapis.com/css?family=Roboto+Mono"
	/>
</svelte:head>

<main class="pb-32 fade-in">
	<header class="relative slide-in-from-top bg-primary-300 dark:bg-black flex flex-wrap h-16 items-center justify-center left-0 p-0 shadow top-0 w-full z-20">
		<h6 class="select-none pl-3 tracking-widest text-lg">
			<a href="." class="text-white">Hello world!</a>
		</h6>

		<!--
		<GithubCorner
			href="https://github.com/loremdipso/dump_reader"
			position="topRight"
			small
		/>
		-->


<input
		bind:this={fileInput}
		class="hidden"
		type="file"
		bind:files={fileVar}
		accept=".adump"
		/>

		<Button on:click={doImport}>Open</Button>
	</header>

	<Reader {view} />
</main>

<style lang="scss">
	:global(html) {
		height: 100vh;
		overflow: hidden;
	}

	:global(body) {
		height: 100%;
		overflow-y: auto;
		overflow-x: auto;
	}

	:global(a) {
		/* TODO: figure out why this doesn't work */
		/* @apply text-blue-200; */
		color: rgba(29, 142, 241, 1);
	}

	.slide-in-from-top {
		animation: 300ms cubic-bezier(0.17, 0.04, 0.03, 0.94) 0s 1 SlideDown;
	}
	@keyframes SlideDown {
		0% {
			transform: translate3d(0, -100%, 0);
		}
		100% {
			transform: translateZ(0);
		}
	}

	.fade-in {
		animation: 1s ease-out 0s 1 FadeIn;
	}
	@keyframes FadeIn {
		0% {
			opacity: 0;
		}
		100% {
			opacity: 1;
		}
	}
</style>
