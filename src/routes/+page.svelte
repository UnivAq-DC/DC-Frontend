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
	import { Language, type IProject } from "$lib/types/Project"

	const projectsExamples: IProject[] = [
		{
			title: "test project",
			description:
				"this is some description of the project that goes inside of this app",
			languages: [Language.C, Language.Cpp, Language.Python],
			id: "2",
			markdown: "this is some markdown",
		},
		{
			title: "Another project",
			description:
				"this is some description of the project that goes inside of this app",
			languages: [Language.C, Language.Cpp, Language.Python],
			id: "3",
			markdown: "this is some markdown",
		},
	]
</script>

<svelte:head>
	<title>Progetti</title>
</svelte:head>
<AnimatedPage cropped>
	<div class="column projects-content">
		<div class="project-title">Progetti</div>
		<div class="column projects-wrapper">
			{#each projectsExamples as project (project.id)}
				<ProjectRow {project} />
			{/each}
			<!--
			{#if $projects.loading}
				<div class="loading">Loading projects...</div>
			{:else if $projects.error || !$projects.data}
				<div class="error">Error: {$projects.error}</div>
			{:else}
				{#each $projects.data as project}
					<ProjectRow {project} />
				{/each}
			{/if}
			-->
		</div>
	</div>
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
		padding: 1rem;
		gap: 0.8rem;
		@media screen and (max-width: 800px) {
			margin-top: 1rem;
			padding: 0;
		}
	}
	.projects-wrapper {
		display: grid;
		grid-template-columns: 1fr;
		gap: 1rem;
	}
</style>
