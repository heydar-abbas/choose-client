<script setup lang="ts">
import { ref } from "vue";
import { useRoute } from "vue-router";
import { useAppStore } from "~/stores/app";
import { useAuthStore } from "~/stores/auth";
import { storeToRefs } from "pinia";

const app = useAppStore();
const auth = useAuthStore();
const { user } = storeToRefs(auth);

const route = useRoute();
const src = user.value?.image
	? ref(`/_nuxt/assets/images/user_image/${user.value?.image}`)
	: ref("/_nuxt/assets/images/user_image/default.png");

function handleLogout() {
	auth.logout();
	app.openUserMenu = false;
	navigateTo("/");
}
</script>

<template>
	<div class="flex justify-end">
		<div
			v-if="user"
			class="relative flex items-center lg:order-2 space-x-3 lg:space-x-0 rtl:space-x-reverse"
		>
			<button
				@click="app.openUserMenu = !app.openUserMenu"
				class="flex text-sm bg-gray-800 rounded-full md:me-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
			>
				<img
					class="w-8 h-8 rounded-full bg-gray-50 dark:bg-gray-600"
					:src="src"
					alt="user photo"
				/>
			</button>
			<!-- Dropdown menu -->
			<div
				class="absolute top-10 right-0 z-50 w-[13rem] text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600"
				:class="{ hidden: !app.openUserMenu }"
			>
				<div class="px-4 py-3">
					<span class="block text-sm text-gray-900 dark:text-white">
						{{ user?.name }}
					</span>
					<span class="block text-sm text-gray-500 truncate dark:text-gray-400">
						{{ user?.email }}
					</span>
				</div>
				<ul class="py-2">
					<li>
						<AppDropdownLink
							href="/dashboard"
							@click="app.openUserMenu = false"
							:class="{ hidden: $route.fullPath === '/dashboard' }"
						>
							Dashboard
						</AppDropdownLink>
					</li>
					<li>
						<AppDropdownLink
							href="/profile/edit"
							@click="app.openUserMenu = false"
						>
							Profile
						</AppDropdownLink>
					</li>
					<li>
						<button
							type="button"
							@click="handleLogout"
							class="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
						>
							Sign out
						</button>
					</li>
				</ul>
			</div>
		</div>
		<div v-else>
			<NuxtLink
				to="/auth/login"
				class="text-xl font-bold dark:text-gray-50 hover:text-blue-500 dark:hover:text-blue-500"
				:class="route.fullPath === '/' ? 'text-gray-50' : 'text-gray-900'"
			>
				Log in
			</NuxtLink>
		</div>
	</div>
</template>
