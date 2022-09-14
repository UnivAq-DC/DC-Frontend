<script lang="ts">
	import AnimatedPage from "$lib/components/AnimatedPage.svelte"
	import Button from "$lib/components/Button.svelte"
	import Editor from "$lib/components/Editor.svelte"
	import EditorProject from "$lib/components/EditorProject.svelte"
	import Select from "$lib/components/Select.svelte"
	import { Language, type IProject } from "$types/Project"
	import type { UserSubmission } from "$types/UserSubmission"
	//remove the default once done testing
	let project: IProject = {
		title: "Some title",
		description: "some long description",
		languages: [Language.C, Language.Python, Language.Cpp],
		markdown: "<b> some markdown </b>",
		id: "1",
	}
	let userSubmission: UserSubmission = {
		code: "",
		language: Language.C,
	}
</script>

<AnimatedPage style='position:relative;'>
	<div class="project-grid">
		<div class="editor-wrapper">
			<Editor
				bind:code={userSubmission.code}
				bind:language={userSubmission.language}
			/>
		</div>
		<div class="column prompt-wrapper">
			<EditorProject bind:project />
		</div>
		<div class="row bottom-wrapper space-between">
			<div class="row-centered">
				Linguaggio
				<Select style="margin-left: 1rem" bind:value={userSubmission.language}>
					{#each project.languages as language (language)}
						<option value={language}>{language}</option>
					{/each}
				</Select>
			</div>
			<Button fancy>Invia</Button>
		</div>
	</div>
</AnimatedPage>

<style lang="scss">
	.project-grid {
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
		@media (max-width: 900px) {
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
</style>
