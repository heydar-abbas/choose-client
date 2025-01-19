import { useCityStore } from "~/stores/city";

export default defineNuxtPlugin((nuxtApp) => {
	const city = useCityStore();

	city.fetchCities();

	// return {
	// 	provide: {
	// 		user: await auth.fetchUser()
	// 	},
	// };
});
