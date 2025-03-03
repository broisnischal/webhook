
import crypto from "node:crypto";
import type { Route } from "./+types/custom-webhook";

const secret = 'stored_db_secre'

export async function action({ request }: Route.ActionArgs) {
  const signature = request.headers.get("x-Signature");
  const clientId = request.headers.get("x-Client-Id");

  if (!signature || !clientId) {
    return new Response("No signature or clientId", { status: 400 });
  }

  // message body
  const body = await request.json();

  const expectedSig = crypto
    .createHmac('sha256', secret)
    .update(JSON.stringify(body))
    .digest('hex');

    if (signature !== expectedSig) {
      console.log('⚠️ Invalid signature');
      return  new Response("Invalid signature", { status: 401 });
    }


    console.log(`Received event for ${clientId}:`, body);
    return new Response("Processed", { status: 200 });
}