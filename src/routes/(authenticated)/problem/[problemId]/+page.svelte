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
	import FaDiceD20 from "svelte-icons/fa/FaDiceD20.svelte"
	import { getApiErrorMessage } from "$lib/utils"
	let problem = useGetRestApi(api.fetchProblem, {
		onSuccess: (data) => {
			userSubmitment.isCode = data.isCoding
			if (data.isCoding) {
				userSubmitment.language = data.availableLanguages[0] ?? Language.C
			}
		},
	})
	$: if (browser) problem.fetch($page.params.problemId)
	let isSubmitting = false
	let userSubmitment: UserSubmitment = {
		code: "",
		language: Language.Plain,
		problemId: Number($page.params.problemId),
		isCode: true,
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
<title>
	{#if $problem.loading}
		Loading problem...
	{:else}
		{$problem.data?.name ?? "Problema"}
	{/if}
</title>
<AnimatedPage style="position:relative;">
	{#if $problem.loading}
		<div class="loading">Caricamento del problema...</div>
	{:else if $problem.error || !$problem.data}
		<div class="error">Errore: {$problem.error}</div>
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
