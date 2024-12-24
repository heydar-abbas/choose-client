<script setup lang="ts">
import { useRestaurantStore } from "~/stores/restaurant";
import { useCityStore } from "~/stores/city";
import { onMounted, watch, ref } from "vue";
import { useRoute } from "vue-router";
import { storeToRefs } from "pinia";

useHead({
	title: "City restaurants",
});

const route = useRoute();
const city = useCityStore();
const restaurant = useRestaurantStore();
const { cityRestaurants } = storeToRefs(restaurant);
let cityName = ref<string>("");

watch(
	() => route.params.id,
	async (newId: any) => {
		const cityData = await city.getCityById(newId);
		cityName.value = cityData?.name || "Unknown City";
	},
	{ immediate: true }
);

onMounted(() => {
	restaurant.fetchCityRestaurants(route.params.id);
});
</script>

<template>
	<div
		class="w-full md:max-w-2xl lg:max-w-4xl xl:max-w-5xl mx-auto px-4 md:px-0"
	>
		<div class="py-6 text-gray-900 dark:text-gray-50">
			<h1 class="text-gray-900 text-3xl font-bold dark:text-gray-50">
				{{ cityName }} Restaurants
			</h1>
		</div>

		<div class="h-screen py-6">
			<div
				v-if="cityRestaurants.length > 0"
				v-for="(cr, index) in cityRestaurants"
				:key="index"
			>
				<RestaurantCard :restaurant="cr" />
			</div>
			<div v-else>
				<p class="text-center text-xl text-gray-900 py-8 dark:text-gray-50">
					No Restaurants yet!
				</p>
			</div>
		</div>
	</div>
</template>
