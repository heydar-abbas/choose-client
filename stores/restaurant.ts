import { useAppStore } from "./app";
import { defineStore } from "pinia";
import { ref } from "vue";
import axios from "axios";

const Axios = axios.create({
	baseURL: "http://localhost:8000",
	withCredentials: true,
	withXSRFToken: true,
});

export const useRestaurantStore = defineStore(
	"restaurant",
	() => {
		const app = useAppStore();
		const cityRestaurants = ref<any>([]);
		const userRestaurants = ref<any>([]);
		const restaurantItems = ref<any>([]);
		const restaurantData = ref<any>({});

		async function addRestaurant(form: any) {
			let status = 0;
			let inputErrors: any = {};
			await Axios.post("/api/restaurants", form)
				.then((response) => {
					status = response.status;
					app.successMessage = response.data.message;
					setTimeout(() => {
						app.successMessage = "";
					}, 5000);
					fetchUserRestaurants();
				})
				.catch((error) => {
					inputErrors = error.response.data.errors;
				});
			return { status, inputErrors };
		}

		async function updateRestaurant(form: any, id: any) {
			let status = 0;
			let inputErrors: any = {};
			await Axios.put(`/api/restaurants/${id}`, form)
				.then((response) => {
					status = response.status;
					app.successMessage = response.data.message;
					setTimeout(() => {
						app.successMessage = "";
					}, 5000);
					fetchUserRestaurants();
				})
				.catch((error) => {
					inputErrors = error?.response?.data?.errors;
				});
			return { status, inputErrors };
		}

		async function fetchCityRestaurants(cityId: any) {
			await Axios.get(`/api/c/restaurants/${cityId}`)
				.then((response) => {
					cityRestaurants.value = response.data.data;
				})
				.catch((error) => {
					console.error(`Fetch city restaurants Error: ${error}`);
				});
		}

		async function fetchUserRestaurants() {
			await Axios.get(`/api/restaurants`)
				.then((response) => {
					userRestaurants.value = response.data.data;
				})
				.catch((error) => {
					console.error(`Fetch user restaurants Error: ${error}`);
				});
		}

		async function fetchRestaurantItems(id: string | string[]) {
			await Axios.get(`/api/restaurant/${id}/items`)
				.then((response) => {
					restaurantItems.value = response.data.data;
				})
				.catch((error) => {
					console.error(`Fetch restaurant items error: ${error}`);
				});
		}

		async function getRestaurantById(id: string | string[]) {
			await Axios.get(`api/restaurant/${id}`)
				.then((response) => {
					restaurantData.value = response.data.data;
				})
				.catch((error) => {
					console.error(`Get Restaurant By Id error: ${error}`);
				});
		}

		return {
			cityRestaurants,
			userRestaurants,
			restaurantItems,
			restaurantData,
			addRestaurant,
			updateRestaurant,
			fetchCityRestaurants,
			fetchUserRestaurants,
			fetchRestaurantItems,
			getRestaurantById,
		};
	},
	{
		persist: {
			storage: piniaPluginPersistedstate.localStorage(),
		},
	}
);
