<script lang="ts">
	import AnimatedPage from "$lib/components/AnimatedPage.svelte"
	import Button from "$lib/components/Button.svelte"
	import type { UserLogin } from "$lib/types/User"
	let user: UserLogin = {
		email: "",
		password: "",
	}
</script>

<AnimatedPage cropped style='align-items: center;'>
	<div class="column login-page">
		<h1>Login</h1>
		<div class="login-form-wrapper">
			<form
				on:submit|preventDefault={() => {
					console.log(user)
				}}
			>
				<div class="column">
					<div>Email</div>
					<input
						bind:value={user.email}
						placeholder="Email"
						type="text"
						class="input"
					/>
				</div>
				<div class="column">
					<div>Password</div>
					<input
						bind:value={user.password}
						class="password-input"
						placeholder="Password"
						type="password"
					/>
				</div>
				<Button style="width: 100%" cssVar="accent-3">Login</Button>
			</form>
		</div>
	</div>
</AnimatedPage>

<style lang="scss">
	.login-form-wrapper {
        min-width: 25rem;
		border-radius: 0.8rem;
		padding: 1rem;
		background-color: var(--primary);
		form {
			display: flex;
			gap: 1rem;
			flex-direction: column;
            input {
                margin-top: 0.5rem;
            }
		}
	}
	.input,
	.password-input {
		background-color: var(--layer);
		padding: 0.4rem;
		border: none;
		border-radius: 0.3rem;
		color: var(--layer-text);
	}
	.login-page {
		margin-top: 2rem;
		gap: 0.5rem;
	}
</style>
