<script lang="ts">
	import { fly, type FlyParams } from "svelte/transition"
	export let flyParams: FlyParams = { x: -50, duration: 500 }
	export let centered = false
	export let style: string = ""
	export let cropped: boolean = false
</script>

<div
	class="page"
	in:fly={flyParams}
	class:cropped
	style={(centered ? "justify-content: center;" : "") + style}
>
	<div class="column page-content" class:cropped>
		<slot />
	</div>
</div>

<style lang="scss">
	.page {
		display: flex;
		flex: 1;
		flex-direction: column;
		width: 100%;
		overflow-y: auto;
		overflow-x: hidden;

	}
	.page-content {
		flex: 1;
		&.cropped {
			align-self: center;
			max-width: 50rem;
			width: 100%;
			@media (max-width: 800px) {
				padding: 1rem;
			}
		}
	}
</style>
