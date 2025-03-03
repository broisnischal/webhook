import { Elysia } from "elysia";
import { hashPayload } from "./util";

const app = new Elysia()

const webhook_secret = "i-am-secret";


// Validate webhook signature
const verifySignature = async ({ headers, body }: { headers: Headers, body: any }) => {
    const signature = headers.get("x-webhook-signature");

    const payload = JSON.stringify(body);

    const expectedSignature = await hashPayload(payload, webhook_secret);


    return signature === expectedSignature;
};


app.listen(3000, () => {
    console.log("Server is running on http://localhost:3000")
})
