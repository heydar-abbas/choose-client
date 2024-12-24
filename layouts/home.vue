<template>
  <div class="relative">
    <!-- Page Header -->
    <header
      class="absolute top-0 left-[50%] -translate-x-[50%] z-50 w-full md:max-w-3xl lg:max-w-4xl xl:max-w-5xl px-4 md:px-6 bg-transparent"
    >
      <AppNav />
    </header>

    <!-- Page Content -->
    <main class="min-h-screen">
      <slot />
    </main>

    <!-- Page Footer -->
    <AppFooter />
  </div>
</template>
