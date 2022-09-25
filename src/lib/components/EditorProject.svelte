<script lang="ts" context="module">
	export enum EditorMode {
		Prompt = "prompt",
		Submissions = "submission",
	}
</script>

<script lang="ts">
	import type { IProject } from "$lib/types/Project"
	import { Viewer } from "bytemd"
	import EditorProjectTab from "./EditorProjectTab.svelte"
	import TabSelector from "./TabSelector.svelte"
	export let project: IProject
	export let currentMode: EditorMode = EditorMode.Prompt
</script>

<div class="column editor-project">
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
				<EditorProjectTab>
					<h2>
						{project.title}
					</h2>
					<div class="markdown-wrapper">
						<Viewer value={project.markdown} />
					</div>
				</EditorProjectTab>
			{/if}
			{#if currentMode === EditorMode.Submissions}
				<EditorProjectTab>
					<h2>
						I tuoi risultati
					</h2>

				</EditorProjectTab>
			{/if}
		</div>
	</div>
</div>

<style lang="scss">
	.editor-project {
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
