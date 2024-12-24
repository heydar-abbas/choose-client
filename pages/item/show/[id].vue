<script setup lang="ts">
import { useAppStore } from "~/stores/app";
import { useAuthStore } from "~/stores/auth";
import { useItemStore } from "~/stores/item";
import { ref, watch } from "vue";
import { useRoute } from "vue-router";

useHead({
	title: "Show Item",
});

definePageMeta({
	layout: "auth",
});

const route = useRoute();
const app = useAppStore();
const auth = useAuthStore();
const item = useItemStore();

let targetItem = ref<any>(null);
let isAuth = ref(false);

watch(
	() => route.params.id,
	(newId: any) => {
		targetItem.value = item.getItem(newId);
	},
	{ immediate: true }
);

watch(
	() => targetItem.value,
	(newItem: any) => {
		isAuth.value = auth.user?.id == newItem?.user?.id;
	},
	{ immediate: true }
);

const src = targetItem.value?.image
	? ref<string>(`/_nuxt/assets/images/item_image/${targetItem.value?.image}`)
	: ref<string>("/_nuxt/assets/images/item_image/default.png");
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
						{{ targetItem?.title }}
					</h2>
					<p
						class="mb-4 text-xl font-bold leading-none text-gray-900 py-3 border border-b-gray-400 border-l-transparent border-r-transparent border-t-transparent md:text-2xl dark:text-white"
					>
						{{ targetItem?.price }}
						<span class="text-sm text-gray-500 dark:text-gray-400">dinar</span>
					</p>
					<dl>
						<dd
							class="mb-4 font-semibold text-gray-500 py-3 border border-b-gray-400 border-l-transparent border-r-transparent border-t-transparent sm:mb-5 dark:text-gray-400"
						>
							{{ targetItem?.description }}
						</dd>
					</dl>
					<dl class="flex flex-col">
						<dd
							class="mb-4 font-semibold py-3 border border-b-gray-400 border-l-transparent border-r-transparent border-t-transparent text-gray-500 sm:mb-5 dark:text-gray-400"
						>
							#{{ targetItem?.category?.name }}
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
								@click="
									app.openDeleteConfirmation = !app.openDeleteConfirmation
								"
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
		<DeleteConfirmation :item="targetItem" />
	</div>
</template>
