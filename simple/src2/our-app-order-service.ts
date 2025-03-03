import Elysia from "elysia";

import { order } from "./database";
import { ThirdPartySdk } from "./sdk";

const sdk = new ThirdPartySdk(new Elysia(), "i-am-secret");


const app = new Elysia().post("/order", async ({ body }) => {

    const order = await sdk.createOrder(body);

    return new Response(JSON.stringify(order), { status: 200 })
}, {
    body: order
}).get("/order/:id", ({ params }) => {
    return sdk.getOrder(params.id);
})






app.listen(4000, () => {
    console.log("Server is running on http://localhost:4000")
})