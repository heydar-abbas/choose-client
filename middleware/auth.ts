import { useAuthStore } from "~/stores/auth";

export default defineNuxtRouteMiddleware((to, from) => {
	const auth = useAuthStore();

	if (auth.isLogedin) {
		return true;
	}

	if (to.path !== "/") {
		return navigateTo("/");
	}
});
