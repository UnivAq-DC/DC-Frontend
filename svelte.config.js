import preprocess from 'svelte-preprocess';
import adapter from '@sveltejs/adapter-static';
import { resolve } from 'path'
/** @type {import('@sveltejs/kit').Config} */
const config = {

	// Consult https://github.com/sveltejs/svelte-preprocess
	// for more information about preprocessors
	preprocess: preprocess(),

	kit: {
		adapter: adapter({
			fallback: '404.html'
		}),
		prerender: {
			enabled: true,
		},
		alias: {
			"$lib": resolve("./src/lib"),
			"$cmp": resolve("./src/lib/components"),
			"$stores": resolve("./src/lib/stores"),
			"$types": resolve("./src/lib/types"),
		}
	}
};

export default config;
