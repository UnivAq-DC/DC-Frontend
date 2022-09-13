<script lang="ts">
	import { fly, type FlyParams } from "svelte/transition"
	export let flyParams: FlyParams = { x: -50, duration: 500 }
	export let centered = false
	export let style: string = ''
	export let cropped: boolean = false
</script>

<div 
	class="page" 
	in:fly={flyParams}
	class:cropped={cropped}
	style={(centered ? 'justify-content: center;' : '') + style}
>
	<slot />
</div>

<style>
	.page {
		display: flex;
		flex: 1;
		flex-direction: column;
		width: 100%;
	}
	.cropped {
		padding: 1rem 22vw;
	}
	@media (max-width: 800px) {
		.cropped {
			padding: 1rem;
		}
	}
</style>
