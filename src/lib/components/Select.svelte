<script lang="ts">
	export let style: string = ""
	export let cssVar: string = "primary"
	export let value: string
</script>

<select
	style={`background-color: var(--${cssVar}); color: var(--${cssVar}-text); ${style}`}
	bind:value
	on:change
	class="select"
>
	<slot />
</select>

<style>
	.select {
		padding: 0.6rem 1rem;
		border: none;
		width: fit-content;
		height: fit-content;
		border-radius: 0.4rem;
		cursor: pointer;
		transition: all 0.2s;
		-webkit-appearance: auto;
	}
</style>
