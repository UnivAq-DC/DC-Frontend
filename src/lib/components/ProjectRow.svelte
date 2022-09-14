<script lang="ts">
	import type { IProject } from "$lib/types/Project"
	import LanguageIcon from "./LanguageIcon.svelte"
	import Button from "./Button.svelte"
	export let project: IProject
</script>

<div class="column project-row">
	<div class="row" style="justify-content: space-between;">
		<div class="row-centered">
			<div class="project-title">
				{project.title}
			</div>
			<div class="row language-row">
				{#each project.languages as language}
					<LanguageIcon {language} style="width: 1rem; height: 1rem;" />
				{/each}
			</div>
		</div>
		<a href={`project/${project.id}`} class="try-desktop">
			<Button cssVar='accent' bold fancy fancyColor='var(--accent-3)'>Prova</Button>
		</a>
	</div>
	<div class="description">
		{project.description}
	</div>
    <div class="row try-mobile" style="justify-content:flex-end">
        <a href={`project/${project.id}`}>
            <Button cssVar='accent' bold fancy fancyColor='var(--accent-3)'>Prova</Button>
        </a>
    </div>

</div>

<style lang="scss">
	.project-row {
		background-color: var(--primary);
		width: 100%;
		border-radius: 0.4rem;
		padding: 0.8rem;
		gap: 0.8rem;
	}
	.project-title {
		font-size: 1.3rem;
		font-weight: 600;
		width: fit-content;
	}
	.language-row {
		color: var(--accent);
		gap: 0.4rem;
		margin-left: 1rem;
	}
    .try-mobile{
        display: none;
    }
    @media (max-width:800px){
        .try-desktop{
            display: none;
        }
        .try-mobile{
            display: flex;
        }
    }
	.description {
		padding: 0.6rem;
		background-color: var(--layer);
		border-radius: 0.4rem;
		max-height: 15rem;
		overflow-y: auto;
	}
</style>
