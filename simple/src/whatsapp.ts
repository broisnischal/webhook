// create the whatsapp bot for self

import { Client, LocalAuth } from "whatsapp-web.js";
// @ts-ignore
import qrcode from "qrcode-terminal";

const client = new Client({
	authStrategy: new LocalAuth(),
});

client.on("qr", (qr) => {
	qrcode.generate(qr, { small: true });
});

client.on("ready", () => {
	console.log("WhatsApp Web client is ready!");
});

const sendMessage = (to: string, message: string) => {
	client.sendMessage(to, message);
};

// Initialize client and send a message
client.initialize();

sendMessage(
	"1234567890@c.us",
	"Hello, this is a message sent using WhatsApp Web!",
);
