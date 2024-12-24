<script setup>
// import { provide } from "vue";

useHead({
	title: "Home",
});

definePageMeta({
	layout: "home",
});

// const props = defineProps({
//   canLogin: {
//     type: Boolean,
//   },
//   canRegister: {
//     type: Boolean,
//   },
//   restaurants: {
//     type: Object,
//   },
//   filters: {
//     type: Object,
//   },
// });

// provide("canLogin", props.canLogin);
</script>

<template>
	<AppHero />
	<!-- <AppHero :restaurants="restaurants" :filters="filters" /> -->
</template>
