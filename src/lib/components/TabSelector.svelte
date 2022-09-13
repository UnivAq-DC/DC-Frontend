<script lang="ts">
	export let selected: boolean
</script>

<button class="tab-selector" on:click class:selected>
	<slot />
</button>

<style lang="scss">
	.tab-selector {
		padding: 0.6rem 1rem;
		font-size: 1rem;
		border: none;
		border-top-left-radius: 0.4rem;
		border-top-right-radius: 0.4rem;
		background-color: var(--background);
		color: var(--background-text);
        transition: 0.3s all;
		cursor: pointer;
		&:hover:not(.selected) {
			filter: brightness(1.2);
		}
		&.selected {
			background-color: var(--primary);
			color: var(--primary-text);
		}
	}
</style>
