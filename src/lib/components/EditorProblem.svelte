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
	import Button from "./Button.svelte"
	import FaExternalLinkSquareAlt from "svelte-icons/fa/FaExternalLinkSquareAlt.svelte"
	import { isUrl } from "$lib/utils"
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
					<h2 class="problem-title">
						{problem.name}
					</h2>
					<div class="problem-description">
						{problem.description}
					</div>
					{#if isUrl(problem.attachment)}
						<div class="pdf-iframe-wrapper">
							<div class="pdf-iframe-controls row">
								<a href={problem.attachment} target="_blank">
									<Button
										style="width: 2rem; height:2rem; padding: 0.2rem"
										cssVar="primary"
									>
										<FaExternalLinkSquareAlt />
									</Button>
								</a>
							</div>
							<iframe
								class="pdf-iframe"
								title="pdf attachment"
								src={`${problem.attachment}#toolbar=0&view=FitH`}
							/>
						</div>
					{:else}
						<div class="markdown-wrapper">
							<SvelteMarkdown source={problem.attachment} />
						</div>
					{/if}
					{#if problem.testcaseList && problem.testcaseList.length > 0}
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
						<div class="no-submitments">Nessun risultato inviato</div>
					{:else}
						<div class="submitments-wrapper column">
							{#each userSubmitments as submitment}
								<UserSubmitmentResult {submitment} on:openCode />
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
		width: 40vw;
		min-width: 25rem;
		@media screen and (max-width: 920px) {
			min-width: unset;
			width: 100%;
		}
		flex: 1;
	}
	.pdf-iframe-wrapper {
		display: flex;
		flex: 1;
		margin-top: 0.8rem;
		position: relative;
	}
	.pdf-iframe-controls {
		position: absolute;
		top: 0;
		right: 1.1rem;
		padding: 0.2rem;
		opacity: 0.7;
		transition: all 0.3s;
	}
	.pdf-iframe-controls:hover {
		opacity: 1;
	}
	.pdf-iframe {
		display: flex;
		flex: 1;
		border-radius: 0.4rem;
		border: none;
		@media screen and (max-width: 920px) {
			height: 50vh;
		}
	}
	.problem-description {
		text-overflow: ellipsis;
		margin-top: 0.8rem;
		overflow: hidden;
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 4;
		font-size: 0.9rem;
	}
	.problem-title {
		border-bottom: solid 1px var(--secondary);
		padding-bottom: 0.4rem;
	}
	.tabs-wrapper {
		display: flex;
		height: calc(100vh - 2rem);
		@media screen and (max-width: 920px) {
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
	.submitments-wrapper {
		gap: 0.5rem;
		padding-bottom: 0.8rem;
	}
	.markdown-wrapper {
		margin-top: 1rem;
		font-size: 0.9rem;
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
	.no-submitments {
		margin: 1rem;
	}
</style>
