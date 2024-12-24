<script setup>
import { useDark, useToggle } from "@vueuse/core";
import { useAppStore } from "~/stores/app";
import { onUnmounted } from "vue";

const route = useRoute();
const app = useAppStore();

const isDark = useDark();
const toggleDark = useToggle(isDark);

onUnmounted(() => {
	app.openHamburgerMenu = false;
});
</script>

<template>
	<nav
		class="py-8 border-b-2"
		:class="route.fullPath === '/' ? 'border-b-gray-600' : 'border-b-gray-300'"
	>
		<div class="relative flex flex-wrap items-center justify-between">
			<!-- LOGO -->
			<AppLogo />
			<div
				class="flex items-center lg:order-2 space-x-3 lg:space-x-0 rtl:space-x-reverse"
			>
				<!-- Dark mode button -->
				<UiDarkModeButton @click="toggleDark()" :isDark="isDark" />

				<!-- User Dropdown -->
				<AppDropdown />

				<button
					@click="app.openHamburgerMenu = !app.openHamburgerMenu"
					type="button"
					class="inline-flex items-center p-2 w-10 h-10 justify-center text-sm rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
					:class="
						route.fullPath === '/'
							? 'text-gray-50'
							: 'text-gray-900 dark:text-gray-50'
					"
				>
					<IconHamburger class="w-5 h-5" />
				</button>
			</div>
			<div
				class="items-center justify-between w-full lg:flex lg:w-auto lg:order-1"
				:class="{
					hidden: !app.openHamburgerMenu,
					'absolute top-10 lg:relative lg:top-0': route.fullPath === '/',
				}"
			>
				<ul
					class="flex flex-col font-medium p-4 lg:p-0 mt-4 rounded-lg bg-gray-50 dark:bg-gray-600 lg:bg-transparent lg:dark:bg-transparent lg:space-x-8 rtl:space-x-reverse lg:flex-row lg:mt-0"
				>
					<li>
						<AppNavLink href="/" :active="route.fullPath === '/'">
							Home
						</AppNavLink>
					</li>
					<li>
						<AppNavLink href="/allcities" :active="route.fullPath === '/cities'">
							All cities
						</AppNavLink>
					</li>
					<li>
						<AppNavLink href="/about" :active="route.fullPath === '/about'">
							About
						</AppNavLink>
					</li>
					<li>
						<AppNavLink href="/contact" :active="route.fullPath === '/contact'">
							Contact
						</AppNavLink>
					</li>
				</ul>
			</div>
		</div>
	</nav>
</template>
