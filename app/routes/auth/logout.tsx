import { redirect } from "react-router";
import type { Route } from "./+types/logout";

export async function loader() {
    return redirect("/auth/login");
}

export async function action({ request, context }: Route.ActionArgs) {
}
