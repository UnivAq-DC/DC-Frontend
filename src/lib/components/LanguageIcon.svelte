<script lang="ts">
	import { Language } from "$lib/types/Project"
	import InlineSVG from "svelte-inline-svg"
	export let language: Language
	export let style: string = ""

	const svgMap = {
		[Language.C]: "c",
		[Language.Cpp]: "cpp",
		[Language.Python]: "python",
	}
</script>

<InlineSVG src={`icons/${svgMap[language]}.svg`} {style} />
