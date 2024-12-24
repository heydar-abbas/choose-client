<template>
  <div>
    <!-- Page Header -->
    <header class="dark:bg-gray-700">
      <div
        class="max-w-3xl md:max-w-2xl lg:max-w-4xl xl:max-w-5xl mx-auto px-4 md:px-0"
      >
        <AppNav />
      </div>
    </header>

    <!-- Page Content -->
    <main class="min-h-screen dark:bg-gray-700">
      <slot />
    </main>

    <!-- Page Footer -->
    <AppFooter />
  </div>
</template>
