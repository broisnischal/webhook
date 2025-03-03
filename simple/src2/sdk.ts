
import { Elysia } from "elysia";
import crypto from "node:crypto";
import { Order, orders, sendSms } from "./database";

export class ThirdPartySdk {
    constructor(private readonly app: Elysia, private readonly webhook_secret: string) {
        this.app = app;
        this.verifySignature = this.verifySignature.bind(this);
    }


    private async verifySignature(req: Request) {
        const signature = req.headers.get("x-webhook-signature");

        const expectedSignature = crypto.createHmac("sha256", this.webhook_secret).digest("hex");

        return signature === expectedSignature;
    }



    private async sendSms(order: Order) {
        try {
            sendSms(order.id, `🍕 Order Update: Your pizza is ${order.status}!`);
        } catch (error) {
            console.error(error);
        }
    }


    async createOrder(order: Order) {
        return this.app.post("/order", order);
    }

    async updateOrder(order: Order) {
        return this.app.post("/order-update", order);
    }

    async getOrder(id: string) {
        return this.app.get(`/order/:id`, ({ params }) => {
            const order = orders.get(params.id);
            return order;
        });
    }

    async deleteOrder(id: string) {
        return this.app.delete(`/order/:id`, ({ params }) => {
            orders.delete(params.id);
            return { message: "Order deleted" };
        });
    }
}
