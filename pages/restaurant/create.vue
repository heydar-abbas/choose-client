<script setup lang="ts">
import { ref, reactive, watch } from "vue";
import { useRestaurantStore } from "~/stores/restaurant";
import { useCityStore } from "~/stores/city";
import { useAuthStore } from "~/stores/auth";

useHead({
	title: "Add Restaurant",
});

definePageMeta({
	middleware: "auth",
	layout: "auth",
});

defineEmits(["change"]);

const auth = useAuthStore();
const city = useCityStore();
const restaurant = useRestaurantStore();
const form = reactive({
	user_id: auth.user?.id,
	city_id: "",
	name: "",
	description: "",
	location: "",
	phone: "",
	logo: "",
	open_at: "",
	close_at: "",
	previewLogo: "",
});

const errorsForm = reactive({
	city_id: "",
	name: "",
	description: "",
	location: "",
	phone: "",
	open_at: "",
	close_at: "",
});
const src = ref("/_nuxt/assets/images/restaurant_logo/default.png");

watch(
	() => form.city_id,
	(newValue) => {
		form.city_id = newValue;
	}
);

const formData = new FormData();
function onChangeInput(e: any) {
	formData.append("logo", e.target.files[0] || "");
	form.logo = e.target.files[0].name;
	form.previewLogo = URL.createObjectURL(e.target.files[0]);
	src.value = form.previewLogo;
}

async function uploadImage() {
	await useFetch("/api/file/upload/restaurantlogo", {
		method: "post",
		body: formData,
	});
}

async function submit() {
	if (formData.get("logo") !== null) {
		uploadImage();
	}
	
	let { status, inputErrors } = await restaurant.addRestaurant(form);

	if (status === 200) {
		navigateTo("/dashboard");
	} else {
		errorsForm.name = inputErrors?.name;
		errorsForm.location = inputErrors?.location;
		errorsForm.phone = inputErrors?.phone;
		errorsForm.city_id = inputErrors?.city_id;
		errorsForm.open_at = inputErrors?.open_at;
		errorsForm.close_at = inputErrors?.close_at;
		errorsForm.description = inputErrors?.description;
	}
}
</script>

<template>
	<section
		class="min-h-screen flex items-center justify-center bg-white dark:bg-gray-800"
	>
		<div class="p-4 md:p-0 w-full md:max-w-2xl xl:max-w-4xl">
			<header>
				<h2 class="mb-4 text-xl font-bold text-gray-900 dark:text-white">
					Add a new restaurant
				</h2>
			</header>

			<form @submit.prevent="submit">
				<div class="grid gap-4 sm:grid-cols-2 sm:gap-6 mb-5">
					<div class="sm:col-span-2">
						<ImageInput
							@change="onChangeInput($event)"
							:src="src"
							label="Restaurant logo"
						/>
						<!-- <InputError class="mt-2" :message="form.errors.image" /> -->
					</div>

					<div class="w-full">
						<InputLabel value="Name" for="name" />

						<TextInput
							v-model="form.name"
							type="text"
							id="name"
							placeholder="Type Restaurant name..."
						/>

						<InputError
							v-if="errorsForm?.name"
							:message="errorsForm?.name[0]"
							class="mt-2"
						/>
					</div>

					<div class="w-full">
						<InputLabel value="Location" for="location" />

						<TextInput
							v-model="form.location"
							type="text"
							id="location"
							placeholder="Location"
						/>

						<InputError
							v-if="errorsForm?.location"
							:message="errorsForm?.location[0]"
							class="mt-2"
						/>
					</div>

					<div class="w-full">
						<InputLabel value="Phone" for="phone" />

						<TextInput
							v-model="form.phone"
							type="text"
							id="phone"
							placeholder="Phone"
						/>

						<InputError
							v-if="errorsForm?.phone"
							:message="errorsForm?.phone[0]"
							class="mt-2"
						/>
					</div>

					<div class="w-full">
						<InputLabel value="City" for="city_id" />

						<SelectInput v-model="form.city_id" id="city_id">
							<option
								v-for="c in city.cities"
								:key="c.id"
								:value="c.id"
								v-text="c.name"
							></option>
						</SelectInput>

						<InputError
							v-if="errorsForm?.city_id"
							:message="errorsForm?.city_id[0]"
							class="mt-2"
						/>
					</div>

					<div class="w-full">
						<InputLabel value="Open at" for="open_at" />

						<TextInput v-model="form.open_at" type="time" id="open_at" />

						<InputError
							v-if="errorsForm?.open_at"
							:message="errorsForm?.open_at[0]"
							class="mt-2"
						/>
					</div>

					<div class="w-full">
						<InputLabel value="Close at" for="close_at" />

						<TextInput v-model="form.close_at" type="time" id="close_at" />

						<InputError
							v-if="errorsForm?.close_at"
							:message="errorsForm?.close_at[0]"
							class="mt-2"
						/>
					</div>

					<div class="sm:col-span-2">
						<InputLabel value="Description" for="description" />

						<TextAreaInput
							v-model="form.description"
							id="description"
							placeholder="Your description here..."
						/>

						<InputError
							v-if="errorsForm?.description"
							:message="errorsForm?.description[0]"
							class="mt-2"
						/>
					</div>
				</div>

				<div class="flex items-center gap-4">
					<UiPrimaryButton type="submit"> Add </UiPrimaryButton>

					<UiSecondaryButton>
						<NuxtLink to="/dashboard"> Cancel </NuxtLink>
					</UiSecondaryButton>
				</div>
			</form>
		</div>
	</section>
</template>
