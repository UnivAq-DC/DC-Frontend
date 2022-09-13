<script lang="ts">
	import { logger } from "$lib/stores/toast"
	import { quintOut } from "svelte/easing"
	import { crossfade } from "svelte/transition"
	const [send, receive] = crossfade({
		duration: (d) => Math.sqrt(d * 200),
		fallback() {
			return {
				duration: 600,
				easing: quintOut,
				css: (t) => {
					const a = `
					transform: translateY(${-100 + 100 * t}px) scale(${Math.min(1, 0.8 + 0.2 * t)});
					opacity: ${t}
				`
                return a
				},
			}
		},
	})
</script>

<div class="toasts-column">
	{#each $logger as toast}
		<div
			in:send={{ key: toast._id }}
			out:receive={{ key: toast._id }}
			class="toast-wrapper"
		>
			<div class="toast-title" style={`border-color: ${toast.color}`}>
				<div>
					{toast.title}
				</div>
			</div>
			<div class="toast-text">
				{toast.message}
			</div>
			<div class="toast-progress">
				<div
					class="toast-progress-bar"
					style={`
					animation-duration: ${toast.timeout}ms; 
					background-color: ${toast.color};
				`}
				/>
			</div>
		</div>
	{/each}
</div>

<style lang="scss">
	.toasts-column {
		display: grid;
		grid-template-columns: 1fr;
		gap: 0.4rem;
		flex-direction: column;
		position: fixed;
		right: 1rem;
		top: 1rem;
		width: 20rem;
	}
	.toast-wrapper {
		display: flex;
		max-height: 10rem;
		background-color: var(--primary);
		backdrop-filter: blur(3px);
		border-radius: 0.4rem;
		box-shadow: 0 3px 10px rgb(0 0 0 / 0.2);
		z-index: 20;
		transition: transform 0.3s ease-out;
		animation: animateIn 0.3s ease-out;
		flex-direction: column;
		padding: 0.6rem;
		padding-top: 0.1rem;
	}
	.toast-progress {
		width: 100%;
		height: 0.2rem;
		border-radius: 1rem;
		overflow: hidden;
	}
	.toast-progress-bar {
		animation-name: mergeToZero;
		animation-timing-function: linear;
		animation-fill-mode: forwards;
		width: 100%;
		height: 0.2rem;
	}
	@keyframes mergeToZero {
		from {
			transform: translateX(0);
		}
		to {
			transform: translateX(-100%);
		}
	}

	.toast-title {
		width: 100%;
		display: flex;
		padding: 0.4rem 0rem 0.4rem 0.6rem;
		justify-content: space-between;
		flex-direction: row;
		font-size: 1.1rem;
		align-items: flex-start;
		margin-bottom: 0.2rem;
		border-bottom: solid 1px var(--accent);
	}
	.toast-text {
		padding: 0.7rem;
		font-size: 0.9rem;
		display: flex;
		margin-top: auto;
	}
	@media (max-width: 480px) {
		.toast-wrapper {
			left: 0;
			transform: translateX(calc(50vw - 50%)) translateY(-13rem);
		}
		.toastVisible {
			transform: translateX(calc(50vw - 50%)) translateY(1rem);
		}
	}
</style>
