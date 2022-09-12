<script lang="ts">
	import { theme } from "$lib/stores/theme"
</script>

{@html `<${"style"}>:root {${
    $theme.toArray().map((v) => 
    `
        --${v.css}: ${v.value};
        --${v.css}-text: ${v.text};
    `.trim()).join("")}
} </${"style"}> `}

<slot />
