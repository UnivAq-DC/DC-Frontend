<script lang="ts">
	import type { ProblemPreview } from "$lib/types/Problem"
	import Button from "./Button.svelte"
	import LanguageIcon from "./LanguageIcon.svelte"
	export let problem: ProblemPreview
</script>

<div class="column problem-row">
	<div class="row" style="justify-content: space-between;">
		<div class="row-centered">
			<div class="problem-title">
				{problem.name}
			</div>
			<div class="row language-row">
				{#each problem.availableLanguages ?? [] as language}
					<LanguageIcon {language} style="width: 1rem; height: 1rem;" />
				{/each}
			</div>
		</div>
		<a href={`problem/${problem.id}`} class="try-desktop">
			<Button cssVar="accent" bold fancy fancyColor="var(--accent-3)">
				Prova
			</Button>
		</a>
	</div>
	<div class="description">
		{problem.description}
	</div>
	<div class="row try-mobile" style="justify-content:flex-end">
		<a href={`problem/${problem.id}`}>
			<Button cssVar="accent" bold fancy fancyColor="var(--accent-3)"
				>Prova</Button
			>
		</a>
	</div>
</div>

<style lang="scss">
	.problem-row {
		background-color: var(--primary);
		width: 100%;
		border-radius: 0.6rem;
		padding: 0.8rem;
		gap: 0.8rem;
	}
	.problem-title {
		font-size: 1.3rem;
		font-weight: 600;
		width: fit-content;
	}
	.language-row {
		color: var(--accent);
		gap: 0.4rem;
		margin-left: 1rem;
	}
	.try-mobile {
		display: none;
	}
	@media (max-width: 800px) {
		.try-desktop {
			display: none;
		}
		.try-mobile {
			display: flex;
		}
	}
	.description {
		padding: 0.6rem;
		padding-bottom: 0.2rem;
		border-radius: 0.4rem;
		max-height: 15rem;
		overflow-y: auto;
	}
</style>
