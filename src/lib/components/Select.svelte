<script lang="ts">
	export let style: string = ""
	export let cssVar: string = "primary"
</script>

<select
	style={`background-color: var(--${cssVar}); color: var(--${cssVar}-text); ${style}`}
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
	}
</style>
