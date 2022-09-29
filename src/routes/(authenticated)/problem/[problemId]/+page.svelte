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
	import { onDestroy, onMount } from "svelte"
	import { useGetRestApi } from "$lib/useApi"
	import type { Submitment } from "$lib/types/UserSubmitment"
	import FaDiceD20 from "svelte-icons/fa/FaDiceD20.svelte"
	import { getApiErrorMessage } from "$lib/utils"
	import { codeStorage } from "$lib/codeStorage"

	let code = ""
	let currentMode: EditorMode = EditorMode.Prompt
	let currentLanguage: Language = Language.Plain
	let problemId = Number($page.params.problemId)
	let isSubmitting = false
	let problem = useGetRestApi(api.fetchProblem, {
		onSuccess: (data) => {
			if (!data.isCoding) return
			currentLanguage = data.availableLanguages[0] ?? Language.C
		},
	})
	let userSubimtments = useGetRestApi<Submitment[]>(api.getJson, {
		onError: () => {
			logger.error("Errore nel caricamento dei tuoi risultati, sei loggato?")
		},
	})
	function fetchSubmitments() {
		userSubimtments.fetch(`problems/${$page.params.problemId}/submitments`)
	}
	async function getStoredCode(lang: Language, probId: number) {
		const stored = await codeStorage.getProblemCode(probId, lang)
		code = stored.problem?.code ?? stored.defaultOfLanguage
	}
	async function storeCurrentCode() {
		await codeStorage.storeProblemCode(problemId, currentLanguage, code)
	}
	$: if (browser) getStoredCode(currentLanguage, problemId)
	$: if (browser) problem.fetch($page.params.problemId)
	$: problemId = Number($page.params.problemId)
	onMount(() => fetchSubmitments())
	onDestroy(() => storeCurrentCode())
	
	function handleUnload(e: any) {
		if(import.meta.env.DEV) return
		storeCurrentCode()
		e.preventDefault
		e.returnValue = ""
		return false
	}

	let pageTitle = "Problema"
	$: pageTitle = $problem.data?.name ?? "Problema"
</script>

<svelte:window on:beforeunload={handleUnload} />
<svelte:head>
	<title>
		{pageTitle}
	</title>
</svelte:head>

<AnimatedPage style="position:relative;">
	{#if $problem.loading}
		<div class="loading">Caricamento del problema...</div>
	{:else if $problem.error || !$problem.data}
		<div class="error">Errore: {$problem.error}</div>
	{:else}
		<div class="problem-grid">
			<div class="editor-wrapper">
				<Editor bind:code language={currentLanguage} />
			</div>
			<div class="column prompt-wrapper">
				<EditorProblem
					problem={$problem.data}
					bind:currentMode
					userSubmitments={$userSubimtments.data}
					on:openCode={(c) => {
						code = c.detail
					}}
				/>
			</div>
			<div class="row bottom-wrapper space-between">
				<div class="row-centered">
					Linguaggio
					<Select
						style="margin-left: 1rem"
						value={currentLanguage}
						on:change={async (e) => {
							if (code.trim()) storeCurrentCode()
							currentLanguage = e.detail
						}}
					>
						{#each $problem.data.availableLanguages ?? [] as language (language)}
							<option value={language}>{language}</option>
						{/each}
					</Select>
				</div>
				<Button
					fancy
					disabled={isSubmitting}
					style="display:flex; perspective: 1000px;"
					on:click={async () => {
						isSubmitting = true
						storeCurrentCode()
						const res = await api.submitSubmitment({
							problemId,
							code,
							language: currentLanguage,
							isCode: $problem.data?.isCoding ?? true,
						})
						isSubmitting = false
						if (res.ok) {
							currentMode = EditorMode.Submitment
						} else {
							logger.error(getApiErrorMessage(res.errorData))
						}
						fetchSubmitments()
					}}
				>
					{#if isSubmitting}
						Controllo in corso
						<div class="spin-animation">
							<FaDiceD20 />
						</div>
					{:else}
						Invia
					{/if}
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
	.spin-animation {
		width: 1rem;
		height: 1rem;
		margin-left: 0.6rem;
		color: var(--accent);
		animation: spin 1.5s linear infinite;
	}
	@keyframes spin {
		0% {
			transform: rotate(0deg);
			scale: 0.8;
			filter: hue-rotate(0deg);
		}
		50% {
			scale: 1.2;
		}
		100% {
			transform: rotate(360deg);
			scale: 0.8;
			filter: hue-rotate(360deg);
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
