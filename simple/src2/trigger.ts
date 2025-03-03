import axios from "axios";
import { hashPayload } from "./util";




// this is the code of the third party service
async function triggerWebhook(orderId: string, status: string) {
    const payload = {
        id: orderId,
        status: status
    }

    const signature = await hashPayload(payload, "i-am-secret");

    try {

        const response = await axios.post("http://localhost:3000/webhook", signature, {
            headers: { "x-webhook-signature": signature }
        });

        console.log(response.data);

    } catch (error) {
        console.log(error);
    }

}

triggerWebhook("1", "completed");