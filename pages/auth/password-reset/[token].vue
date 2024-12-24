<script setup lang="ts">
import { useRoute } from "vue-router";
import { useAuthStore } from "~/stores/auth";

useHead({
	title: "Reset Password",
});

definePageMeta({
	layout: "auth",
});

const route = useRoute();
const auth = useAuthStore();
const form = reactive({
	password: "",
	password_confirmation: "",
	email: route.query.email as string,
	token: route.params.token as string,
});

const formError = reactive({
	email: "",
	password: "",
	password_confirmation: "",
});

async function submit() {
	let { status, inputErrors } = await auth.resetPassword(form);

	if (status !== 200) {
		formError.email = inputErrors?.email;
		formError.password = inputErrors?.password;

		if (inputErrors?.password[0].includes("confirmation")) {
			formError.password_confirmation = inputErrors?.password;
		}
	}
}
</script>

<template>
	<section class="h-screen bg-gray-50 dark:bg-gray-900">
		<div
			class="flex flex-col items-center justify-start px-6 py-8 mx-auto lg:py-0"
		>
			<NuxtLink
				to="/"
				class="flex self-end py-8 px-4 font-bold text-primary-600 hover:underline"
			>
				<span>Go to home</span>
				<IconArrowRight class="w-6 h-6 ml-1" />
			</NuxtLink>

			<div
				class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700"
			>
				<form @submit.prevent="submit" class="p-6">
					<div>
						<InputLabel for="email" value="Email" />

						<TextInput
							id="email"
							type="email"
							class="mt-1 block w-full"
							v-model="form.email"
							autofocus
							autocomplete="username"
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
							id="password"
							type="password"
							class="mt-1 block w-full"
							v-model="form.password"
							autocomplete="new-password"
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
							id="password_confirmation"
							type="password"
							class="mt-1 block w-full"
							v-model="form.password_confirmation"
							autocomplete="new-password"
						/>

						<InputError
							class="mt-2"
							v-if="formError?.password_confirmation"
							:message="formError?.password_confirmation[0]"
						/>
					</div>

					<div class="flex items-center justify-end mt-4">
						<UiPrimaryButton> Reset Password </UiPrimaryButton>
					</div>
				</form>
			</div>
		</div>
	</section>
</template>
