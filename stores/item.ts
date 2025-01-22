import { useAppStore } from "./app";
import { defineStore } from "pinia";
import { ref } from "vue";
import axios from "axios";

const Axios = axios.create({
	baseURL: "http://localhost:8000",
	withCredentials: true,
	withXSRFToken: true,
});

export const useItemStore = defineStore(
	"item",
	() => {
		const app = useAppStore();
		const userItems = ref<any>([]);
		const itemData = ref<any>({});
		const filters = ref<any>({});

		async function getItemById(id: string | string[]) {
			await Axios.get(`api/item/${id}`)
				.then((response) => {
					itemData.value = response.data.data;
				})
				.catch((error) => {
					console.error(`GetItemById error: ${error}`);
				});
		}

		async function fetchUserItems(params: {} = "") {
			await Axios.get("/api/items", { params })
				.then((response) => {
					userItems.value = response.data.items;
					filters.value = response.data.filters;
				})
				.catch((error) => {
					console.error(`Item Error: ${error}`);
				});
		}

		async function addItem(form: any) {
			let status = 0;
			let inputErrors: any = {};
			await Axios.post("/api/items", form)
				.then((response) => {
					status = response.status;
					app.successMessage = response.data.message;
					fetchUserItems();
					setTimeout(() => {
						app.successMessage = "";
					}, 5000);
				})
				.catch((error) => {
					inputErrors = error.response.data.errors;
				});
			return { status, inputErrors };
		}

		async function updateItem(form: any, id: string | string[]) {
			let status = 0;
			let inputErrors: any = {};
			await Axios.put(`/api/items/${id}`, form)
				.then(async (response) => {
					status = response.status;
					app.successMessage = response.data.message;
					await fetchUserItems();
					// await fetchRestaurantItems(form.restaurant_id);
					setTimeout(() => {
						app.successMessage = "";
					}, 5000);
				})
				.catch((error) => {
					inputErrors = error.response.data.errors;
				});
			return { status, inputErrors };
		}

		async function deleteItem(id: string | string[]) {
			let status = 0;
			await Axios.delete(`/api/items/${id}`)
				.then((response) => {
					status = response.status;
					app.successMessage = response.data.message;
					fetchUserItems();
					setTimeout(() => {
						app.successMessage = "";
					}, 5000);
				})
				.catch((error) => {
					console.error(`Item Error: ${error}`);
				});
			return { status };
		}

		return {
			itemData,
			userItems,
			filters,
			fetchUserItems,
			addItem,
			updateItem,
			getItemById,
			deleteItem,
		};
	},
	{
		persist: {
			storage: piniaPluginPersistedstate.localStorage(),
		},
	}
);
