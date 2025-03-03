import { stripe } from "#app/.server/stripe.server.js";
import type Stripe from "stripe";
import type { Route } from "./+types/webhook";
import { notifySlack } from "#app/lib/index.js";

export async function action({
    context, request
}: Route.ActionArgs) {
    const signature = request.headers.get("stripe-signature");

    if (!signature) {
        return new Response("No signature", { status: 400 });
    }

    const body = await request.text();

    try {
        const event = stripe.webhooks.constructEvent(body, signature, process.env.WEBHOOK_SECRET!);

        if (event.type === "checkout.session.completed") {
            const session = event.data.object as Stripe.Checkout.Session;

            console.log(session)

            const { cartItems } = session.metadata || {};
            // const cartItemsArray = JSON.parse(cartItems || "[]");
            // const checkoutSession = await createCheckoutSession(cartItemsArray);
            console.log("payment successfull db operations");

            /// Callilng the webhook of slack
            await notifySlack(`Payment successfull for ${session.metadata?.cartItems}`);
            return new Response("Payment successfull", { status: 200 });
        }

        return new Response("Unhandled event", { status: 400 });
    } catch (error) {
        console.error(error);
        return new Response("Invalid signature", { status: 400 });
    }

}