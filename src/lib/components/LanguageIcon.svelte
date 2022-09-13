<script lang="ts">
	import type { Language } from "src/types/Project"
	import InlineSVG from "svelte-inline-svg"
	export let language: Language
    export let style: string = ''
</script>

<InlineSVG src={language.toLowerCase()} {style}/>
