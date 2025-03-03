
import { t } from "elysia";

// export interface Order {
//     id: string;
//     name: string;
//     price: number;
//     status: 'pending' | 'completed' | 'cancelled';
//     retries: number;
// }

export const order = t.Object({
    id: t.String(),
    name: t.String(),
    price: t.Number(),
    status: t.Union([t.Literal("pending"), t.Literal("completed"), t.Literal("cancelled")]),
    retries: t.Number()
})


export type Order = typeof order['static'];


export const orders = new Map<string, Order>();

orders.set("1", {
    id: "1",
    name: "Order 1",
    price: 100,
    status: "pending",
    retries: 0
})


export const sendSms = (orderId: string, message: string) => {
    const order = orders.get(orderId);
    console.log(`📤 SMS to ${order?.name}: "${message}"`);

    if (!order) {
        throw new Error("Order not found");
    }

    if (order.status === "pending") {
        order.retries++;
        // if (order.retries > 3) {
        //     order.status = "cancelled";
        // }
    }
}