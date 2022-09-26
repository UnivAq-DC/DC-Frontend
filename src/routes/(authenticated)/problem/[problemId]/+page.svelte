<script lang="ts">
	import { browser } from "$app/environment"
	import { page } from "$app/stores"
	import { api } from "$lib/api"
	import AnimatedPage from "$lib/components/AnimatedPage.svelte"
	import Button from "$lib/components/Button.svelte"
	import Editor from "$lib/components/Editor.svelte"
	import EditorProblem from "$lib/components/EditorProblem.svelte"
	import Select from "$lib/components/Select.svelte"
	import { Language, type Problem } from "$lib/types/Problem"
	import { useGetApi, useGetRestApi } from "$lib/useApi"
	import type { UserSubmission } from "$types/UserSubmission"
	//remove the default once done testing
	let problem = useGetRestApi(api.fetchProblem)
	$: {
		if (browser) {
			problem.fetch($page.params.problemId)
		}
	}

	let userSubmission: UserSubmission = {
		code: "",
		language: Language.C,
	}
</script>

<AnimatedPage style="position:relative;">
	{#if $problem.loading}
		<div class="loading">Loading problem...</div>
	{:else if $problem.error || !$problem.data}
		<div class="error">Error: {$problem.error}</div>
	{:else}
		<div class="problem-grid">
			<div class="editor-wrapper">
				<Editor
					bind:code={userSubmission.code}
					bind:language={userSubmission.language}
				/>
			</div>
			<div class="column prompt-wrapper">
				<EditorProblem problem={$problem.data} />
			</div>
			<div class="row bottom-wrapper space-between">
				<div class="row-centered">
					Linguaggio
					<Select
						style="margin-left: 1rem"
						bind:value={userSubmission.language}
					>
						<!--
						{#each problem.languages as language (language)}
							<option value={language}>{language}</option>
						{/each}
						-->
					</Select>
				</div>
				<Button fancy>Invia</Button>
			</div>
		</div>
	{/if}
</AnimatedPage>

<style lang="scss">
	.problem-grid {
		display: grid;
		flex: 1;
		padding: 1rem;
		grid-template-columns: 1fr 1fr min-content;
		grid-template-rows: 1fr 1fr min-content;
		grid-template-areas:
			"e e p"
			"e e p"
			"b b p";
		gap: 1rem;
		@media (max-width: 920px) {
			display: flex;
			flex-direction: column;
		}
	}
	.editor-wrapper {
		display: flex;
		flex: 1;
		grid-area: e;
	}
	.prompt-wrapper {
		grid-area: p;
	}
	.bottom-wrapper {
		grid-area: b;
		gap: 1rem;
		height: fit-content;
	}
	.loading {
		display: flex;
		justify-content: center;
		align-items: center;
		font-size: 1.4rem;
		flex: 1;
	}
	.error {
		color: var(--red);
		margin: 1rem;
	}
</style>
