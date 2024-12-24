import { unlink, writeFile } from "fs/promises";
// import { useRestaurantStore } from "~/stores/restaurant";

export default defineEventHandler(async (event) => {
	// const restaurant = useRestaurantStore();
	// const restId = getRouterParam(event, "id");
	// const targetRestaurant = restaurant.userRestaurants.value.filter(
	// 	(item: any) => item.id == restId
	// )[0];

	const form: any = await readMultipartFormData(event);
	const file = form.find((item: any) => item.name == "logo");
	const path = `assets/images/restaurant_logo/${file.filename}`;

	// if (targetRestaurant.logo) {
	// 	unlink(`assets/images/restaurant_logo/${targetRestaurant.logo}`);
	// }

	await writeFile(path, file.data);

	return 200;
});
