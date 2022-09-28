<script lang="ts">
	import { Language } from "$lib/types/Problem"
	import InlineSVG from "svelte-inline-svg"
	import MdTextFields from "svelte-icons/md/MdTextFields.svelte"
	export let language: Language
	export let style: string = ""

	const svgMap = {
		[Language.C]: "c",
		[Language.Cpp]: "cpp",
		[Language.Python]: "python",
		[Language.Java]: "java",
		[Language.Plain]: "plain",
	}
</script>

{#if language === Language.Plain}
	<div style="width: 1em; height: 1em">
		<MdTextFields />
	</div>
{:else}
	<InlineSVG src={`icons/${svgMap[language]}.svg`} {style} />
{/if}
