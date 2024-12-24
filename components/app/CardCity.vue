<script setup lang="ts">
import { ref } from "vue";

const props = defineProps<{
	city: any;
}>();

const src = ref(`/_nuxt/assets/images/city_images/${props.city?.image}`);
</script>

<template>
	<NuxtLink :to="`/cities/show/${city?.id}`">
		<img
			:src="src"
			alt="City image"
			class="w-full h-full object-cover rounded-sm"
		/>
	</NuxtLink>
	<div
		class="absolute bottom-0 left-0 w-full h-24 rounded-sm flex flex-col justify-end bg-gradient-to-t from-slate-900 to-transparent bg-opacity-20 px-5 py-3"
	>
		<h2 class="text-white font-bold text-2xl">
			{{ city?.name }}
		</h2>
		<p class="text-gray-300 font-bold">Restaurants</p>
	</div>
</template>
