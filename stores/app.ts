import { defineStore } from "pinia";
import { ref } from "vue";

export const useAppStore = defineStore("app", () => {
	const openHamburgerMenu = ref<boolean>(false);
	const openUserMenu = ref<boolean>(false);
	const openDeleteConfirmation = ref<boolean>(false);
	const successMessage = ref<string>("");

	return {
		openHamburgerMenu,
		openUserMenu,
		openDeleteConfirmation,
		successMessage,
	};
});
