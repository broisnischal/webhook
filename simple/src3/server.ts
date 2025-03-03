import Elysia, { t } from "elysia";
import { up } from "up-fetch";
import crypto from "crypto";


const app = new Elysia();
interface User {
  clientId: string;
  webhookUrl: string;
  secret: string;
}

const upFetch = up(fetch);

const eventTypes = ['pay', 'star', 'ping'];
export type EventType = typeof eventTypes[number];

const db = new Map<string, User>();

app.post('/register', ({ body }) => {
  console.log(body);

  const user = {
    clientId: body.clientId,
    webhookUrl: body.webhookUrl,
    secret: body.secret
  }

  db.set(user.clientId, user);

  return {
    message: "Webhook registered successfully!"
  }
}, {
  body: t.Object({
    clientId: t.String(),
    webhookUrl: t.String(),
    secret: t.String()
  })
})

// this should be the seprate service in your application, calling via the queue
app.post('/trigger-event', async ({ body }) => {
  console.log(body);

  const user = db.get(body.clientId);

  if (!user) {
    return {
      message: "User not found!"
    }
  }

  console.log(user)

  const event = eventTypes.find(e => e === body.event);

  if (!event) {
    return {
      message: "Invalid event!"
    }
  }

  const payload = {
    event: event,
    data: body
  }

  const signature = crypto
    .createHmac('sha256', user.secret)
    .update(JSON.stringify(payload))
    .digest('hex');

  try {
    const response = await upFetch(user.webhookUrl, {
      method: "POST",
      body: JSON.stringify(payload),
      headers: {
        "Content-Type": "application/json",
        "x-Signature": signature,
        "x-Client-Id": user.clientId
      }
    });


  } catch (error: any) {

    if (error.status === 401) {
      return {
        message: "Invalid signature!"
      }
    }

  }


  return {
    message: "Event triggered successfully!"
  }
}, {
  body: t.Object({
    clientId: t.String(),
    event: t.String()
  })
})



app.get('/webhook', ({ body }) => {
  console.log(body);

  return {
    message: "Webhook received successfully!"
  }
})

app.listen(3000, () => {
  console.log("Server is running on port 3000");
})