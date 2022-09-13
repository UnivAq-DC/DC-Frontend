import { baseTheme } from '$lib/editorTheme';
import editorWorker from 'monaco-editor/esm/vs/editor/editor.worker?worker'
import type monaco from 'monaco-editor'
import { browser } from '$app/environment';

export type MonacoType = typeof monaco
class MonacoLoader {
	private monaco!: MonacoType;
	loading!: Promise<MonacoType>;
	toDispose: monaco.IDisposable[] = [];
	constructor() {
		if (browser) this.load()
	}
	dispose = () => {
		console.log('Disposed')
		this.toDispose.forEach(d => d.dispose())
	}
	async load(): Promise<MonacoType> {
		if (this.loading) return this.loading
		this.loading = import('monaco-editor')
		const monaco: MonacoType = await this.loading
		//@ts-ignore custom theme
		monaco.editor.defineTheme('custom-theme', baseTheme)

		this.monaco = monaco
		this.registerLanguages()

		// @ts-ignore add worker
		self.MonacoEnvironment = {
			getWorker: function (_moduleId: any, label: string) {
				return new editorWorker()
			}
		}
		return monaco
	}

	registerLanguages = () => {
		this.dispose()
		const { monaco } = this
		if(!monaco) return

	}
	async get() {
		if (this.monaco) return this.monaco
		await this.load()
		return this.monaco
	}
}


export const Monaco = new MonacoLoader()