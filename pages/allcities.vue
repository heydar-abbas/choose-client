<script setup lang="ts">
import { useCityStore } from "~/stores/city";
import { onMounted } from "vue";
import { storeToRefs } from "pinia";

useHead({
	title: "All Cities",
});

const city = useCityStore();
const { cities } = storeToRefs(city);

onMounted(() => {
	city.fetchCities();
});
</script>

<template>
	<ul
		class="grid grid-cols-2 md:grid-cols-3 md:max-w-2xl lg:max-w-4xl xl:max-w-5xl mx-auto gap-3 sm:gap-4 py-8 px-4 md:px-0"
	>
		<li
			v-if="cities.length > 0"
			v-for="c in cities"
			:key="c.id"
			class="relative rounded-sm hover:shadow-[-10px_20px_30px_0_rgba(0,0,0,0.6)] hover:scale-105 duration-300 hover:z-10"
		>
			<AppCardCity :city="c" />
		</li>
		<li v-else>
			<p>No cities available.</p>
		</li>
	</ul>
</template>
