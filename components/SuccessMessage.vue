<script setup lang="ts">
defineProps<{
	message: string | null;
}>();
</script>

<template>
	<div 
		class="absolute z-50 top-0 left-0 sm:left-8 md:top-10 md:left-10 w-full sm:w-[80%] md:w-[50%] p-4 md:px-5 rounded-lg"
		:class="`bg-green-200`"
	>
		<div
			class="font-bold"
			:class="`text-green-600`"
			v-text="message"
		></div>
	</div>
</template>
