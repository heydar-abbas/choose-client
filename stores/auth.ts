import { defineStore } from "pinia";
import { ref } from "vue";
import axios from "axios";

const Axios = axios.create({
	baseURL: "http://localhost:8000",
	withCredentials: true,
	withXSRFToken: true,
});

type user = {
	id: number;
	name: string;
	email: string;
	image: string;
	email_verified_at: any;
};

export const useAuthStore = defineStore(
	"auth",
	() => {
		const user = ref<null | any>(null);
		const isLogedin = computed(() => !!user.value);
		let message = ref<string | null>("");
		let errorMessage = ref<string | null>("");

		async function login(credentials: any) {
			let status: number = 0;
			let inputErrors: any = {};

			await getToken();
			await Axios.post("/login", credentials)
				.then(async () => {
					await fetchUser();
					status = 200;
					navigateTo("/dashboard");
				})
				.catch((error) => {
					inputErrors = error?.response?.data?.errors;
				});

			return { status, inputErrors };
		}

		async function register(info: any) {
			let status: number = 0;
			let inputErrors: any = {};

			await getToken();
			await Axios.post("/register", info)
				.then(async () => {
					await fetchUser();
					navigateTo("/dashboard");
				})
				.catch((error) => {
					inputErrors = error?.response?.data?.errors;
				});

			return { status, inputErrors };
		}

		// fix login save
		async function logout() {
			await Axios.post("/logout")
				.then(() => {
					user.value = null;
					navigateTo("/");
				})
				.catch((err) => {
					console.error(`logout error: ${err}`); //delete log
				});
		}

		async function getToken() {
			await Axios.get("/sanctum/csrf-cookie");
		}

		async function fetchUser() {
			await Axios.get("/api/user")
				.then((response) => {
					user.value = response.data;
				})
				.catch((err) => {
					console.log(`Fetch user error: ${err}`); //delete log
				});
		}

		async function updateUser(data: any) {
			let status: number = 0;
			let inputErrors: any = {};

			await getToken();
			await Axios.put("/api/profile", data)
				.then((response) => {
					message.value = response.data.message;
					setTimeout(() => {
						message.value = "";
					}, 5000);
					fetchUser();
					status = 200;
				})
				.catch((error) => {
					inputErrors = error?.response?.data?.errors;
				});

			return { status, inputErrors };
		}

		async function updatePassword(form: any) {
			let status: number = 0;
			let inputErrors: any = {};

			await Axios.put("/api/password", form)
				.then((response) => {
					setTimeout(() => {
						message.value = "";
					}, 5000);
					message.value = response.data.message;
					status = 200;
				})
				.catch((error) => {
					inputErrors = error?.response?.data?.errors;
				});

			return { status, inputErrors };
		}

		async function destroy(form: any) {
			let status: number = 0;
			let inputErrors: any = {};

			await Axios.delete("/api/profile", {
				data: {
					password: form.password,
				},
			})
				.then(() => {
					status = 200;
					user.value = null;
					navigateTo("/");
				})
				.catch((error) => {
					inputErrors = error?.response?.data?.errors;
				});

			return { status, inputErrors };
		}

		async function sendResetEmail(form: any) {
			let status = 0;
			let inputError: any = {};

			await getToken();
			await Axios.post("/api/forgot-password", form)
				.then((response) => {
					console.log(response);
					/**
					 *  @TODO send reset email is broken
					 **/
					// message.value = response.data.status;
					// status = response.data.status;
					// setTimeout(() => {
					// 	message.value = "";
					// }, 10000);
				})
				.catch((error) => {
					inputError = error?.response?.data?.errors;
				});

			return { status, inputError };
		}

		async function resetPassword(form: any) {
			let status: number = 0;
			let inputErrors: any = {};

			await getToken();
			await Axios.post("/api/reset-password", form)
				.then((response) => {
					console.log(response.data);
					setTimeout(() => {
						message.value = "";
					}, 5000);
					message.value = response.data.status;
					status = 200;
					navigateTo("/auth/login");
				})
				.catch((error) => {
					inputErrors = error?.response?.data?.errors;
				});

			return { status, inputErrors };
		}

		return {
			user,
			isLogedin,
			message,
			errorMessage,
			login,
			register,
			logout,
			updateUser,
			fetchUser,
			updatePassword,
			destroy,
			sendResetEmail,
			resetPassword,
		};
	},
	{
		persist: true,
	}
);
