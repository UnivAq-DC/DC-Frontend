<script lang="ts">
	import MenuIcon from "./MenuIcon.svelte"
	import FaUser from "svelte-icons/fa/FaUser.svelte"
    import FaHome from 'svelte-icons/fa/FaHome.svelte'
import { theme } from "$lib/stores/theme";
</script>

<div class="side-menu" style={`background-color: ${$theme.get('primary').darken(0.2).hex()}`}>
    <a href="/">
        <MenuIcon>
            <FaHome />
        </MenuIcon>
    </a>
    <a href="/login">
        <MenuIcon>
            <FaUser />
        </MenuIcon>
    </a>
</div>
<style lang="scss">
	.side-menu {
        display: flex;
        flex-direction: column;
        padding: 0.5rem;
        background-color: var(--primary);
        gap: 0.6rem;
        @media (max-width: 800px) {
            flex-direction: row;
        }
	}
</style>
