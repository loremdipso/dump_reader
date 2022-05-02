<script lang="ts">
	import { onMount } from "svelte";
	onMount(() => {
		// force-reset scroll top, since for some reason browsers remember this
		document.body.scrollTop = 0;
	});

	import Reader from "./components/Reader.svelte";
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
	<!--
	<header class="relative slide-in-from-top bg-primary-300 dark:bg-black flex flex-wrap h-16 items-center justify-center left-0 p-0 shadow top-0 w-full z-20">
		<h6 class="select-none pl-3 tracking-widest text-lg">
			<a href="." class="text-white">Hello world!</a>
		</h6>
	</header>
	-->

	<Reader />
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
