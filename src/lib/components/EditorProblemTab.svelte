<script lang="ts">
	import { fly } from "svelte/transition"
</script>

<div
	class="column"
	in:fly={{ y: -10, duration: 300, opacity: 0 }}
>
	<slot />
</div>
