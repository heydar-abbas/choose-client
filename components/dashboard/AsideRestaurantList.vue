<script setup lang="ts">
import { useRestaurantStore } from "~/stores/restaurant";

const restaurant = useRestaurantStore();

// console.log(restaurant.userRestaurants);
</script>

<template>
	<div class="p-4 mb-5">
		<h5 class="text-gray-50 text-lg py-2">Restaurans</h5>

		<ul>
			<li
				v-for="r in restaurant.userRestaurants"
				:key="r.id"
				class="flex items-center mb-2"
			>
				<NuxtLink
					:to="`/restaurant/show/${r.id}`"
					class="text-gray-400 w-full px-4 py-1 hover:bg-gray-800"
				>
					{{ r.name }}
				</NuxtLink>
				<NuxtLink
					:to="`/restaurant/edit/${r.id}`"
					class="bg-blue-600 p-1 rounded-md hover:bg-blue-700"
				>
					<IconEdit class="w-4 h-4 text-white" />
				</NuxtLink>
			</li>
		</ul>

		<NuxtLink
			to="/restaurant/create"
			class="text-gray-50 bg-blue-600 hover:bg-blue-700 rounded-md py-2 block text-center"
		>
			<IconPlus class="inline" />
			Add restaurant
		</NuxtLink>
	</div>
</template>
