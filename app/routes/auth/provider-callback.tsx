import { authenticator } from "#app/lib/auth/auth.server.js";
import { redirect } from "react-router";
import type { Route } from "./+types/provider-callback";


export async function loader({ request, params }: Route.LoaderArgs) {

    const provider = params.provider;

    let user = await authenticator.authenticate(provider, request);

    console.log(user);


    return redirect("/");
}
