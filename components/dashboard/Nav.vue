<script setup lang="ts">
import { useDashboardStore } from "~/stores/dashboard";
import { useDark, useToggle } from "@vueuse/core";
import { storeToRefs } from "pinia";

const isDark = useDark();
const toggleDark = useToggle(isDark);

const dashboard = useDashboardStore();
const { openDashboardSidebar } = storeToRefs(dashboard);
</script>

<template>
	<div class="bg-white dark:bg-gray-900">
		<div
			class="flex flex-wrap items-center justify-between lg:justify-end mx-auto p-4 border border-b-gray-200 border-r-transparent border-l-transparent dark:border-none"
		>
			<!-- Sidbar button -->
			<div class="lg:hidden">
				<IconBars
					@click="openDashboardSidebar = !openDashboardSidebar"
					class="h-7 w-7 text-gray-900 dark:text-gray-50 cursor-pointer"
				/>
			</div>
			<div
				class="flex items-center lg:order-2 space-x-3 lg:space-x-0 rtl:space-x-reverse"
			>
				<!-- Dark mode button -->
				<UiDarkModeButton @click="toggleDark()" :isDark="isDark" />
				<!-- User Dropdown -->
				<AppDropdown />
			</div>
		</div>
	</div>
</template>
