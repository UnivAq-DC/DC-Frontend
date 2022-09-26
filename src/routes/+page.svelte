<script lang="ts">
	import { api } from "$lib/api"
	import AnimatedPage from "$lib/components/AnimatedPage.svelte"
	import ProblemRow from "$lib/components/ProblemRow.svelte"
	import { useGetApi } from "$lib/useApi"
	const problems = useGetApi(api.fetchProblems, {
		autoFetch: true,
		onError: () => {
			logger.error("C'è stato un errore nel caricamento dei progetti")
		},
	})
	import { logger } from "$lib/stores/toast"


</script>

<svelte:head>
	<title>Progetti</title>
</svelte:head>
<AnimatedPage cropped>
	<div class="column problems-content">
		<div class="problem-title">Progetti</div>
		<div class="column problems-wrapper">
			{#if $problems.loading}
				<div class="loading">Loading problems...</div>
			{:else if $problems.error || !$problems.data}
				<div class="error">Error: {$problems.error}</div>
			{:else}
				{#each $problems.data as problem}
					<ProblemRow {problem} />
				{/each}
			{/if}

		</div>
	</div>
</AnimatedPage>

<style lang="scss">
	.problem-title {
		font-size: 1.6rem;
		font-weight: 600;
		padding: 1rem 0;
		width: fit-content;
	}
	.loading{
		margin: 1rem;
	}
	.error{
		color: var(--red)
	}
	.problems-content {
		margin-top: 4rem;
		padding: 1rem;
		gap: 0.8rem;
		@media screen and (max-width: 800px) {
			margin-top: 1rem;
			padding: 0;
		}
	}
	.problems-wrapper {
		display: grid;
		grid-template-columns: 1fr;
		gap: 1rem;
	}
</style>
