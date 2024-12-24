import { defineStore } from "pinia";
import { ref } from "vue";
import axios from "axios";

const Axios = axios.create({
	baseURL: "http://localhost:8000",
	withCredentials: true,
	withXSRFToken: true,
});

export const useCityStore = defineStore(
	"city",
	() => {
		const cities = ref<any | null>(null);

		function getCityById(id: string) {
			let city: any = {};
			if (cities.value) {
				city = cities.value.filter((item: any) => item.id == id)[0];
			}
			return city;
		}

		async function fetchCities() {
			await Axios.get("/api/allcities")
				.then((response) => {
					cities.value = response.data.data;
				})
				.catch((err) => {
					console.error(`Fetch cities error: ${err}`);
				});
		}

		return { cities, fetchCities, getCityById };
	},
	{
		persist: {
			storage: piniaPluginPersistedstate.localStorage(),
		},
	}
);
