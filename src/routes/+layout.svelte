<script>
	import RouteLoadingBar from "$lib/components/RouteLoadingBar.svelte"
	import ThemeProvider from "$lib/components/ThemeProvider.svelte"
	import "./global.css"
</script>

<ThemeProvider>
	<RouteLoadingBar>
		<slot />
	</RouteLoadingBar>
</ThemeProvider>

<style>
	:global(body) {
		background-color: var(--background);
		color: var(--background-text);
	}
</style>
