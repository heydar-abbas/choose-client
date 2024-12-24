<script setup lang="ts">
import { useAuthStore } from "~/stores/auth";

defineProps({
	status: String,
});

useHead({
	title: "Send password reset link",
});

definePageMeta({
	layout: "auth",
});

const auth = useAuthStore();
const success = ref<boolean>(false);
const form = reactive({
	email: "",
});

const formError = reactive({
	email: "",
});

async function submit() {
	let { status, inputError } = await auth.sendResetEmail(form);

	if (status !== 200) {
		formError.email = inputError?.email;
	} else {
		success.value = true;
		setTimeout(() => {
			success.value = false;
		}, 10000);
	}
}
</script>

<template>
	<section
		class="h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900"
	>
		<SuccessMessage v-show="success" :message="auth.message" color="green" />
		<div
			class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700"
		>
			<div class="p-6 space-y-4 md:space-y-6 sm:p-8">
				<div class="text-sm text-gray-600 dark:text-gray-300">
					Forgot your password? No problem. Just let us know your email address
					and we will email you a password reset link that will allow you to
					choose a new one.
				</div>

				<div v-if="status" class="mb-4 font-medium text-sm text-green-600">
					{{ status }}
				</div>

				<form @submit.prevent="submit">
					<div>
						<InputLabel for="email" value="Email" />

						<TextInput
							id="email"
							type="email"
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

					<div class="flex items-center justify-end mt-4">
						<UiPrimaryButton> Email Password Reset Link </UiPrimaryButton>
					</div>
				</form>
			</div>
		</div>
	</section>
</template>
