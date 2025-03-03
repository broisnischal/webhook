import { authenticator } from "#app/lib/auth/auth.server.js";
import { Form } from "react-router";
import type { Route } from "./+types/login";


export async function action({ request }: Route.ActionArgs) {
    return authenticator.authenticate("figma", request);
}

export default function Login() {
    return <div>

        <Form method="post">
            <button type="submit">
                Login
            </button>
        </Form>
    </div>;
}