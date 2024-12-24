import { defineStore } from "pinia";
import { ref } from "vue";
import axios from "axios";

const Axios = axios.create({
	baseURL: "http://localhost:8000",
	withCredentials: true,
	withXSRFToken: true,
});

export const useCategoryStore = defineStore(
	"category",
	() => {
		const categories = ref<any | null>(null);

		async function fetchCategories() {
			await Axios.get("/api/categories")
				.then((response) => {
					categories.value = response.data.data;
				})
				.catch((err) => {
					console.error(`Fetch categories error: ${err}`);
				});
		}

		return { categories, fetchCategories };
	},
	{
		persist: {
			storage: piniaPluginPersistedstate.localStorage(),
		},
	}
);
