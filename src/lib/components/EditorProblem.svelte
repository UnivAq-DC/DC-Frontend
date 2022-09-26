<script lang="ts" context="module">
	export enum EditorMode {
		Prompt = "prompt",
		Submissions = "submission",
	}
</script>

<script lang="ts">
	import type { Problem } from "$lib/types/Problem"
	import SvelteMarkdown from 'svelte-markdown'
	import EditorProblemTab from "./EditorProblemTab.svelte"
	import TabSelector from "./TabSelector.svelte"
	export let problem: Problem
	export let currentMode: EditorMode = EditorMode.Prompt
</script>

<div class="column editor-problem">
	<div class="column tabs-wrapper">
		<div class="row tabs-header">
			<TabSelector
				selected={currentMode === EditorMode.Prompt}
				on:click={() => (currentMode = EditorMode.Prompt)}
			>
				Prompt
			</TabSelector>
			<TabSelector
				selected={currentMode === EditorMode.Submissions}
				on:click={() => (currentMode = EditorMode.Submissions)}
			>
				Risultati
			</TabSelector>
		</div>
		<div
			class="tab-wrapper"
			style={currentMode === EditorMode.Prompt
				? "border-top-left-radius: 0"
				: ""}
		>
			{#if currentMode === EditorMode.Prompt}
				<EditorProblemTab>
					<h2>
						{problem.name}
					</h2>
					<div class="markdown-wrapper">
						<SvelteMarkdown source={problem.attachment} />
					</div>
				</EditorProblemTab>
			{/if}
			{#if currentMode === EditorMode.Submissions}
				<EditorProblemTab>
					<h2>
						I tuoi risultati
					</h2>

				</EditorProblemTab>
			{/if}
		</div>
	</div>
</div>

<style lang="scss">
	.editor-problem {
		min-width: 25rem;
		flex: 1;
	}
	.tabs-wrapper {
		display: flex;
		flex: 1;
        overflow-y: auto;
	}
	.tab-wrapper {
		flex: 1;
		padding: 1rem;
		background-color: var(--primary);
		border-radius: 0.4rem;
		color: var(--primary-text);
	}
	.markdown-wrapper {
		margin-top: 0.6rem;
		padding: 0.6rem;
		background-color: var(--background-flip);
		color: var(--background-flip-text);
		border-radius: 0.3rem;
		min-height: 5rem;
	}
	.tabs-header {
	}
</style>
