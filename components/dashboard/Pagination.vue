<script setup>
// defineProps({
//   meta: Object,
// });
</script>

<template>
  <nav
    class="flex flex-col md:flex-row justify-between items-start md:items-center space-y-3 md:space-y-0 p-4"
    aria-label="Table navigation"
  >
    <span class="text-sm font-normal text-gray-500 dark:text-gray-400">
      Showing
      <span class="font-semibold text-gray-900 dark:text-white">
        <!-- {{ meta.from }}-{{ meta.to }} -->
          1-10
      </span>
      of
      <span class="font-semibold text-gray-900 dark:text-white">
        <!-- {{ meta.total }} -->
          100
      </span>
    </span>
    <ul class="inline-flex items-stretch -space-x-px">
      <!-- <li v-for="(link, index) in meta.links" :key="index">
        <component
          :is="link.url ? 'Link' : 'span'"
          :href="link.url"
          v-html="link.label"
          class="flex items-center justify-center text-xs py-2 px-3 leading-tight text-gray-500 border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white cursor-pointer"
          :class="{
            'bg-primary-100 font-bold': link.active,
            'dark:bg-gray-800': !link.active,
          }"
        />
      </li> -->
    </ul>
  </nav>

<!-- <ul class="inline-flex items-stretch -space-x-px">
      <li v-for="(link, index) in items.meta.links" :key="index">
        <button
          @click="updatePaginateNumber(link)"
          class="flex items-center justify-center text-sm py-2 px-3 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white cursor-pointer"
          :class="{'bg-primary-100 dark:bg-gray-500 dark:text-gray-900 font-bold cursor-default':link.active}"
          :disabled="link.active || !link.url"
          v-html="link.label"
        ></button>
      </li>
    </ul> -->
</template>
