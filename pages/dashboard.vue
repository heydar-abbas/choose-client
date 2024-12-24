<script setup lang="ts">
import { onMounted } from "vue";
import { useCategoryStore } from "~/stores/category";
import { useAppStore } from "~/stores/app";

useHead({
	title: "Dashboard",
});

definePageMeta({
	layout: "dashboard",
	middleware: "auth",
});

const app = useAppStore();
const category = useCategoryStore();

const successMessage = computed(() => app.successMessage);
const categories = computed(() => category.categories);

onMounted(() => {
	category.fetchCategories();
});
</script>

<template>
	<div class="relative py-4 sm:p-4 h-screen lg:h-auto sm:overflow-auto">
		<SuccessMessage
			v-show="successMessage"
			:message="successMessage"
		/>
		<!-- Table section -->
		<DashboardTableSection :categories="categories" />
		<!-- :filters="filters" -->
	</div>
</template>
