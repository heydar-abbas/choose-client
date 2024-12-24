<script setup lang="ts">

</script>

<template>
  <aside class="h-screen bg-gray-900">
    <div class="flex justify-between p-4">
      <AppLogo />
      <!-- Close button -->
      <div class="flex items-center">
        <slot name="close_button"></slot>
      </div>
    </div>

    <DashboardAsideRestaurantList />
  </aside>
</template>
