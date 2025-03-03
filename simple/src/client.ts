import { treaty } from "@elysiajs/eden";
import type { App } from "./index";

export const client = treaty<App>("localhost:3000");

const { data, error } = await client.webhook.post({
	body: {
		message: "ping",
	},
});



console.log(data, error);
