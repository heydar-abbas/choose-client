<script setup lang="ts">
import { ref, reactive, watch } from "vue";
import { useAuthStore } from "~/stores/auth";
import { useCategoryStore } from "~/stores/category";
import { useRestaurantStore } from "~/stores/restaurant";
import { useItemStore } from "~/stores/item";

useHead({
	title: "Add Item",
});

definePageMeta({
	middleware: "auth",
	layout: "auth",
});

defineEmits(["change"]);

const auth = useAuthStore();
const category = useCategoryStore();
const restaurant = useRestaurantStore();
const item = useItemStore();

const form = reactive({
  user_id: auth.user?.id,
  restaurant_id: "",
  category_id: "",
  title: "",
  price: "",
  description: "",
  image: "",
  previewImage: "",
});
const errorsForm = reactive({
  restaurant_id: "",
  category_id: "",
  title: "",
  price: "",
  description: "",
});
const src = ref("/_nuxt/assets/images/item_image/default.png");

watch(
  () => form.restaurant_id,
  (newValue) => {
    form.restaurant_id = newValue;
  }
);

watch(
  () => form.category_id,
  (newValue) => {
    form.category_id = newValue;
  }
);

const formData = new FormData();
function onChangeInput(e: any) {
	formData.append("itemImage", e.target.files[0] || "");
  form.image = e.target.files[0].name;
  form.previewImage = URL.createObjectURL(e.target.files[0]);
  src.value = form.previewImage;
}

async function uploadImage() {
	await useFetch("/api/file/upload/itemimage", {
		method: "post",
		body: formData,
	});
}

async function submit() {
	if (formData.get("itemImage") !== null) {
		uploadImage();
	}
	
	let { status, inputErrors } = await item.addItem(form);

	if (status === 200) {
		navigateTo("/dashboard");
	} else {
		errorsForm.title = inputErrors?.title;
		errorsForm.price = inputErrors?.price;
		errorsForm.category_id = inputErrors?.category_id;
		errorsForm.restaurant_id = inputErrors?.restaurant_id;
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
          Add a new item
        </h2>
      </header>

      <form @submit.prevent="submit">
        <div class="grid gap-4 sm:grid-cols-2 sm:gap-6 mb-5">
          <div class="sm:col-span-2">
            <ImageInput
              @change="onChangeInput($event)"
              :src="src"
              label="Image"
            />
            <!-- <InputError class="mt-2" :message="form.errors.image" /> -->
          </div>

          <div class="w-full">
            <InputLabel value="Title" for="title" />

            <TextInput
              v-model="form.title"
              type="text"
              id="title"
              placeholder="Type item title..."
            />

						<InputError
							v-if="errorsForm?.title"
							:message="errorsForm?.title[0]"
							class="mt-2"
						/>
          </div>

          <div class="w-full">
            <InputLabel value="Price" for="price" />

            <TextInput
              v-model="form.price"
              type="text"
              id="price"
              placeholder="$2999"
            />

						<InputError
							v-if="errorsForm?.price"
							:message="errorsForm?.price[0]"
							class="mt-2"
						/>
          </div>

          <div class="w-full">
            <InputLabel value="Category" for="category" />

            <SelectInput v-model="form.category_id" id="category">
              <option
                v-for="c in category.categories"
                :key="c.id"
                :value="c.id"
                v-text="c.name"
              ></option>
            </SelectInput>

						<InputError
							v-if="errorsForm?.category_id"
							:message="errorsForm?.category_id[0]"
							class="mt-2"
						/>
          </div>

          <div class="w-full">
            <InputLabel value="Restaurants" for="restaurant" />

            <SelectInput v-model="form.restaurant_id" id="restaurant">
              <option
                v-for="r in restaurant.userRestaurants"
                :key="r.id"
                :value="r.id"
                v-text="r.name"
              ></option>
            </SelectInput>

						<InputError
							v-if="errorsForm?.restaurant_id"
							:message="errorsForm?.restaurant_id[0]"
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
          <UiPrimaryButton type="submit">
            Add Item
          </UiPrimaryButton>

          <UiSecondaryButton>
            <NuxtLink to="/dashboard" as="button"> Cancel </NuxtLink>
          </UiSecondaryButton>
        </div>
      </form>
    </div>
  </section>
</template>
