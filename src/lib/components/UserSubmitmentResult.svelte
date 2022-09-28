<script lang="ts">
	import type { Submitment } from "$lib/types/UserSubmitment"
	import { fly } from "svelte/transition";
	import sago from "s-ago"

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
    <div>
		Punteggio: {submitment.score}
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
