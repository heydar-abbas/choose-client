<script setup lang="ts">
import { useAuthStore } from "~/stores/auth";

useHead({
	title: "Sign in",
});

definePageMeta({
	layout: "auth",
});

defineProps({
	canResetPassword: Boolean,
	status: String,
});

const auth = useAuthStore();
const credentials = reactive({
	email: "",
	password: "",
	remember: false,
});

const formError = reactive({
	email: "",
	password: "",
});

async function submit() {
	let { status, inputErrors } = await auth.login(credentials);

	if (status !== 200) {
		formError.email = inputErrors?.email;
		formError.password = inputErrors?.password;
	}
}
</script>

<template>
	<section
		class="h-screen flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-900"
	>
		<div v-if="status" class="mb-4 font-medium text-sm text-green-600">
			{{ status }}
		</div>

		<SuccessMessage v-show="auth.message" :message="auth.message" color="green" />

		<div
			class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700"
		>
			<div class="p-6 space-y-4 md:space-y-6 sm:p-8">
				<h1
					class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white"
				>
					Sign in to your account
				</h1>
				<form class="space-y-4 md:space-y-6" @submit.prevent="submit">
					<div>
						<InputLabel for="email" value="Email" />

						<TextInput
							v-model="credentials.email"
							id="email"
							type="email"
							class="mt-1 block w-full"
							autofocus
							autocomplete="username"
							placeholder="name@company.com"
						/>

						<InputError
							class="mt-2"
							v-if="formError?.email"
							:message="formError?.email[0]"
						/>
					</div>

					<div>
						<InputLabel for="password" value="Password" />

						<TextInput
							v-model="credentials.password"
							id="password"
							type="password"
							class="mt-1 block w-full"
							autocomplete="current-password"
							placeholder="••••••••"
						/>

						<InputError
							class="mt-2"
							v-if="formError?.password"
							:message="formError?.password[0]"
						/>
					</div>
					<div class="flex items-center justify-between">
						<div class="flex items-start">
							<div class="flex items-center h-5">
								<Checkbox
									v-model:checked="credentials.remember"
									id="remember"
									name="remember"
								/>
							</div>
							<div class="ml-3 text-sm">
								<label for="remember" class="text-gray-500 dark:text-gray-300">
									Remember me
								</label>
							</div>
						</div>
						<!-- canResetPassword -->
						<NuxtLink
							v-if="true"
							to="/auth/forgot-password"
							class="text-sm font-medium text-blue-600 hover:underline dark:text-blue-500"
						>
							<!-- password.request -->
							Forgot password?
						</NuxtLink>
					</div>
					<button
						type="submit"
						class="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
					>
						Sign in
					</button>
					<p class="text-sm font-light text-gray-500 dark:text-gray-400">
						Don't have an account yet?
						<NuxtLink
							to="/auth/register"
							class="font-medium text-blue-600 hover:underline dark:text-blue-500"
						>
							Sign up
						</NuxtLink>
					</p>
				</form>
			</div>
		</div>
	</section>
</template>
