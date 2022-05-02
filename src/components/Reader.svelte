<script lang="ts">
	import { decodeMulti } from "@msgpack/msgpack";

	export let view: Uint8Array|null;

	interface IPrelude {
		encrypted: boolean;
		header_start: number;
		header_size: number;
	};

	interface IArtifact {
		path: string;
		size: 20;
		start: 0;
	};

	$: {
		if (view) {
			const MAX_PREAMBLE_LENGTH = 100;
			let preamble_bytes = Array.from(view.slice(view.length - MAX_PREAMBLE_LENGTH)).reverse();

			// Get the prelude
			// We use decodeMulti since we're not actually sure how big the header is going to be
			let prelude = decodeMulti(Uint8Array.from(preamble_bytes)).next().value as IPrelude;
			console.log(prelude);


			// Get the header
			let header_bytes = view.slice(prelude.header_start, prelude.header_start + prelude.header_size);
			let header = decodeMulti(Uint8Array.from(header_bytes)).next().value as IArtifact[];

			// Decode single file
			let file = header[0];
			let file_bytes = view.slice(file.start, file.start + file.size);

			// Convert to a string
			let str = String.fromCharCode.apply(null, file_bytes);
			console.log(str);
		}
	};
</script>

<style lang="scss">
</style>
