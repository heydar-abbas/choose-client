<script setup lang="ts">
import { computed } from "vue";

const emit = defineEmits(["update:checked"]);

const props = defineProps<{
	checked: boolean;
	value?: any;
}>();

const proxyChecked = computed({
	get() {
		return props.checked;
	},

	set(val) {
		emit("update:checked", val);
	},
});
</script>

<template>
	<input
		type="checkbox"
		:value="value"
		v-model="proxyChecked"
		class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
	/>
</template>
