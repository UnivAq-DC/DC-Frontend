<script lang="ts">
	import type { IProject } from "src/types/Project"
import LanguageIcon from "./LanguageIcon.svelte";
    import Button from "./Button.svelte";
	export let project: IProject
</script>

<div class="row project-row">
    <div class="row-centered">
        <div class="project-title">
            {project.title}
        </div>
        <div class="row language-row">
            {#each project.languages as language}
                <LanguageIcon language={language} style='width: 1rem; height: 1rem;'/>
            {/each}
        </div>
    </div>
    <div class="description">
        {project.description}
    </div>
    <div class="row" style="align-items: flex-end;">
        <Button>
            <a href={`project/${project.id}`}>
                Prova
            </a>
        </Button>
    </div>
</div>


<style lang="scss">
    .project-row{
        background-color: var(--primary);
        width: 100%;
        border-radius: 0.8rem;
        padding: 1rem;
    }
    .project-title{
        font-size: 1.5rem;
        font-weight: 600;
        padding: 1rem;
        width: fit-content;
    }
    .language-row{
        color: var(--accent);
    }
    .description{
        padding: 0.6rem;
        background-color: var(--layer);
        border-radius: 0.4rem;
        max-height: 15rem;
        overflow-y: auto;
    }
</style>