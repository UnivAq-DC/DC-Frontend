<script>
import { browser } from "$app/environment";

	import RouteLoadingBar from "$lib/components/RouteLoadingBar.svelte"
	import Menu from "$lib/components/SideMenu/Menu.svelte"
	import ThemeProvider from "$lib/components/ThemeProvider.svelte"
	import ToastLogger from "$lib/components/ToastLogger.svelte"
	import { Monaco } from "$lib/Monaco"
	import "./global.css"
	if(browser) Monaco.load()

</script>

<ToastLogger />
<ThemeProvider>
	<RouteLoadingBar>
		<div class="page-and-menu-layout">
			<Menu />
			<slot />
		</div>
	</RouteLoadingBar>
</ThemeProvider>

<style lang="scss">
	.page-and-menu-layout {
		display: flex;
		height: 100vh;
		position: relative;
		flex-direction: row;
		@media (max-width: 800px) {
			flex-direction: column;
		}
	}
</style>
