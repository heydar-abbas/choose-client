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
		const userRestaurants = ref<null | any>(null);

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

		return {
			cityRestaurants,
			userRestaurants,
			addRestaurant,
			updateRestaurant,
			fetchCityRestaurants,
			fetchUserRestaurants,
		};
	},
	{
		persist: true,
	}
);
