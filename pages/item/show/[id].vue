<script setup lang="ts">
import { useAppStore } from "~/stores/app";
import { useAuthStore } from "~/stores/auth";
import { useItemStore } from "~/stores/item";
import { ref, watchEffect } from "vue";
import { useRoute } from "vue-router";
import { storeToRefs } from "pinia";

useHead({
	title: "Show Item",
});

definePageMeta({
	layout: "auth",
});

const route = useRoute();
const app = useAppStore();
const { openDeleteConfirmation } = storeToRefs(app);

const auth = useAuthStore();
const { isLogedin, user } = storeToRefs(auth);

const item = useItemStore();
const { itemData } = storeToRefs(item);
let isAuth = ref(false);

watchEffect(() => {
	item.getItemById(route.params.id);
});

watchEffect(() => {
	isAuth.value = isLogedin.value && user.value?.id == itemData.value?.user?.id;
});

const src = itemData.value?.image
	? ref(`/_nuxt/assets/images/item_image/${itemData.value?.image}`)
	: ref("/_nuxt/assets/images/item_image/default.png");
</script>

<template>
	<div
		class="relative flex justify-center items-center min-h-screen bg-gray-50 dark:bg-gray-700"
	>
		<div class="w-full md:max-w-2xl lg:max-w-4xl">
			<section
				class="w-full rounded-lg sm:grid grid-flow-row-dense grid-cols-3"
			>
				<div class="w-full">
					<img
						:src="src"
						alt="Item Image"
						class="h-80 w-96 sm:h-96 md:h-full md:rounded-lg object-cover"
					/>
				</div>

				<div class="sm:col-span-2 py-8 px-4 lg:py-16">
					<h2
						class="mb-2 text-xl font-bold leading-none text-gray-900 py-3 border border-b-gray-400 border-l-transparent border-r-transparent border-t-transparent md:text-2xl dark:text-white"
					>
						{{ itemData?.title }}
					</h2>
					<p
						class="mb-4 text-xl font-bold leading-none text-gray-900 py-3 border border-b-gray-400 border-l-transparent border-r-transparent border-t-transparent md:text-2xl dark:text-white"
					>
						{{ itemData?.price }}
						<span class="text-sm text-gray-500 dark:text-gray-400">dinar</span>
					</p>
					<dl>
						<dd
							class="mb-4 font-semibold text-gray-500 py-3 border border-b-gray-400 border-l-transparent border-r-transparent border-t-transparent sm:mb-5 dark:text-gray-400"
						>
							{{ itemData?.description }}
						</dd>
					</dl>
					<dl class="flex flex-col">
						<dd
							class="mb-4 font-semibold py-3 border border-b-gray-400 border-l-transparent border-r-transparent border-t-transparent text-gray-500 sm:mb-5 dark:text-gray-400"
						>
							#{{ itemData?.category?.name }}
						</dd>
					</dl>

					<div class="flex items-center justify-between space-x-4">
						<div v-if="isAuth" class="flex items-center gap-4">
							<UiPrimaryButton type="submit">
								<NuxtLink
									:to="`/item/edit/${route.params.id}`"
									class="flex items-center"
								>
									<IconEdit class="mr-1 -ml-1 w-4 h-4" />
									Edit
								</NuxtLink>
							</UiPrimaryButton>

							<UiDangerButton
								@click="openDeleteConfirmation = !openDeleteConfirmation"
							>
								<IconTrash class="w-4 h-4 mr-1.5 -ml-1" />
								Delete
							</UiDangerButton>
						</div>
						<UiSecondaryButton onclick="history.back()">
							Back
						</UiSecondaryButton>
					</div>
				</div>
			</section>
		</div>
		<!-- Delete Modal -->
		<DeleteConfirmation :item="itemData" />
	</div>
</template>
