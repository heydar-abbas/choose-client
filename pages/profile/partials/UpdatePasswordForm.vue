<script setup lang="ts">
import { reactive } from "vue";
import { useAuthStore } from "~/stores/auth";

const auth = useAuthStore();

const form = reactive({
	current_password: "",
	password: "",
	password_confirmation: "",
});

const formErrors = reactive({
	current_password: "",
	password: "",
	password_confirmation: "",
});

async function updatePassword() {
	let { status, inputErrors } = await auth.updatePassword(form);

	if (status !== 200) {
		formErrors.current_password = inputErrors?.current_password;
		formErrors.password = inputErrors?.password;
	
		if (inputErrors?.password[0].includes("confirmation")) {
			formErrors.password_confirmation = inputErrors?.password;
		}
	}

	resetForm();
}

function resetForm() {
	form.current_password = "";
	form.password = "";
	form.password_confirmation = "";
}
</script>

<template>
	<section>
		<header>
			<h2 class="text-lg font-medium text-gray-900">Update Password</h2>

			<p class="mt-1 text-sm text-gray-600">
				Ensure your account is using a long, random password to stay secure.
			</p>
		</header>

		<form @submit.prevent="updatePassword" class="mt-6 space-y-6">
			<div>
				<InputLabel for="current_password" value="Current Password" />

				<TextInput
					id="current_password"
					v-model="form.current_password"
					type="password"
					class="mt-1 block w-full"
					autocomplete="current-password"
				/>

				<InputError
					class="mt-2"
					v-if="formErrors?.current_password"
					:message="formErrors?.current_password[0]"
				/>
			</div>

			<div>
				<InputLabel for="password" value="New Password" />

				<TextInput
					id="password"
					v-model="form.password"
					type="password"
					class="mt-1 block w-full"
					autocomplete="new-password"
				/>

				<InputError
					class="mt-2"
					v-if="formErrors?.password"
					:message="formErrors?.password[0]"
				/>
			</div>

			<div>
				<InputLabel for="password_confirmation" value="Confirm Password" />

				<TextInput
					id="password_confirmation"
					v-model="form.password_confirmation"
					type="password"
					class="mt-1 block w-full"
					autocomplete="new-password"
				/>

				<InputError
					class="mt-2"
					v-if="formErrors.password_confirmation"
					:message="formErrors.password_confirmation[0]"
				/>
			</div>

			<div class="flex items-center gap-4">
				<UiPrimaryButton>Save</UiPrimaryButton>
			</div>
		</form>
	</section>
</template>
