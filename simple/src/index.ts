import { Elysia } from "elysia";
import twilio from "twilio";
import type { StarredEventPayload } from "./types";
import { authToken, accountSid } from "./config";

export const client = twilio(accountSid, authToken);

const sendWhatsAppMessage = async (message: string) => {
	try {
		const response = await client.messages.create({
			from: "whatsapp:+14155238886", // e.g., 'whatsapp:+14155238886'
			to: "whatsapp:+9779803104764",
			body: message,
		});
		console.log("WhatsApp message sent:", response.sid);
	} catch (error) {
		console.error("Error sending WhatsApp message:", error);
	}
};

const app = new Elysia()
	.get("/", () => "Hello bro")
	.post("/webhook", async ({ body, request }) => {
		const event = request.headers.get("x-github-event");

		console.log("Event: ", event);

		if (event === "star") {
			const starredEvent = body as StarredEventPayload;
			const action = starredEvent.action; // 'created' or 'deleted'
			console.log(`Repository ${action === 'created' ? 'starred' : 'unstarred'} by ${starredEvent.sender.login}`);
			console.log(JSON.stringify(starredEvent, null, 2));

			// Send WhatsApp notification with more details
			const message = `${starredEvent.sender.login} ${action === 'created' ? 'starred' : 'unstarred'} ${starredEvent.repository.full_name}!`;
			await sendWhatsAppMessage(message);

			return new Response(JSON.stringify({ message: "WhatsApp message sent" }), {
				status: 200,
			});
		}

		if (event === "issues") {
			console.log("Issue created: ", body);
		}

		return new Response(JSON.stringify({ message: "Event received" }), {
			status: 200,
		});
	})
	.listen(3000);

console.log(
	`🦊 Webhook server running at ${app.server?.hostname}:${app.server?.port}`,
);

export type App = typeof app;
