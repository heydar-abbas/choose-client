<script setup lang="ts">
const props = defineProps<{
	item: any;
}>();

const src = props.item?.image
	? ref(`/_nuxt/assets/images/item_image/${props.item?.image}`)
	: ref(`/_nuxt/assets/images/item_image/default.png`);
</script>

<template>
	<NuxtLink
		:href="`/item/show/${props.item?.id}`"
		class="flex flex-col items-center bg-white border border-gray-200 rounded-md shadow md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-900 dark:hover:bg-gray-800"
	>
		<img
			class="w-full h-48 object-cover rounded-t-md md:h-full md:rounded-l-md"
			:src="src"
			alt="Item image"
		/>
		<div class="w-full flex flex-col justify-between p-4 leading-normal">
			<h2
				class="mb-2 text-2xl font-bold tracking-tight text-blue-500 dark:text-white"
			>
				{{ item?.title }}
			</h2>
			<p
				class="max-h-[3.6rem] min-h-[3.6rem] overflow-hidden mb-3 text-md font-medium text-gray-500 dark:text-gray-400"
			>
				{{ item?.description }}
			</p>
			<p class="font-semibold text-slate-900 dark:text-gray-400">
				{{ item?.price }}
			</p>
		</div>
	</NuxtLink>
</template>
