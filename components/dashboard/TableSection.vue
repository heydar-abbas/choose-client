<script setup lang="ts">
import { reactive, ref, watch, onMounted } from "vue";
import { useDebounceFn } from "@vueuse/core";
import { useDashboardStore } from "~/stores/dashboard";
import { useRestaurantStore } from "~/stores/restaurant";
import { useItemStore } from "~/stores/item";

const props = defineProps<{
  categories?: any;
  filters?: any;
}>();

const dashboard = useDashboardStore();
const restaurant = useRestaurantStore();
const item = useItemStore();
const itemClicked = ref(null);
let params = reactive({
  // search: props.filters.search,
  // field: props.filters.field ?? "id",
  // direction: props.filters.direction ?? "asc",
});

onMounted(() => {
  restaurant.fetchUserRestaurants();
	item.fetchUserItems();
});

function sort(field: string) {
  // params.field = field;
  // params.direction = params.direction === "asc" ? "desc" : "asc";
}

// watch(
//   params,
//   useDebounceFn(() => {
//     let p = params;

//     Object.keys(p).forEach((key) => {
//       if (p[key] === "") {
//         delete p[key];
//       }
//     });

//     router.get(route("dashboard"), p, {
//       preserveState: true,
//       replace: true,
//     });
//   }, 300)
// );

function openActionsRecord(selectedItem: any) {
  dashboard.openRecordDropdown = !dashboard.openRecordDropdown;
  itemClicked.value = selectedItem;
}

// function updatePaginateNumber(link: any) {
//   let pageNum = link.url.split("=")[1];
//   router.visit("/dashboard?page=" + pageNum, {
//     preserveScroll: true,
//   });
// }
</script>

<template>
  <section
    class="bg-gray-50 dark:bg-gray-900 p-3 mt-5 sm:p-0 sm:rounded-lg mx-auto"
  >
    <div class="mx-auto w-full">
      <div
        class="bg-white dark:bg-gray-800 relative sm:rounded-lg overflow-hidden"
      >
        <div
          class="flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0 md:space-x-4 p-4"
        >
          <!-- Search -->
          <DashboardSearchBar /> <!-- v-model="params.search" -->
          <div
            class="w-full md:w-auto flex flex-col md:flex-row space-y-2 md:space-y-0 items-stretch md:items-center justify-end md:space-x-3 flex-shrink-0"
          >
            <!-- Add Item Button -->
            <UiAddItemButton />
            <div class="flex items-center space-x-3 w-full md:w-auto">
              <!-- Actions Button -->
              <UiActionsButton
                @click="
                  dashboard.openActionButton = !dashboard.openActionButton
                "
              />
            </div>
          </div>
        </div>
        <!-- Start Table -->
        <table
          class="relative w-full min-h-[9rem] text-sm text-left text-gray-500 dark:text-gray-400"
        >
          <thead
            class="w-full text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400"
          >
            <tr class="grid grid-cols-5 items-center w-full">
              <th
                @click="sort('id')"
                class="px-4 py-3 flex justify-between items-center"
              >
                <span>#ID</span>
                <IconSort class="hidden sm:block" />
              </th>
              <th
                @click="sort('title')"
                class="px-4 py-3 flex justify-between items-center"
              >
                <span>Title</span>
                <IconSort class="hidden sm:block" />
              </th>
              <th
                @click="sort('category')"
                class="px-4 py-3 flex justify-between items-center"
              >
                <span>Category</span>
                <IconSort class="hidden sm:block" />
              </th>
              <th
                @click="sort('price')"
                class="px-4 py-3 flex justify-between items-center"
              >
                <span>Price</span>
                <IconSort class="hidden sm:block" />
              </th>
              <th
                @click="sort('restaurant_id')"
                class="px-4 py-3 flex justify-between items-center"
              >
                <span>Restaurant</span>
                <IconSort class="hidden sm:block" />
              </th>
            </tr>
          </thead>

          <tbody class="w-full">
            <tr
              v-if="item.userItems.length > 0"
              v-for="(userItem, index) in item.userItems"
              :key="userItem.id"
              @click="openActionsRecord(userItem)"
              class="w-full grid grid-cols-5 border-b dark:border-gray-700 dark:hover:bg-gray-700 hover:bg-gray-100"
            >
              <th class="px-4 py-3 font-medium text-gray-900 dark:text-white">
                {{ index + 1 }}
              </th>
              <td class="px-4 py-3">
                {{ userItem.title }}
              </td>
              <td class="px-4 py-3">
                {{ userItem.category.name }}
              </td>
              <td class="px-4 py-3">
                {{ userItem.price }}
              </td>
              <td class="px-4 py-3">
                {{ userItem.restaurant.name }}
              </td>
            </tr>
            <tr v-else class="w-full border-b dark:border-gray-700">
              <th class="px-4 py-3 text-center">
                Table is empty!
              </th>
            </tr>
          </tbody>
        </table>
        <!-- Record Dropdown -->
        <DashboardRecordDropdown v-if="itemClicked" :item="itemClicked" />

        <!-- Pagination -->
        <!-- <DashboardPagination :meta="items.meta" /> -->
      </div>
    </div>

    <!-- Delete Modal -->
    <DeleteConfirmation :item="itemClicked" />
  </section>
</template>
