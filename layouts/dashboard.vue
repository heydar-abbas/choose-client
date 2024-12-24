<script setup lang="ts">
import { useAppStore } from "~/stores/app";
import { useDashboardStore } from "~/stores/dashboard";

const app = useAppStore();
const dashboard = useDashboardStore();

onUnmounted(() => {
	dashboard.openDashboardSidebar = false;
	dashboard.openDashboardUserMenu = false;
	dashboard.openActionButton = false;
	dashboard.openFilterButton = false;
	dashboard.openRecordDropdown = false;
  app.openDeleteConfirmation = false;
});
</script>

<template>
	<main class="min-h-screen dark:bg-gray-700">
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
				class="flex flex-col w-full lg:basis-3/4 xl:basis-4/5 bg-gray-50 dark:bg-gray-800"
			>
				<!-- Navbar -->
				<DashboardNav />
        <!-- Content -->
				<slot />
			</div>
		</div>
	</main>
</template>
