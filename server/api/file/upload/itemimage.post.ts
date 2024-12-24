import { unlink, writeFile } from "fs/promises";

export default defineEventHandler(async (event) => {
	const form: any = await readMultipartFormData(event);
	const file = form.find((item: any) => item.name == "itemImage");
	const path = `assets/images/item_image/${file.filename}`;

	// if (auth.user.image) {
	// 	unlink(`assets/images/user_image/${auth.user.image}`);
	// }

	await writeFile(path, file.data);

	return 200;
});
