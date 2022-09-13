<script>
	import RouteLoadingBar from "$lib/components/RouteLoadingBar.svelte"
	import ThemeProvider from "$lib/components/ThemeProvider.svelte"
import ToastLogger from "$lib/components/ToastLogger.svelte"
	import "./global.css"
</script>

<ToastLogger />
<ThemeProvider>
	<RouteLoadingBar>
		<slot />
	</RouteLoadingBar>
</ThemeProvider>

