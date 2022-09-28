<script lang="ts">
	import { browser } from "$app/environment"
	import { page } from "$app/stores"
	import { api } from "$lib/api"
	import AnimatedPage from "$lib/components/AnimatedPage.svelte"
	import Button from "$lib/components/Button.svelte"
	import Editor from "$lib/components/Editor.svelte"
	import EditorProblem, {
		EditorMode,
	} from "$lib/components/EditorProblem.svelte"
	import Select from "$lib/components/Select.svelte"
	import { logger } from "$lib/stores/toast"
	import { Language } from "$lib/types/Problem"
	import { onMount } from "svelte"
	import { useGetRestApi } from "$lib/useApi"
	import type { Submitment, UserSubmitment } from "$lib/types/UserSubmitment"
	import { getApiErrorMessage } from "$lib/utils"
	//remove the default once done testing
	let problem = useGetRestApi(api.fetchProblem)
	$: {
		if (browser) {
			problem.fetch($page.params.problemId)
		}
	}
	let isSubmitting = false
	let userSubmitment: UserSubmitment = {
		code: "",
		language: Language.C,
		problemId: Number($page.params.problemId),
	}
	let userSubimtments = useGetRestApi<Submitment[]>(api.getJson, {
		onError: () => {
			logger.error("Errore nel caricamento dei tuoi risultati, sei loggato?")
		},
	})
	function fetchSubmitments() {
		userSubimtments.fetch(`problems/${$page.params.problemId}/submitments`)
	}
	onMount(() => fetchSubmitments())
	let currentMode: EditorMode = EditorMode.Prompt
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
					bind:code={userSubmitment.code}
					bind:language={userSubmitment.language}
				/>
			</div>
			<div class="column prompt-wrapper">
				<EditorProblem
					problem={$problem.data}
					bind:currentMode
					userSubmitments={$userSubimtments.data}
				/>
			</div>
			<div class="row bottom-wrapper space-between">
				<div class="row-centered">
					Linguaggio
					<Select
						style="margin-left: 1rem"
						bind:value={userSubmitment.language}
					>
						{#each $problem.data.languages ?? [] as language (language)}
							<option value={language}>{language}</option>
						{/each}
					</Select>
				</div>
				<Button
					fancy
					disabled={isSubmitting}
					on:click={async () => {
						isSubmitting = true
						const res = await api.submitSubmitment(userSubmitment)
						isSubmitting = false
						if (res.ok) {
							currentMode = EditorMode.Submitment
						} else {
							logger.error(getApiErrorMessage(res.errorData))
						}
						fetchSubmitments()
					}}
				>
					{isSubmitting ? "controllo in corso..." : "Invia"}
				</Button>
			</div>
		</div>
	{/if}
</AnimatedPage>

<style lang="scss">
	.problem-grid {
		display: grid;
		height: 100vh;
		width: 100%;
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
			height: unset;
			flex-direction: column;
		}
	}
	.editor-wrapper {
		display: flex;
		flex: 1;
		grid-area: e;
		@media (max-width: 920px) {
			flex: unset;
			height: 70vh;
		}
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
