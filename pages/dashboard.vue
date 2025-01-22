<template>
	<div class="min-h-screen dark:bg-gray-700">
		<div class="relative flex flex-col lg:flex-row">
			<!-- Main Sidebar -->
			<DashboardSideBar class="hidden lg:block lg:basis-1/4 xl:basis-1/5" />

			<!-- Floating Sidebar -->
			<DashboardSideBar
				class="fixed top-0 left-0 z-50 lg:hidden w-64 duration-300"
				:class="{ '-translate-x-full': !dashboard.openDashboardSidebar }"
			>
				<template #close_button>
					<IconClose
						@click="
							dashboard.openDashboardSidebar = !dashboard.openDashboardSidebar
						"
						class="text-gray-50 cursor-pointer"
					/>
				</template>
			</DashboardSideBar>

			<div
				class="flex flex-col w-full lg:basis-3/4 xl:basis-4/5 overflow-hidden bg-gray-50 dark:bg-gray-800"
			>
				<!-- Navbar -->
				<DashboardNav />
				<!-- Content -->
				<div class="relative py-4 sm:p-4 h-screen lg:h-auto">
					<SuccessMessage v-show="successMessage" :message="successMessage" />

					<!-- Table section -->
					<DashboardTableSection />
				</div>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted } from "vue";
import { useAppStore } from "~/stores/app";
import { useDashboardStore } from "~/stores/dashboard";
import { useRestaurantStore } from "~/stores/restaurant";

useHead({
	title: "Dashboard",
});

definePageMeta({
	layout: false,
	middleware: "auth",
});

const app = useAppStore();
const dashboard = useDashboardStore();
const restaurant = useRestaurantStore();
const successMessage = computed(() => app.successMessage);

onMounted(() => {
	restaurant.fetchUserRestaurants();

	dashboard.openDashboardSidebar = false;
});

onUnmounted(() => {
	dashboard.openDashboardSidebar = false;
	dashboard.openDashboardUserMenu = false;
	dashboard.openActionButton = false;
	dashboard.openFilterButton = false;
	dashboard.openRecordDropdown = false;
	app.openDeleteConfirmation = false;
});
</script>
