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
		const restaurantItems = ref<any>([]);

		function getItem(id: string) {
			let targrtItem: any = {};
			targrtItem = userItems.value.filter((item: any) => item.id == id)[0];
			return targrtItem;
		}

		async function fetchUserItems() {
			await Axios.get("/api/items")
				.then((response) => {
					userItems.value = response.data.data;
				})
				.catch((error) => {
					console.error(`Item Error: ${error}`);
				});
		}

		async function fetchRestaurantItems(id: string |string[]) {
			await Axios.get(`/api/item/restaurant/${id}`)
				.then((response) => {
					restaurantItems.value = response.data.data;
				})
				.catch((error) => {
					console.error(`Fetch restaurant items error: ${error}`);
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
			userItems,
			restaurantItems,
			fetchUserItems,
			fetchRestaurantItems,
			addItem,
			updateItem,
			getItem,
			deleteItem,
		};
	},
	{
		persist: {
			storage: piniaPluginPersistedstate.localStorage(),
		},
	}
);
