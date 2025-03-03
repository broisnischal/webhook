import Stripe from "stripe";

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: "2025-01-27.acacia",
});

export const createCheckoutSession = async (cartItems: {
    id: string;
    title: string;
    price: number;
    quantity: number;
}[]) => {
    const session = await stripe.checkout.sessions.create({
        line_items: cartItems.map((item) => ({
            price_data: {
                currency: "usd",
                product_data: {
                    name: item.title,
                },
                unit_amount: item.price * 100,
            },
            quantity: item.quantity,
        })),
        mode: "payment",
        success_url: `${process.env.FRONTEND_URL}/shop?success=true`,
        cancel_url: `${process.env.FRONTEND_URL}/shop?cancel=true`,
        metadata: {
            cartItems: JSON.stringify(cartItems),
        },
    });
    return session;
};
