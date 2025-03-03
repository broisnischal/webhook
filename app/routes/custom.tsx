import { Form } from "react-router";
import type { Route } from "./+types/custom";

export async function action({ request }: Route.ActionArgs) {
  const formData = await request.formData();
  const webhookUrl = formData.get("webhookUrl");
  const secret = formData.get("secret");

  console.log(webhookUrl, secret);
}


 export default function Page() {

  return (
    <div>
      <h1>Register Webhook</h1>

      <Form method="POST">
        <input type="text" name="webhookUrl" />
        <input type="text" name="secret" />
        <button type="submit">Register</button>
      </Form>
    </div>
  )
}