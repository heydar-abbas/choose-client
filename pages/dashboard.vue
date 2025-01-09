<script setup lang="ts">
import { onMounted } from "vue";
import { useCategoryStore } from "~/stores/category";
import { useAppStore } from "~/stores/app";
import { useRestaurantStore } from "~/stores/restaurant";
import { useItemStore } from "~/stores/item";

useHead({
	title: "Dashboard",
});

definePageMeta({
	layout: "dashboard",
	middleware: "auth",
});

const app = useAppStore();
const restaurant = useRestaurantStore();
const item = useItemStore();
const category = useCategoryStore();
const successMessage = computed(() => app.successMessage);
const categories = computed(() => category.categories);

onMounted(() => {
	restaurant.fetchUserRestaurants();
	item.fetchUserItems();
	category.fetchCategories();
});
</script>

<template>
	<div class="relative py-4 sm:p-4 h-screen lg:h-auto">
		<SuccessMessage v-show="successMessage" :message="successMessage" />

		<!-- Table section -->
		<DashboardTableSection :userItems="item.userItems" :categories="categories" />
		<!-- :filters="filters" -->
	</div>
</template>
