<script setup lang="ts">
import { useAppStore } from "~/stores/app";
import { useDashboardStore } from "~/stores/dashboard";

defineProps<{
  item: any;
}>();

const app = useAppStore();
const dashboard = useDashboardStore();
</script>

<template>
  <div
    @click="dashboard.openRecordDropdown = false"
    :class="{ hidden: !dashboard.openRecordDropdown }"
    class="absolute top-0 left-0 z-10 h-full w-full flex items-center justify-center bg-transparent"
  >
    <div
      class="w-44 bg-white rounded divide-y divide-gray-100 shadow-xl dark:bg-gray-700 dark:divide-gray-600"
    >
      <ul class="py-1 text-sm text-gray-700 dark:text-gray-200">
        <li>
          <NuxtLink
            :to="`/item/show/${item.id}`"
            class="block w-full text-left py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
          >
            Show
          </NuxtLink>
        </li>
        <li>
          <NuxtLink
            :to="`/item/edit/${item.id}`"
            class="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
          >
            Edit
          </NuxtLink>
        </li>
      </ul>
      <div class="py-1">
        <button
          @click="app.openDeleteConfirmation = true"
          class="block w-full py-2 px-4 text-left text-sm font-semibold text-red-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
          type="button"
        >
          Delete
        </button>
      </div>
    </div>
  </div>
</template>
