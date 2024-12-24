<script setup>
import { nextTick, ref, reactive } from "vue";
import { useAuthStore } from "~/stores/auth";

const confirmingUserDeletion = ref(false);
const passwordInput = ref(null);

const auth = useAuthStore();

const form = reactive({
	password: "",
});

const formError = reactive({
	password: "",
});

function confirmUserDeletion() {
	confirmingUserDeletion.value = true;
	nextTick(() => passwordInput.value.focus());
}

async function deleteUser() {
	let { status, inputErrors } = await auth.destroy(form);

	if (status !== 200) {
		passwordInput.value.focus();
		formError.password = inputErrors?.password;
	} else {
		closeModal();
	}
}

function closeModal() {
	confirmingUserDeletion.value = false;
}
</script>

<template>
	<section class="space-y-6">
		<header>
			<h2 class="text-lg font-medium text-gray-900">Delete Account</h2>

			<p class="mt-1 text-sm text-gray-600">
				Once your account is deleted, all of its resources and data will be
				permanently deleted. Before deleting your account, please download any
				data or information that you wish to retain.
			</p>
		</header>

		<UiDangerButton @click="confirmUserDeletion">Delete Account</UiDangerButton>

		<div v-show="confirmingUserDeletion" @close="closeModal">
			<div class="p-6">
				<h2 class="text-lg font-medium text-gray-600">
					Are you sure you want to delete your account?
				</h2>

				<div class="mt-6">
					<InputLabel value="Password" class="sr-only" />

					<TextInput
						ref="passwordInput"
						v-model="form.password"
						type="password"
						class="mt-1 block w-3/4"
						placeholder="Password"
						@keyup.enter="deleteUser"
					/>

					<InputError
						class="mt-2"
						v-if="formError?.password"
						:message="formError?.password[0]"
					/>
				</div>

				<div class="mt-6 flex justify-end">
					<UiSecondaryButton @click="closeModal"> Cancel </UiSecondaryButton>

					<UiDangerButton class="ms-3" @click="deleteUser">
						Delete Account
					</UiDangerButton>
				</div>
			</div>
		</div>
	</section>
</template>
