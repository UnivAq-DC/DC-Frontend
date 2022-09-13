<script lang="ts">
	export let selected: boolean = false
</script>

<div class="menu-icon" class:selected>
	<slot />
</div>

<style lang="scss">
	.menu-icon {
		padding: 0.7rem;
		width: 2.6rem;
		height: 2.6rem;
		cursor: pointer;
		background-color: var(--primary);
		color: var(--primary-text);
		border-radius: 0.4rem;
        transition: all 0.2s;
		&:hover {
			transform: translate(-0.1rem, -0.1rem);
			box-shadow: 0.2rem 0.2rem 0 var(--accent);
		}
	}
	.selected {
		background-color: var(--accent);
		color: var(--accent-text);
	}
</style>
