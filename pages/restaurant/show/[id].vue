<script setup lang="ts">
import { useItemStore } from "~/stores/item";
import { useRoute } from "vue-router";
import { computed, onMounted } from "vue";

useHead({
	title: "Restaurant Menu",
	meta: [
		{
			name: "description",
			content: "Restaurant Menu",
		},
	],
});

const route = useRoute();
const item = useItemStore();
const { restaurantItems } = storeToRefs(item);
const restaurantName = computed(
	() => restaurantItems.value[0]?.restaurant?.name
);
const itemSortDropDown = ref(false);

onMounted(() => {
	item.fetchRestaurantItems(route.params.id);
});
</script>

<template>
	<section
		class="antialiased px-4 mb-8 lg:px-0 mx-auto w-full md:max-w-2xl lg:max-w-4xl xl:max-w-5xl bg-white dark:bg-gray-700"
	>
		<div class="mx-auto px-4 py-8 md:px-0">
			<h1
				class="font-semibold text-2xl text-gray-900 leading-tight dark:text-gray-50"
			>
				{{ restaurantName }} Menu
			</h1>
		</div>

		<div>
			<!-- Heading & Filters -->
			<div
				class="mb-4 items-end justify-between space-y-4 sm:flex sm:space-y-0 md:mb-8"
			>
				<div class="relative flex items-center">
					<button
						@click="itemSortDropDown = !itemSortDropDown"
						type="button"
						class="flex w-full items-center justify-center rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:ring-gray-700 sm:w-auto"
					>
						<IconSort class="-ms-0.5 me-2 h-4 w-4" />
						Sort
						<IconChevronDown class="-me-0.5 ms-2 h-4 w-4" />
					</button>
					<ItemSortDropDown :class="{ hidden: !itemSortDropDown }" />
				</div>
			</div>
			<!-- Items List -->
			<ul
				v-if="restaurantItems.length > 0"
				class="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4"
			>
				<li v-for="(item, index) in restaurantItems" :key="index">
					<ItemCard :item="item" />
				</li>
			</ul>
			<p
				v-else
				class="text-center text-xl text-gray-900 py-8 dark:text-gray-50"
			>
				No Restaurants yet!
			</p>
			<div class="w-full text-center">
				<button
					type="button"
					class="rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:ring-gray-700"
				>
					Show more
				</button>
			</div>
		</div>
	</section>
</template>
