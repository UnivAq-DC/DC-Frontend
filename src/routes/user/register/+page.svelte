<script lang="ts">
	import { goto } from "$app/navigation"
	import { api } from "$lib/api"
	import AnimatedPage from "$lib/components/AnimatedPage.svelte"
	import Button from "$lib/components/Button.svelte"
	import { logger } from "$lib/stores/toast"
	import type { UserRegister } from "$lib/types/User"
	import { getApiErrorMessage } from "$lib/utils"
	let userRegister: UserRegister = {
		email: "",
		password: "",
		passwordConfirm: "",
		username: "",
	}
</script>

<title>
	Registrati
</title>
<AnimatedPage cropped>
	<div class="column register-page">
		<h1>Register</h1>
		<div class="register-form-wrapper">
			<form
				on:submit|preventDefault={async () => {
					const result = await api.registerUser(userRegister)
					if (result.ok) {
						logger.success(result.data.message)
						goto("/user")
					} else {
						logger.error(getApiErrorMessage(result.errorData))
					}
				}}
			>
				<div class="column">
					<div>Email</div>
					<input
						bind:value={userRegister.email}
						placeholder="Email"
						type="email"
						class="input"
					/>
				</div>
				<div class="column">
					<div>Username</div>
					<input
						bind:value={userRegister.username}
						placeholder="Username"
						type="text"
						class="input"
					/>
				</div>
				<div class="column">
					<div>Password</div>
					<input
						bind:value={userRegister.password}
						class="password-input"
						placeholder="Password"
						type="password"
					/>
				</div>
				<div class="column">
					<div>Confirm Password</div>
					<input
						bind:value={userRegister.passwordConfirm}
						class="password-input"
						placeholder="Confirm password"
						type="password"
					/>
				</div>
				<Button
					style="width: 100%; margin-top: 1rem"
					cssVar="accent-3"
					disabled={!(userRegister.email && userRegister.password)}
				>
					Register
				</Button>
			</form>
		</div>
	</div>
</AnimatedPage>

<style lang="scss">
	.register-form-wrapper {
		max-width: 25rem;
		width: 100%;
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
		padding: 0.5rem;
		border: none;
		border-radius: 0.3rem;
		color: var(--layer-text);
	}
	.register-page {
		margin-top: 5rem;
		flex: 1;
		align-items: center;
		gap: 0.5rem;
	}
</style>
