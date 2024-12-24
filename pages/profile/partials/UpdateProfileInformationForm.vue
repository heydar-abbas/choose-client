<script setup lang="ts">
import { ref, reactive, watch } from "vue";
import { useAuthStore } from "~/stores/auth";

defineProps<{
	mustVerifyEmail?: boolean;
	status?: string;
}>();

defineEmits(["change"]);

const auth = useAuthStore();
const { user } = storeToRefs(auth);

const form = reactive({
	name: "",
	email: "",
	image: "",
});

watch(
	() => user.value,
	(newItem) => {
		form.name = newItem?.name;
		form.email = newItem?.email;
		form.image = newItem?.image;
	},
	{ immediate: true }
);

const formErrors = reactive({
	name: "",
	email: "",
});

let previewImage = ref<null | string>(null);
let src = form.image
	? ref<string>(`/_nuxt/assets/images/user_image/${form.image}`)
	: ref<string>("/_nuxt/assets/images/user_image/default.png");

const formData = new FormData();

function onChangeInput(e: any) {
	formData.append("userImage", e.target.files[0] || "");
	form.image = e.target.files[0].name;
	previewImage.value = URL.createObjectURL(e.target.files[0]);
	src.value = previewImage.value;
}

async function updateImage() {
	await useFetch("/api/file/upload/userimage", {
		method: "post",
		body: formData,
	});
}

async function submit() {
	if (formData.get("userImage") !== null) {
		updateImage();
	}

	let { status, inputErrors } = await auth.updateUser(form);

	if (status !== 200) {
		formErrors.name = inputErrors?.name;
		formErrors.email = inputErrors?.email;
	}
}
</script>

<template>
	<section>
		<header>
			<h2 class="text-lg font-medium text-gray-900 dark:text-gray-300">
				Profile Information
			</h2>

			<p class="mt-1 text-sm text-gray-600 dark:text-gray-400">
				Update your account's profile information and email address.
			</p>
		</header>

		<form @submit.prevent="submit" class="mt-6 space-y-6">
			<div>
				<ImageInput
					@change="onChangeInput($event)"
					:src="src"
					resetRoute="profile.resetImage"
					alt="User Image"
				/>
			</div>

			<div>
				<InputLabel for="name" value="Name" />

				<TextInput type="text" class="mt-1 block w-full" v-model="form.name" />

				<InputError
					class="mt-2"
					v-if="formErrors?.name"
					:message="formErrors?.name[0]"
				/>
			</div>

			<div>
				<InputLabel for="email" value="Email" />

				<TextInput
					type="email"
					class="mt-1 block w-full"
					v-model="form.email"
				/>

				<InputError
					class="mt-2"
					v-if="formErrors?.email"
					:message="formErrors?.email[0]"
				/>
			</div>

			<div v-if="mustVerifyEmail && user?.email_verified_at === null">
				<p class="text-sm mt-2 text-gray-800">
					Your email address is unverified.
					<span
						class="underline text-sm text-gray-600 hover:text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
					>
						<!-- :href="route('verification.send')" -->
						Click here to re-send the verification email.
					</span>
				</p>

				<div
					v-show="status === 'verification-link-sent'"
					class="mt-2 font-medium text-sm text-green-600"
				>
					A new verification link has been sent to your email address.
				</div>
			</div>

			<div class="flex items-center gap-4">
				<UiPrimaryButton type="submit"> Save </UiPrimaryButton>
			</div>
		</form>
	</section>
</template>
