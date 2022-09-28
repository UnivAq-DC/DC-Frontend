<script lang="ts">
	import { goto } from "$app/navigation"
	import { api } from "$lib/api"
	import AnimatedPage from "$lib/components/AnimatedPage.svelte"
	import Button from "$lib/components/Button.svelte"
	import { logger } from "$lib/stores/toast"
	import { user } from "$lib/stores/user"
	import type { UserLogin } from "$lib/types/User"
	import { useGetApi } from "$lib/useApi"
	let currentUser = useGetApi(api.checkLogin, { autoFetch: true })
	let userLogin: UserLogin = {
		email: "",
		password: "",
	}
</script>

<title>
	Accedi
</title>
<AnimatedPage cropped>
	<div class="column login-page">
		{#if $currentUser.data}
			<div>
				Loggato come "{$currentUser.data.email}"
				<Button
					style="width: 100%; margin-top: 1rem"
					cssVar="accent-3"
					on:click={async () => {
						user.setToken("")
						currentUser.fetch()
					}}
				>
					Logout
				</Button>
			</div>
		{:else}
			<h1>Login</h1>
			<div class="login-form-wrapper">
				<form
					on:submit|preventDefault={async () => {
						const result = await api.loginUser(userLogin)
						if (result.ok) {
							logger.success(result.data.message)
							user.setToken(result.data.data)
							goto("/")
						} else {
							logger.error(result.errorData?.message ?? "Failed to login")
						}
					}}
				>
					<div class="column">
						<div>Email</div>
						<input
							bind:value={userLogin.email}
							placeholder="Email"
							type="email"
							class="input"
						/>
					</div>
					<div class="column">
						<div>Password</div>
						<input
							bind:value={userLogin.password}
							class="password-input"
							placeholder="Password"
							type="password"
						/>
					</div>
					<Button
						style="width: 100%; margin-top: 1rem"
						cssVar="accent-3"
						disabled={!(userLogin.email && userLogin.password)}
					>
						Login
					</Button>
				</form>
			</div>
		{/if}
	</div>
</AnimatedPage>

<style lang="scss">
	.login-form-wrapper {
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
	.login-page {
		margin-top: 5rem;
		flex: 1;
		align-items: center;
		gap: 0.5rem;
	}
</style>
