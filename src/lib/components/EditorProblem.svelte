<script lang="ts" context="module">
	export enum EditorMode {
		Prompt = "prompt",
		Submitment = "submitment",
	}
</script>

<script lang="ts">
	import type { Problem } from "$lib/types/Problem"
	import SvelteMarkdown from "svelte-markdown"
	import Testcase from "./Testcase.svelte"
	import EditorProblemTab from "./EditorProblemTab.svelte"
	import TabSelector from "./TabSelector.svelte"
	import type { Submitment } from "$lib/types/UserSubmitment"
	import UserSubmitmentResult from "./UserSubmitmentResult.svelte"
	export let problem: Problem
	export let currentMode: EditorMode = EditorMode.Prompt
	export let userSubmitments: Submitment[] | null = []
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
				selected={currentMode === EditorMode.Submitment}
				on:click={() => (currentMode = EditorMode.Submitment)}
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
					{#if problem.testcaseList}
						<div class="testcases-wrapper column">
							<h2>Esempi</h2>
							{#each problem.testcaseList as testcase}
								<Testcase {testcase} />
							{/each}
						</div>
					{/if}
				</EditorProblemTab>
			{/if}
			{#if currentMode === EditorMode.Submitment}
				<EditorProblemTab>
					<h2 style="margin-bottom: 0.5rem">I tuoi risultati</h2>
					{#if userSubmitments === null}
						Caricamento...
					{:else if userSubmitments.length === 0}
						<div class="no-submitments">Non hai ancora inviato nulla</div>
					{:else}
						<div class="submitments-wrapper column">
							{#each userSubmitments as submitment}
								<UserSubmitmentResult {submitment} />
							{/each}
						</div>
					{/if}
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
		height: calc(100vh - 2rem);
		@media screen and (max-width: 800px) {
			height: unset;			
		}
	}
	.tab-wrapper {
		flex: 1;
		display: flex;
		overflow-y: auto;
		background-color: var(--primary);
		color: var(--primary-text);
		border-radius: 0.4rem;
	}
	.submitments-wrapper{
		gap: 0.5rem;
		padding-bottom: 0.8rem;
	}
	.markdown-wrapper {
		margin-top: 0.6rem;
		padding: 0.6rem;
		background-color: var(--background-flip);
		color: var(--background-flip-text);
		border-radius: 0.3rem;
		min-height: 5rem;
	}
	.testcases-wrapper {
		margin-top: auto;
		padding-top: 1rem;
		gap: 0.4rem;
	}
	.tabs-header {
	}
</style>
