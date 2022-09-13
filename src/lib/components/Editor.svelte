<script lang="ts">
	import { onMount } from "svelte"
	import type monaco from "monaco-editor"
	import { Monaco, type MonacoType } from "$lib/Monaco"
	import type { Language } from "$lib/types/Project"
	export let disabled = false
	export let language: Language
	export let code: string
	let el: HTMLDivElement
	let mockEditor: HTMLDivElement
	let editor: monaco.editor.IStandaloneCodeEditor
	let monacoInstance: MonacoType
	const toDispose: any[] = []
	onMount(async () => {
		Monaco.registerLanguages()
		monacoInstance = await Monaco.get()
		editor = monacoInstance.editor.create(el, {
			value: code,
			language: language.toLowerCase(),
			theme: "custom-theme",
			minimap: { enabled: false },
			scrollbar: {
				vertical: "auto",
				horizontal: "hidden",
			},
			cursorBlinking: "phase",
			fontSize: 16,
			smoothScrolling: true,
		})
		const observer = new ResizeObserver(() => {
			const bounds = mockEditor.getBoundingClientRect()
			editor.layout({
				width: bounds.width,
				height: bounds.height,
			})
		})
		observer.observe(mockEditor)
		toDispose.push(() => observer.disconnect())
		const model = editor.getModel()
		if (model) {
			toDispose.push(
				model.onDidChangeContent(() => {
					code = editor.getValue()
				})
			)
		}
		return () => {
			toDispose.forEach((d) => d.dispose())
			Monaco.dispose()
			editor.dispose()
		}
	})
	$: if (monacoInstance?.editor) {
		monacoInstance.editor.setModelLanguage(
			editor.getModel()!,
			language.toLowerCase()
		)
	}
	$: editor?.updateOptions({ readOnly: disabled })
</script>

<svelte:window
	on:resize={() => {
		if (editor) editor.layout()
	}}
/>

<div bind:this={mockEditor} class="mock-editor">
	{#if !editor}
		<h1 class="loading">Loading editor...</h1>
	{/if}
</div>
<div bind:this={el} class="editor" />

<style lang="scss">
	:global(.selected-line) {
		background-color: var(--accent);
	}
	:global(.error-line) {
		background-color: var(--red);
	}
	:global(.selected-line-text) {
		color: var(--accent-text) !important;
	}
	:global(.find-widget) {
		border-radius: 0.3rem !important;
		top: 1rem !important;
		right: 1rem !important;
	}
	:global(.monaco-editor-overlaymessage .message) {
		border-radius: 0.3rem !important;
		border-bottom-left-radius: 0 !important;
	}
	:global(.monaco-inputbox) {
		border-radius: 0.2rem;
	}
	:global(.find-widget) {
		transform: translateY(calc(-100% - 1.2rem)) !important;
	}
	:global(.find-widget.visible) {
		transform: translateY(0) !important;
	}

	.mock-editor {
		display: flex;
		flex: 1;
	}
	.editor {
		position: absolute;
		display: flex;
		border-radius: 0.4rem;
		overflow: hidden;
		box-shadow: 0 3px 10px rgb(0 0 0 / 0.2);
	}
	.loading {
		display: flex;
		flex: 1;
		justify-content: center;
		align-items: center;
		background-color: var(--background);
		border-radius: 0.4rem;
		animation: infinite 3s pulse ease-in-out;
	}
	@keyframes pulse {
		0% {
			background-color: var(--background);
		}
		50% {
			background-color: var(--primary);
		}
		100% {
			background-color: var(--background);
		}
	}
</style>
