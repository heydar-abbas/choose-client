<script setup>
defineProps({
	isDark: Boolean,
});
</script>

<template>
	<div class="mr-1 md:mr-4">
		<button
			type="button"
			class="text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-1.5"
		>
			<IconMoon class="w-5 h-5" v-show="!isDark" />
			<IconSun class="w-5 h-5" v-show="isDark" />
		</button>
	</div>
</template>
