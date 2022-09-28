<script lang="ts">
	import type { Submitment } from "$lib/types/UserSubmitment"
	import FaFileCode from 'svelte-icons/fa/FaFileCode.svelte'
	import { fly } from "svelte/transition";
	import sago from "s-ago"
  import Button from "./Button.svelte"
  import { createEventDispatcher } from "svelte"
	let dispatch = createEventDispatcher()
	export let submitment: Submitment
</script>

<div class="submitment column" in:fly={{y: -20, duration: 200}}>
	<div class="row space-between submitment-header">
		<div>
			{submitment.language}
		</div>
		<div>
			{sago(new Date(submitment.createdAt))}
		</div>
	</div>
    <div class="row space-between">
		<div>
			Punteggio: {submitment.score}
		</div>
		<Button
			on:click={() => dispatch("openCode", submitment.code)}
			style='width: 1.6rem; height: 1.6rem; padding: 0.2rem'
			cssVar='primary'
		>
			<FaFileCode />

		</Button>
	</div>
</div>

<style>
	.submitment {
		gap: 0.3rem;
		background-color: var(--layer);
		padding: 0.5rem 1rem;
		border-radius: 0.4rem;
		color: var(--layer-text);
		animation: flash 1s ease-in-out;
	}
    .submitment-header{
        margin-bottom: 0.4rem;
    }
</style>
