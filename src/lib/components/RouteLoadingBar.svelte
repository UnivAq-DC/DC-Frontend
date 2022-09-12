<script type="ts">
	import { beforeNavigate, afterNavigate } from "$app/navigation"
	import { fly } from "svelte/transition"
	export let refresh = ""
	let status = ""
	let timeout = setTimeout(() => {}, 0)
	beforeNavigate(() => {
		status = "progress-70"
	})
	afterNavigate(() => {
		status = "progress-finish"
		clearTimeout(timeout)
		timeout = setTimeout(() => {
			status = ""
		}, 200)
	})
</script>

{#key refresh}
	<div 
        class={`progress ${status}`} 
    />
	<slot />
{/key}

<style lang="scss">
	.progress {
		height: 0.3rem;
		width: 0%;
		background-color: var(--accent-3);
		position: absolute;
        border-radius: 0.6rem;
		z-index: 1000;
	}
	.progress-70 {
		width: 70%;
		transition: all 1s;
		background-color: var(--accent);
	}
	.progress-finish {
		width: 100%;
		background-color: var(--accent);
	}
</style>
