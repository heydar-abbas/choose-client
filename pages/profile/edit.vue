<script setup lang="ts">
import DeleteUserForm from "./partials/DeleteUserForm.vue";
import UpdatePasswordForm from "./partials/UpdatePasswordForm.vue";
import UpdateProfileInformationForm from "./partials/UpdateProfileInformationForm.vue";
import { useAuthStore } from "~/stores/auth";
import { storeToRefs } from "pinia";

useHead({
	title: "Edit profile",
});

definePageMeta({
	middleware: "auth",
});

defineProps({
	mustVerifyEmail: Boolean,
	status: String,
});

const auth = useAuthStore();

</script>

<template>
	<div
		class="w-full px-4 md:px-0 mx-auto md:max-w-2xl lg:max-w-4xl xl:max-w-5xl"
	>
		<h2
			class="py-6 px-4 sm:px-6 lg:px-0 font-semibold text-xl text-gray-800 dark:text-gray-300 leading-tight"
		>
			Profile
		</h2>

		<SuccessMessage v-show="auth.message" :message="auth.message"/>

		<div class="py-6">
			<div class="space-y-6">
				<div class="p-4 sm:p-8 bg-white dark:bg-gray-900 shadow md:rounded-lg">
					<UpdateProfileInformationForm
						:must-verify-email="mustVerifyEmail"
						:status="status"
						class="max-w-xl"
					/>
				</div>

				<div class="p-4 sm:p-8 bg-white dark:bg-gray-900 shadow md:rounded-lg">
					<UpdatePasswordForm class="max-w-xl" />
				</div>

				<div class="p-4 sm:p-8 bg-white dark:bg-gray-900 shadow md:rounded-lg">
					<DeleteUserForm class="max-w-xl" />
				</div>
			</div>
		</div>
	</div>
</template>
