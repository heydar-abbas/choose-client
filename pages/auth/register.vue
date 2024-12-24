<script setup>
import { reactive } from "vue";
import { useAuthStore } from "~/stores/auth";

useHead({
	title: "Create acount",
});

definePageMeta({
	layout: "auth",
});

const auth = useAuthStore();
const info = reactive({
	name: "",
	email: "",
	password: "",
	password_confirmation: "",
	terms: false,
});

const formError = reactive({
	name: "",
	email: "",
	password: "",
	password_confirmation: "",
});

async function submit() {
	let { status, inputErrors } = await auth.register(info);

	if (status !== 200) {
		formError.name = inputErrors?.name;
		formError.email = inputErrors?.email;
		formError.password = inputErrors?.password;

		if (inputErrors?.password[0].includes("confirmation")) {
			formError.password_confirmation = inputErrors?.password;
		}
	}
}
</script>

<template>
	<section
		class="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900"
	>
		<div
			class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700"
		>
			<div class="p-6 space-y-4 md:space-y-6 sm:p-8">
				<h1
					class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white"
				>
					Create an account
				</h1>
				<form class="space-y-4 md:space-y-6" @submit.prevent="submit">
					<div>
						<InputLabel for="name" value="Name" />

						<TextInput
							v-model="info.name"
							id="name"
							type="text"
							class="mt-1 block w-full"
							autofocus
							autocomplete="name"
							placeholder="Your name"
						/>

						<InputError
							class="mt-2"
							v-if="formError?.name"
							:message="formError?.name[0]"
						/>
					</div>

					<div class="mt-4">
						<InputLabel for="email" value="Email" />

						<TextInput
							v-model="info.email"
							id="email"
							type="email"
							class="mt-1 block w-full"
							autocomplete="email"
							placeholder="name@company.com"
						/>

						<InputError
							class="mt-2"
							v-if="formError?.email"
							:message="formError?.email[0]"
						/>
					</div>

					<div class="mt-4">
						<InputLabel for="password" value="Password" />

						<TextInput
							v-model="info.password"
							id="password"
							type="password"
							class="mt-1 block w-full"
							autocomplete="new-password"
							placeholder="••••••••"
						/>

						<InputError
							class="mt-2"
							v-if="formError?.password"
							:message="formError?.password[0]"
						/>
					</div>

					<div class="mt-4">
						<InputLabel for="password_confirmation" value="Confirm Password" />

						<TextInput
							v-model="info.password_confirmation"
							id="password_confirmation"
							type="password"
							class="mt-1 block w-full"
							autocomplete="new-password"
							placeholder="••••••••"
						/>

						<InputError
							class="mt-2"
							v-if="formError?.password_confirmation"
							:message="formError?.password_confirmation[0]"
						/>
					</div>

					<div class="flex items-start">
						<div class="flex items-center h-5">
							<Checkbox
								v-model:checked="info.terms"
								id="terms"
								name="terms"
								aria-describedby="terms"
							/>
						</div>
						<div class="ml-3 text-sm">
							<label
								for="terms"
								class="font-light text-gray-500 dark:text-gray-300"
								>I accept the
								<a
									class="font-medium text-blue-600 hover:underline dark:text-blue-500"
									href="#"
									>Terms and Conditions</a
								></label
							>
						</div>
					</div>
					<button
						type="submit"
						class="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
					>
						Create an account
					</button>
					<p class="text-sm font-light text-gray-500 dark:text-gray-400">
						Already have an account?
						<NuxtLink
							to="/auth/login"
							class="font-medium text-blue-600 hover:underline dark:text-blue-500"
						>
							Login here
						</NuxtLink>
					</p>
				</form>
			</div>
		</div>
	</section>
</template>
