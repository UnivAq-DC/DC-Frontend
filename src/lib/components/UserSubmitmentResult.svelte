<script lang="ts">
	import type { Submitment } from "$lib/types/UserSubmitment"
	import sago from "s-ago"

	export let submitment: Submitment
</script>

<div class="submitment column">
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
	}
    .submitment-header{
        margin-bottom: 0.4rem;
    }
</style>
