<script lang="ts">
	import { fly, type FlyParams } from "svelte/transition"
	export const flyParams: FlyParams = { x: -50, duration: 500 }
	export const style: string = ''
</script>

<div 
	class="page cropped" 
	in:fly={flyParams}
	{style}
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
