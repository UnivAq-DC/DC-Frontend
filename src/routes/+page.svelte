<script lang="ts">
	import { api } from "$lib/api"
	import AnimatedPage from "$lib/components/AnimatedPage.svelte"
	import Button from "$lib/components/Button.svelte"
	import ProjectRow from "$lib/components/ProjectRow.svelte"
	import { useGetApi } from "$lib/useApi"
	const projects = useGetApi(api.fetchProjects, {
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
	<div class="column projects-content">
		<div class="project-title">Progetti</div>
		<div class="column projects-wrapper">
			{#if $projects.loading}
				<div class="loading">Loading projects...</div>
			{:else if $projects.error || !$projects.data}
				<div class="error">Error: {$projects.error}</div>
			{:else}
				{#each $projects.data as project}
					<ProjectRow {project} />
				{/each}
			{/if}
		</div>
	</div>
	<Button
		on:click={() => {
			logger.success("test")
		}}
	>
		test
	</Button>
</AnimatedPage>

<style lang="scss">
	.project-title {
		font-size: 1.6rem;
		font-weight: 600;
		padding: 1rem 0;
		width: fit-content;
	}
	.projects-content {
		margin-top: 4rem;
		@media screen and (max-width: 800px) {
			margin-top: 1rem;
		}
	}
	.error {
		color: var(--red);
	}
	.projects-wrapper {
		margin-top: 1rem;
		padding: 0.4rem;
		display: grid;
		grid-template-columns: 1fr;
		gap: 1rem;
	}
</style>
